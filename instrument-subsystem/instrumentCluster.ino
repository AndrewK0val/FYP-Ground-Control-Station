#include <Adafruit_NeoPixel.h>
#include <ArduinoJson.h>

#define PIN_NEO_PIXEL 2
#define NUM_PIXELS 5
const int SWITCH_PINS[] = {10, 20, 9, 21};  // GPIO mappings for switches A–D
const int PIXEL_MAP[] = {0, 1, 2, 3};       // LED indices
const int NUM_SWITCHES = sizeof(SWITCH_PINS) / sizeof(SWITCH_PINS[0]);

Adafruit_NeoPixel NeoPixel(NUM_PIXELS, PIN_NEO_PIXEL, NEO_GRBW);
enum EventState { OFF, INIT, LOADING, SUCCESS, ERROR };
EventState eventStates[NUM_SWITCHES] = {OFF};

// switch state tracking
int lastStates[NUM_SWITCHES];
int currentStates[NUM_SWITCHES];
unsigned long lastDebounceTime[NUM_SWITCHES] = {0};
const unsigned long debounceDelay = 50; // ms

// For breathing effect
int brightness[NUM_SWITCHES] = {0};
int fadeDirection[NUM_SWITCHES] = {1};
unsigned long lastUpdateTime[NUM_SWITCHES] = {0};
const int MAX_BRIGHTNESS = 255;
const int MIN_BRIGHTNESS = 0;

void setup() {
  Serial.begin(115200);
  NeoPixel.begin();
  NeoPixel.clear();
  NeoPixel.show();

  for (int i = 0; i < NUM_SWITCHES; i++) {
    pinMode(SWITCH_PINS[i], INPUT_PULLUP);
    lastStates[i] = digitalRead(SWITCH_PINS[i]);
  }
}

void loop() {
  unsigned long currentTime = millis();
  handleSwitches(currentTime);
  readSerialMessages();
  updateLEDs(currentTime);
  NeoPixel.show();
  
}

void handleSwitches(unsigned long currentTime) {
  for (int i = 0; i < NUM_SWITCHES; i++) {
    int reading = digitalRead(SWITCH_PINS[i]);

    if (reading != lastStates[i]) {
      lastDebounceTime[i] = currentTime;
    }

    if ((currentTime - lastDebounceTime[i]) > debounceDelay) {
      if (reading != currentStates[i]) {
        currentStates[i] = reading;

        // LOW means switch ON, HIGH means switch OFF
        StaticJsonDocument<64> doc;
        doc[String("SW-") + char('A' + i)] = (currentStates[i] == LOW);
        serializeJson(doc, Serial);
        Serial.println();
      }
    }
    lastStates[i] = reading;
  }
}

void readSerialMessages() {
  while (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    StaticJsonDocument<128> doc;
    DeserializationError error = deserializeJson(doc, input);
    if (error) {
      Serial.println("JSON parse error");
      continue;
    }

    for (int i = 0; i < NUM_SWITCHES; i++) {
      String switchKey = String("SW-") + char('A' + i);
      String eventKey = switchKey + "-EVENT";

      // Handle switch OFF state {"SW-A": false}
      if (doc.containsKey(switchKey)) {
        bool isOn = doc[switchKey];
        if (!isOn) {
          eventStates[i] = OFF;
          Serial.printf("Switch %c turned OFF, LED reset to white\n", 'A' + i);
        }
      }

      // Handle {"SW-A-EVENT": "LOADING"} etc.
      if (doc.containsKey(eventKey)) {
        String evt = doc[eventKey];
        if (evt == "INIT") eventStates[i] = INIT;
        else if (evt == "LOADING") eventStates[i] = LOADING;
        else if (evt == "SUCCESS") eventStates[i] = SUCCESS;
        else if (evt == "ERROR") eventStates[i] = ERROR;

        Serial.printf("Received event for SW-%c: %s\n", 'A' + i, evt.c_str());
      }
    }
  }
}

void updateLEDs(unsigned long currentTime) {
  for (int i = 0; i < NUM_SWITCHES; i++) {
    if (currentStates[i] == HIGH) {
      // if the switch is OFF, override everything to white
      NeoPixel.setPixelColor(PIXEL_MAP[i], NeoPixel.Color(255, 255, 255, 0));
      continue;  // Skip event-based update
    }

    // if the switch is ON — follow the event state
    switch (eventStates[i]) {
      case INIT:
        NeoPixel.setPixelColor(PIXEL_MAP[i], NeoPixel.Color(255, 255, 0, 0)); // Yellow
        break;
      case LOADING:
        flashingEffect(i, 255, 100, 0, 0); // Flashing amber
        break;
      case SUCCESS:
        NeoPixel.setPixelColor(PIXEL_MAP[i], NeoPixel.Color(0, 255, 0, 0)); // Green
        break;
      case ERROR:
        NeoPixel.setPixelColor(PIXEL_MAP[i], NeoPixel.Color(255, 0, 0, 0)); // Red
        break;
      case OFF:
      default:
        NeoPixel.setPixelColor(PIXEL_MAP[i], NeoPixel.Color(255, 255, 255, 0)); // Default white
        break;
    }
  }
}

    void flashingEffect(int i, int r, int g, int b, int w) {
      unsigned long now = millis();
      const unsigned long FLASH_INTERVAL = 300; // 300 ms on/off

    if (now - lastUpdateTime[i] >= FLASH_INTERVAL) {
      lastUpdateTime[i] = now;
      brightness[i] = brightness[i] == 0 ? MAX_BRIGHTNESS : 0; // Toggle brightness
    }

    NeoPixel.setPixelColor(PIXEL_MAP[i], NeoPixel.Color(
      (r * brightness[i]) / MAX_BRIGHTNESS,
      (g * brightness[i]) / MAX_BRIGHTNESS,
      (b * brightness[i]) / MAX_BRIGHTNESS,
      (w * brightness[i]) / MAX_BRIGHTNESS
    ));
  }