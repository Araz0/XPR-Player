
int ctsPin = 2;
int ledPin = 13;

void setup() {
  // https://www.instructables.com/Arduino-Distance-Sensors/
  Serial.begin(9600);
  pinMode(ledPin,OUTPUT);
  pinMode(ctsPin,INPUT);
}

void loop() {

  // Read the analog value of the sensor
  int val = analogRead(A0);
  // Print the value over Serial
  Serial.println(val);
  // Wait a little for the data to print

  /*
  interesting effect is when you touch both sig and power, high signal is pushed.
  and when you touch both sig and ground, the signal goes down.
  */

  //you can change it but make it at least 50 ms
  delay(250);

}
