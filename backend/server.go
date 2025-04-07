package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"go.bug.st/serial"
)

// I would like to use goroutines to run the webserver and serial listening / writing concurrently

const (
	StateInit    = "INIT"
	StateLoading = "LOADING"
	StateError   = "ERROR"
	StateSuccess = "SUCCESS"
)

type MessageState struct {
	State    string
	SwitchID string
	Value    string
}

var (
	serialPort     serial.Port
	messageStates  = make(map[string]string)
	messageMutex   sync.RWMutex
	websocketConns = make(map[*websocket.Conn]bool)
	wsConnectMutex sync.RWMutex
	upgrader       = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

func writeToPort(port serial.Port, data string) {
	n, err := port.Write([]byte(data))
	if err != nil {
		log.Fatalf("failed to write to port: %v", err)
	}
	fmt.Printf("send %v bytes\n", n)
}
func readFromPort(port serial.Port, data string) {
	n, err := port.Read([]byte(data))
	if err != nil {
		log.Fatalf("Failed to read from port: %v", err)
	}
	fmt.Printf("read: %v bytes\n", n)
}

func startWebserver() {
	// boilerplate echo server - need to refactor
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello World")
	})
	e.Logger.Fatal(e.Start(":1323"))
}

func main() {
	startWebserver()
	mode := &serial.Mode{
		BaudRate: 115200,
	}

	port, err := serial.Open("/dev/ttyUSB0", mode)
	if err != nil {
		log.Fatal(err)
	}
	defer port.Close()
	time.Sleep(1 * time.Second)
	// the message format needs to be completely overhauled. The microcontroller will normally send the first message like {"SW-A": True}
	// I wonder if its possible to use interrupt in golang to to handle reading serial messages?
	fmt.Println("Writing first command...")
	writeToPort(port, "A:(20,110,180) B:(20,10,180)\n")
}
