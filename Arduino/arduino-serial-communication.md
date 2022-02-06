# Arduino Serial Communication

## Start Serial
Serial.begin(baud)
## Serial.write()
[Serial Write Docs](https://www.arduino.cc/reference/en/language/functions/communication/serial/write/)


## Serial.print()

[Serial Print Docs](https://www.arduino.cc/reference/en/language/functions/communication/serial/print/)

##### Examples
```C++
// listener.ino

String command;

void setup(){
    Serial.begin(115200);
}

void loop(){
    if(Serial.available()){
        char c = Serial.read();
        if( c == '\n'){
            parseCommand(command);
            command = "";
        } else {
            command += c;
        }
    }
}

void parseCommand(String com){
    if ( com == "list" ){
        // List available commands
        Serial.print("Commands available: ");
        Serial.print("send ");
        Serial.println();
    } else if ( com == "send" ){
        // Send readings 
        Serial.write("Sent");
        Serial.write("\r\n"); 
    } else {
        // Fail
        Serial.print("Command \"");
        Serial.print(com);
        Serial.print("\" not recognized, use command \"list\" for available commands");
        Serial.println();
    }
    
}
```

#### PacketSerial

TODO: investigate

[Packet Serial Docs](https://www.arduino.cc/reference/en/libraries/packetserial/)


#### ASCII encoding
- \n is the Newline character 0x0A (decimal 10)
- \r is the Carriage Return character 0x0D (decimal 13)