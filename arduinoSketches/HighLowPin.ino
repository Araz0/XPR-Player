
int ctsPin = 2;
int ledPin = 13;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin,OUTPUT);
  pinMode(ctsPin,INPUT);
}

void loop() {

  int ctsValue = digitalRead(ctsPin);
  if (ctsValue == HIGH) {
    digitalWrite(ledPin, HIGH);
    Serial.println(ctsValue);
    Serial.println(" Touched");
  } else {
    digitalWrite(ledPin, LOW);
    Serial.println("Not Touched");
  }
  delay(150);           //done every 2 seconds, you can change it but make it at least 50 ms

}
