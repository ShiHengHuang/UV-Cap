#include <CurieBLE.h>
#include <Wire.h>
#include <SoftwareSerial.h>

#include "Adafruit_SI1145.h"
#include "TinyGPS.h"

const int ledPin = 13; // set ledPin to use on-board LED
BLEPeripheral blePeripheral; // create peripheral instance

BLEService uvService("000A"); // create service

// create switch characteristic and allow remote device to read and write
BLEFloatCharacteristic uvValue("000B", BLERead | BLENotify);
BLEFloatCharacteristic latValue("000C", BLERead | BLENotify);
BLEFloatCharacteristic lonValue("000D", BLERead | BLENotify);

Adafruit_SI1145 uv = Adafruit_SI1145();

long previousMillis = 0;

TinyGPS gps;
SoftwareSerial ss(4, 3);

void setup() {
  Serial.begin(9600);
  ss.begin(9600);

  if (! uv.begin()) {
    Serial.println("Didn't find Si1145");
    while (1);
  }
  
  pinMode(ledPin, OUTPUT); // use the LED on pin 13 as an output

  // set the local name peripheral advertises
  blePeripheral.setLocalName("UV-Cap");
  // set the UUID for the service this peripheral advertises
  blePeripheral.setAdvertisedServiceUuid(uvService.uuid());

  

  // add service and characteristic
  blePeripheral.addAttribute(uvService);
  blePeripheral.addAttribute(uvValue);
  blePeripheral.addAttribute(latValue);
  blePeripheral.addAttribute(lonValue);

  uvValue.setValue(0.0);
  latValue.setValue(0.0);
  lonValue.setValue(0.0);

  // advertise the service
  blePeripheral.begin();
  Serial.println(("Bluetooth device active, waiting for connections..."));
}

void loop() {
  BLECentral central = blePeripheral.central();

  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());
    // turn on the LED to indicate the connection:
    digitalWrite(13, HIGH);

    while (central.connected()) {
      long currentMillis = millis();
      // if 200ms have passed, check the battery level:
      if (currentMillis - previousMillis >= 2000) {
        previousMillis = currentMillis;
        uploadUV();
      }
    }
    // when the central disconnects, turn off the LED:
    digitalWrite(13, LOW);
    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }
}

void uploadUV() {
  float UVindex = uv.readUV();
  Serial.print("UV: "); // print it.00
  Serial.println(UVindex);
  uvValue.setValue(UVindex); 

  bool newData = false;

  // For one second we parse GPS data and report some key values
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
    while (ss.available())
    {
      char c = ss.read();
      // Serial.write(c); // uncomment this line if you want to see the GPS data flowing
      if (gps.encode(c)) // Did a new valid sentence come in?
        newData = true;
    }
  }

  if (newData)
  {
    float flat, flon;
    unsigned long age;
    gps.f_get_position(&flat, &flon, &age);
    Serial.print("LAT=");
    if(flat == TinyGPS::GPS_INVALID_F_ANGLE){
      flat = 0.0;
    }
    Serial.print(flat, 6);
    latValue.setValue(flat);
    
    Serial.print(" LON=");
    if(flon == TinyGPS::GPS_INVALID_F_ANGLE){
      flon = 0.0;
    }
    Serial.println(flon, 6);
    lonValue.setValue(flon);
  }
  Serial.println();
}

