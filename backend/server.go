package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.bug.st/serial"
)

const (
	StateInit    = "INIT"
	StateLoading = "LOADING"
	StateError   = "ERROR"
	StateSuccess = "SUCCESS"
)

var (
	serialPort    serial.Port
	messageStates = make(map[string]string)
	wsConnection  *websocket.Conn
	upgrader      = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Routes
	e.GET("/", handleRoot)
	e.GET("/ws", handleWebSocket)
	e.GET("/status", handleStatus)

	initSerialPort()

	e.Logger.Fatal(e.Start(":1323"))
}

func handleRoot(c echo.Context) error {
	return c.String(http.StatusOK, "Serial WebServer Running")
}

func handleStatus(c echo.Context) error {
	return c.JSON(http.StatusOK, messageStates)
}

func handleWebSocket(c echo.Context) error {
	if wsConnection != nil {
		wsConnection.Close()
	}

	// Upgrade to WebSocket
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}

	// Store the new connection
	wsConnection = ws

	// Send current states to new client
	for switchID, state := range messageStates {
		msg := map[string]interface{}{
			"switchId": switchID,
			"state":    state,
			"value":    "",
		}
		wsConnection.WriteJSON(msg)
	}

	// Handle incoming messages from the WebSocket
	for {
		_, message, err := ws.ReadMessage()
		if err != nil {
			log.Printf("WebSocket closed: %v", err)
			wsConnection = nil // Clear the connection reference
			break
		}

		log.Printf("Received from client: %s", string(message))

		var data map[string]string
		if err := json.Unmarshal(message, &data); err != nil {
			log.Printf("Failed to parse client message: %v", err)
			continue
		}

		// Process the command
		for key, value := range data {
			if strings.HasSuffix(key, "-EVENT") {
				switchID := strings.TrimSuffix(key, "-EVENT")
				messageStates[switchID] = value

				// Send to ESP32 via serial
				sendToSerial(fmt.Sprintf("{\"%s-EVENT\": \"%s\"}\n", switchID, value))
			}
		}
	}

	return nil
}

func initSerialPort() {
	mode := &serial.Mode{
		BaudRate: 115200,
	}

	// Try to open the serial port
	var err error
	serialPort, err = serial.Open("/dev/tty.usbmodem21301", mode)
	if err != nil {
		log.Printf("Warning: Failed to open serial port: %v", err)
		return
	}

	log.Println("Serial port opened successfully")

	// Start a single goroutine to read from serial
	go func() {
		scanner := bufio.NewScanner(serialPort)
		for scanner.Scan() {
			message := scanner.Text()
			handleSerialMessage(message)
		}

		if err := scanner.Err(); err != nil {
			log.Printf("Serial port read error: %v", err)
		}

		log.Println("Serial port reader stopped")
	}()
}

func handleSerialMessage(message string) {
	log.Printf("Received from ESP32: %s", message)

	// Parse message (format: "SW-A: true")
	parts := strings.SplitN(message, ":", 2)
	if len(parts) != 2 {
		log.Printf("Invalid message format: %s", message)
		return
	}

	switchID := strings.TrimSpace(parts[0])
	value := strings.TrimSpace(parts[1])

	// Set initial state if not exists
	if _, exists := messageStates[switchID]; !exists {
		messageStates[switchID] = StateInit
	}
	// Get current state
	currentState := messageStates[switchID]

	sendToSerial(fmt.Sprintf("{\"%s-EVENT\": \"%s\"}\n", switchID, currentState))
	sendToWebSocket(switchID, currentState, value)
}

func sendToSerial(data string) {
	if serialPort == nil {
		log.Println("Serial port not available")
		return
	}
	_, err := serialPort.Write([]byte(data))
	if err != nil {
		log.Printf("Failed to write to serial port: %v", err)
		return
	}
	log.Printf("Sent to ESP32: %s", strings.TrimSpace(data))
}

func sendToWebSocket(switchID, state, value string) {
	if wsConnection == nil {
		return
	}

	message := map[string]interface{}{
		"switchId": switchID,
		"state":    state,
		"value":    value,
	}

	err := wsConnection.WriteJSON(message)
	if err != nil {
		log.Printf("Failed to send to WebSocket: %v", err)
		wsConnection.Close()
		wsConnection = nil
	}
}
