#include <LiquidCrystal_I2C.h> // I2C LCD library
#include "DHT.h" // Temperature and humidity sensor library
// The above library must be downloaded before execution

#define DHTPIN 2 // Temperature and humidity sensor data pin
#define DHTTYPE DHT11 // Temperature and humidity sensor sensor type

// Creating a smart city where the traffic lights at the crosswalk turn red when the bus approaches
int echoPin = 10;
int trigPin = 11;
int traffic_r_led = 4;
int traffic_y_led = 5;
int traffic_g_led = 6;

// Creating a smart city where turns on the street light when it gets dark
int street_r_led = 7;
int street_g_led = 8;
int street_b_led = 9;
int light_sensor = A0;
LiquidCrystal_I2C lcd(0x27, 16, 2);
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600); // Serial monitor settings
  
  lcd.begin(); // start lcd moduleㅂ  
  lcd.clear();
  
  dht.begin(); // Start the temperature and humidity sensor module

  pinMode(light_sensor, INPUT);  // Ambient sensor pin setting

  // 3-color LED pin setting for street light
  pinMode(street_r_led, OUTPUT); 
  pinMode(street_g_led, OUTPUT);
  pinMode(street_b_led, OUTPUT);

  // Ultrasonic sensor setting
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // 3-color LED pin setting for traffic light
  pinMode(traffic_r_led, OUTPUT);
  pinMode(traffic_y_led, OUTPUT);
  pinMode(traffic_g_led, OUTPUT);
}

void loop() {
  // Realization of night street light function using the value of the illuminance sensor
  int cds = analogRead(light_sensor);

  // Measure and store temperature and humidity values
  float humid = dht.readHumidity();
  float temp = dht.readTemperature();

  // Store temperature and humidity values ​​as integers
  int int_humid = (int)humid;
  int int_temp = (int)temp;

  if (cds > 500) { // Turn on the street lights when it gets dark
      setColor(255, 255, 255);
  } else {
      setColor(0, 0, 0); // Street lamp dream when the surroundings are bright
  }

  // The measured temperature and humidity values ​​are output to the LCD.
  // Humidity output
  lcd.setCursor(0,0);
  lcd.print( "H : " );
  lcd.setCursor(6,0);
  lcd.print(int_humid);
  lcd.setCursor(9,0);
  lcd.print( " % " );
  
  // Temperature output
  lcd.setCursor(0,1);
  lcd.print( "T : " );
  lcd.setCursor(6,1);
  lcd.print(int_temp);
  lcd.setCursor(9,1);
  lcd.print( " C " );

  String data = String(int_temp) + " " + String(int_humid);
  Serial.println(data);

  digitalWrite(trigPin, LOW);
  digitalWrite(echoPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  unsigned long duration = pulseIn(echoPin, HIGH);
  float distance = ((float)(340 * duration) / 10000) / 2;

  if (distance < 7.5) {
      digitalWrite(traffic_y_led, HIGH);
      delay(500);
      digitalWrite(traffic_y_led, LOW);
      delay(500);
      digitalWrite(traffic_r_led, HIGH);
      delay(3000);
      digitalWrite(traffic_r_led, LOW);
      delay(500);
  } else {
      digitalWrite(traffic_g_led, HIGH);
      delay(1500);
      digitalWrite(traffic_g_led, LOW);
      delay(500);
  }
}

void setColor(int red, int green, int blue){
  analogWrite(street_r_led, red);
  analogWrite(street_g_led, green);
  analogWrite(street_b_led, blue);
}