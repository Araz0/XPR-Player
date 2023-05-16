/*
 This example connects to an unencrypted WiFi network.
 Then it prints the MAC address of the WiFi module,
 the IP address obtained, and other network details.

 created 13 July 2010
 by dlf (Metodo2 srl)
 modified 31 May 2012
 by Tom Igoe
 */
#include <SPI.h>
#include <WiFiNINA.h>

#include "arduino_secrets.h" 
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int status = WL_IDLE_STATUS;     // the WiFi radio's status


int buttonState = LOW; // current state of the button
int lastButtonState = LOW; // previous state of the button
unsigned long lastDebounceTime = 0; // last time the button was pressed


const int ledPin = 13;    // the number of the LED pin
// buttons
const int buttonPin1 = A1;  // the number of the pushbutton pin
const int buttonPin2 = A2;  // the number of the pushbutton pin
const int buttonPin3 = 4;  // the number of the pushbutton pin
const int buttonPin4 = 5;  // the number of the pushbutton pin
// variables will change:
int buttonState1 = 0;  // variable for reading the pushbutton status
int buttonState2 = 0;  // variable for reading the pushbutton status
int buttonState3 = 0;  // variable for reading the pushbutton status
int buttonState4 = 0;  // variable for reading the pushbutton status

// connect to the server:
WiFiClient client;

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);
  pinMode(buttonPin4, INPUT);
  //Initialize serial and wait for port to open:
  Serial.begin(9600);

  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
    Serial.println("Please upgrade the firmware");
  }
digitalWrite(ledPin, HIGH);
delay(1000);
digitalWrite(ledPin, LOW);
  // attempt to connect to WiFi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
digitalWrite(ledPin, HIGH);
delay(1000);
digitalWrite(ledPin, LOW);
delay(1000);

  // you're connected now, so print out the data:
  Serial.print("You're connected to the network");
  printCurrentNet();
  printWifiData();


}

void loop() {
  // check the network connection once every 10 seconds:
  // printCurrentNet();
  // printWifiData();

  buttonsCheck();
}

void buttonsCheck() {

// read the state of the pushbutton value:
  buttonState1 = analogRead(buttonPin1);
  buttonState2 = analogRead(buttonPin2);
  buttonState3 = digitalRead(buttonPin3);
  buttonState4 = digitalRead(buttonPin4);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState1 < 10) {
    // button clicked:
    digitalWrite(ledPin, LOW);
    Serial.println("1");
    sendDataOverHttp("selectedIndex=1");
    delay(500);
  } else if (buttonState2 < 10) {
    // button clicked:
    digitalWrite(ledPin, LOW);
    Serial.println("2");
    sendDataOverHttp("selectedIndex=2");
    delay(500);
  }  else {
    // turn LED On:
    digitalWrite(ledPin, HIGH);
  }
}

void sendDataOverHttp(String param) {

  if (!client.connect("192.168.0.102", 8000)) {
    Serial.println("Connection failed");
    return;
  }
  String part1 = "GET /api?" + param;
  String getRequestString = part1 + " HTTP/1.1\r\n";
  // send the GET request:
  client.print(getRequestString);
  client.print("Host: 192.168.0.102\r\n");
  client.print("Connection: close\r\n\r\n");

  // wait for the response:
  while (!client.available()) {
    delay(1);
  }

  // read the response and print it to the serial monitor:
  while (client.available()) {
    Serial.write(client.read());
  }
}

void printWifiData() {
  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  Serial.println(ip);

  // print your MAC address:
  byte mac[6];
  WiFi.macAddress(mac);
  Serial.print("MAC address: ");
  printMacAddress(mac);
}

void printCurrentNet() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print the MAC address of the router you're attached to:
  byte bssid[6];
  WiFi.BSSID(bssid);
  Serial.print("BSSID: ");
  printMacAddress(bssid);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.println(rssi);

  // print the encryption type:
  byte encryption = WiFi.encryptionType();
  Serial.print("Encryption Type:");
  Serial.println(encryption, HEX);
  Serial.println();
}

void printMacAddress(byte mac[]) {
  for (int i = 5; i >= 0; i--) {
    if (mac[i] < 16) {
      Serial.print("0");
    }
    Serial.print(mac[i], HEX);
    if (i > 0) {
      Serial.print(":");
    }
  }
  Serial.println();
}
