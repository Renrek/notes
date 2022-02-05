# Arduino Serial Communication

## Start Serial
Serial.begin(baud)
## Serial.write()
[Serial Write Docs](https://www.arduino.cc/reference/en/language/functions/communication/serial/write/)


## Serial.print()

[Serial Print Docs](https://www.arduino.cc/reference/en/language/functions/communication/serial/print/)

##### Examples
```C++

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
    if(com == "send"){
        // Output A
        Serial.write(0x41);
        Serial.write("\n");
        
    } else if (com == "test"){
        // Output 0110 0001
        Serial.println('a', OCT);
    }
    
}
```

#### PacketSerial

TODO: investigate

[Packet Serial Docs](https://www.arduino.cc/reference/en/libraries/packetserial/)


#### ASCII encoding
- \n is the Newline character 0x0A (decimal 10)
- \r is the Carriage Return character 0x0D (decimal 13)