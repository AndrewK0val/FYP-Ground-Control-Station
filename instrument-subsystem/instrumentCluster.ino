
#include <Adafruit_NeoPixel.h>

#define PIN_NEO_PIXEL 2  // The ESP32 pin GPIO16 connected to NeoPixel
#define NUM_PIXELS 5

const int BUTTON_PINS[] = {10, 20, 9, 21}; // GPIO pins for buttons (A, B, C, D)
const int PIXEL_MAP[] = {0, 1, 2, 3};    // Corresponding NeoPixel indices for buttons
const int NUM_BUTTONS = sizeof(BUTTON_PINS) / sizeof(BUTTON_PINS[0]);

int lastStates[NUM_BUTTONS];  // Array to store the last states of buttons
int currentStates[NUM_BUTTONS]; // Array to store the current states of buttons

Adafruit_NeoPixel NeoPixel(NUM_PIXELS, PIN_NEO_PIXEL, NEO_GRBW);

// Variables for the breathing effect
int brightness[NUM_BUTTONS] = {0, 0, 0, 0}; // Brightness for each LED
int fadeDirection[NUM_BUTTONS] = {1, 1, 1, 1}; // Direction for fading (+1 or -1)
unsigned long lastUpdateTime[NUM_BUTTONS] = {0, 0, 0, 0}; // Last update time for each LED

const int FADE_STEP = 5; // Increment for brightness
const int MAX_BRIGHTNESS = 255;
const int MIN_BRIGHTNESS = 0;

// Function for breathing effect
void breatheEffect(int buttonIndex, int r, int g, int b, int w, int effectSpeed, unsigned long currentTime) {
  // Check if it's time to update the brightness for this LED
  if (currentTime - lastUpdateTime[buttonIndex] >= effectSpeed) {
    // Update the last update time
    lastUpdateTime[buttonIndex] = currentTime;

    // Adjust brightness for the breathing effect
    brightness[buttonIndex] += fadeDirection[buttonIndex] * FADE_STEP;

    // Reverse direction if limits are reached
    if (brightness[buttonIndex] >= MAX_BRIGHTNESS || brightness[buttonIndex] <= MIN_BRIGHTNESS) {
      fadeDirection[buttonIndex] *= -1;
    }

    // Set the corresponding pixel color with current brightness
    NeoPixel.setPixelColor(PIXEL_MAP[buttonIndex], NeoPixel.Color(
      (r * brightness[buttonIndex]) / MAX_BRIGHTNESS,
      (g * brightness[buttonIndex]) / MAX_BRIGHTNESS,
      (b * brightness[buttonIndex]) / MAX_BRIGHTNESS,
      (w * brightness[buttonIndex]) / MAX_BRIGHTNESS
    ));

    Serial.printf("Button %c: Pixel %d breathing at brightness %d\n", 'A' + buttonIndex, PIXEL_MAP[buttonIndex], brightness[buttonIndex]);
  }
}

void setup() {
  NeoPixel.begin();
  Serial.begin(9600);

  // Initialize the pushbutton pins as pull-up inputs
  for (int i = 0; i < NUM_BUTTONS; i++) {
    pinMode(BUTTON_PINS[i], INPUT_PULLUP);
    lastStates[i] = HIGH; // Initial state is HIGH due to pull-up
  }

  // Clear all NeoPixels initially
  NeoPixel.clear();
  NeoPixel.show();
}

void loop() {
  unsigned long currentTime = millis();

  // Read button states and handle breathing effect
  for (int i = 0; i < NUM_BUTTONS; i++) {
    currentStates[i] = digitalRead(BUTTON_PINS[i]);

    if (currentStates[i] == LOW) { // Button pressed
      // Call the breathing effect function with specific color and speed
      breatheEffect(i, 0, 255, 0, 0, 20, currentTime); // Green color, speed 20ms
    } else { // Button not pressed
      NeoPixel.setPixelColor(PIXEL_MAP[i], 0); // Turn off the corresponding pixel
      brightness[i] = 0; // Reset brightness when button is released
      fadeDirection[i] = 1; // Reset fade direction
      Serial.printf("Button %c is released, turning off Pixel %d\n", 'A' + i, PIXEL_MAP[i]);
    }

    // Update the last state
    lastStates[i] = currentStates[i];
  }

  // Show the updated NeoPixel state after processing all buttons
  NeoPixel.show();
}