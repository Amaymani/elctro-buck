#include <ESP32Firebase.h>

#define _SSID "HimanshuBsdk"          // Your WiFi SSID
#define _PASSWORD "somu9999"      // Your WiFi Password
#define REFERENCE_URL "https://electro-buck-default-rtdb.asia-southeast1.firebasedatabase.app/"  // Your Firebase project reference url

Firebase firebase(REFERENCE_URL);
float current; // Corrected variable name
float voltage;
float power;
void setup() {
  Serial.begin(115200);
  
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(1000);

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
  float dpow=dcur*dvol;
  //================================================================//
  //================================================================//
  // Upload real-time random float to Firebase
  firebase.setFloat("appliance/LED1/current", dcur);
  firebase.setFloat("appliance/LED1/voltage", dvol);
  firebase.setFloat("appliance/LED1/power", dpow);
  current=dcur;
  voltage=dvol; // Corrected variable name
  delay(20000);
}


void loop() {
    current++;
    voltage++;
    power=current*voltage; // Corrected variable name
    // Upload the float value to Firebase
    firebase.setFloat("appliance/LED1/current", current);
    firebase.setFloat("appliance/LED1/voltage", voltage);
    firebase.setFloat("appliance/LED1/power", power); // Corrected variable name
  
    // Print the uploaded float value
    Serial.print("Uploaded Power:\t");
    Serial.println(current);
    Serial.println(voltage);
    Serial.println(power); // Corrected variable name

    delay(1000);
}
