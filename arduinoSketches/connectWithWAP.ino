 
// Include SPI and WiFi Libraries
#include <SPI.h>
#include <WiFiNINA.h>
#include <HttpClient.h>
#include "arduino_secrets.h"
// WiFi Credentials (edit as required)
char ssid[] = SECRET_SSID;      // Wifi SSID
char pass[] = SECRET_PASS;       // Wifi password
 
int status = WL_IDLE_STATUS;
 
// Initialize the Wifi client
WiFiSSLClient client;



// This example downloads the URL "http://arduino.cc/"

// Name of the server we want to connect to
const char kHostname[] = "arduino.cc";
// Path to download (this is the bit after the hostname in the URL
// that you want to download
const char kPath[] = "/";

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// Number of milliseconds to wait without receiving any data before we give up
const int kNetworkTimeout = 30*1000;
// Number of milliseconds to wait if no data is available before trying again
const int kNetworkDelay = 1000;



void connectToAP() {
  // Connect to Wifi Access Point
  
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    
    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);
 
    // wait 1 second for connection:
    delay(10000);
    Serial.print("Status: ");
    Serial.print(status);
    Serial.println(" Connected...");
  }
}
 
void printWifiStatus() {
  // Print results to serial monitor  
 
 // Network SSID  
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  
  // Device IP address
  IPAddress ip = WiFi.localIP(); 
  Serial.print("IP Address: ");
  Serial.println(ip);
}
 
void setup() {
  
  // Start the Serial port
  Serial.begin(9600);
  
  while (!Serial) {
    ; // Wait for serial port to connect.
  }
  
  // Check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("WiFi module failed!");
    while (true);
  }
   
  connectToAP();  
    
  printWifiStatus();
  
}
void loop() {
    sender();
}

void sender() {
  char server[] = "http://localhost";
  String postData;
  String postVariable = "temp=";
  float temperatureF = 5;

  postData = postVariable + temperatureF;
  if (client.connect(server, 8000)) {
    client.println("GET / HTTP/1.1");
    client.println("Host: http://localhost:8000");
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.print("Content-Length: ");
    client.println(postData.length());
    client.println();
    client.print(postData);
  }

  if (client.connected()) {
    client.stop();
  }
  Serial.println(postData);

  delay(3000);
}
