#include <ESP32Firebase.h>

#include "EmonLib.h"   //https://github.com/openenergymonitor/EmonLib
#define _SSID "Samehada"          // Your WiFi SSID
#define _PASSWORD "112345678"      // Your WiFi Password
#define REFERENCE_URL "https://electro-buck-default-rtdb.asia-southeast1.firebasedatabase.app/"

EnergyMonitor emon;
#define vCalibration 106.8
#define currCalibration 10

float kWh = 0;
unsigned long lastmillis = millis();

Firebase firebase(REFERENCE_URL);
float current; // Corrected variable name
float voltage;
float power;
String alert="alert";
String fine ="fine";

void setup() {
  Serial.begin(115200);
  
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(1000);

  // emon.voltage(35, vCalibration, 1.7); // Voltage: input pin, calibration, phase_shift
  // emon.current(34, currCalibration);

  emon.voltage(35, vCalibration, 1.7); // Voltage: input pin, calibration, phase_shift
  emon.current(34, currCalibration);

  // Connect to WiFi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(_SSID);
  WiFi.begin(_SSID, _PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("-");
  }

  Serial.println("");
  Serial.println("WiFi Connected");

  // Print the IP address
  Serial.print("IP Address: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");

  float dcur=firebase.getFloat("appliance/LED1/current");
  float dvol=firebase.getFloat("appliance/LED1/voltage");
  float dpow=firebase.getFloat("appliance/LED1/power");
  float dsta=firebase.getFloat("appliance/LED1/status");
  //================================================================//
  //================================================================//
  // Upload real-time random float to Firebase
  firebase.setFloat("appliance/LED1/current", dcur);
  firebase.setFloat("appliance/LED1/voltage", dvol);
  firebase.setFloat("appliance/LED1/power", dpow);
  firebase.setFloat("appliance/LED1/status", dsta);
  current=dcur;
  voltage=dvol;
  kWh=dpow; // Corrected variable name
  delay(5000);
}


void loop() {

    emon.calcVI(20, 2000);
    Serial.print("Vrms: ");
    Serial.print(emon.Vrms, 2);
    Serial.print("V");
    firebase.setFloat("appliance/LED1/voltage", emon.Vrms);

    Serial.print("\tIrms: ");
    Serial.print((emon.Irms)*17, 4);
    Serial.print("A");
    firebase.setFloat("appliance/LED1/current", emon.Irms*17);

    Serial.print("\tPower: ");
    Serial.print(emon.apparentPower, 4);
    Serial.print("W");

    float damt=firebase.getFloat("appliance/LED1/amount");
    float bud=firebase.getFloat("budget");
    if(damt>bud){
      firebase.setString("appliance/LED1/status", alert);
    }
    if(damt<bud){
      firebase.setString("appliance/LED1/status", fine);
    }

    Serial.print("\tkWh: ");
    kWh = kWh + emon.apparentPower*(millis()-lastmillis)/3600000000.0;
    Serial.print(kWh, 4);
    Serial.println("kWh");
    lastmillis = millis();
    firebase.setFloat("appliance/LED1/power", kWh);
    firebase.setFloat("appliance/LED1/amount", kWh*7);

    delay(1000);
}
