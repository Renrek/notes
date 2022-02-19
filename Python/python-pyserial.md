# Pyserial

Serial communication I use to communicate to microcontrollers.

[Github](https://github.com/bakercp/PacketSerial)

[Webpage](https://pyserial.readthedocs.io/)

[Arduino](https://create.arduino.cc/projecthub/ansh2919/serial-communication-between-python-and-arduino-e7cce0)

#### Installation
```shell
pip3 install pyserial
```
#### Commands of Note
Show available ports
```shell
python3 -m serial.tools.list_ports
```
Other commands: `dmesg | grep -i usb` or `dmesg | grep -i tty`

```python
# Importing Libraries
import serial
import time

ser = serial.Serial(
    port='/dev/cu.usbserial-DN03FE6A', 
    baudrate=9600, 
    timeout=.1
)

ser.flushInput()
ser.flushOutput()

ser = serial.Serial(port='/dev/cu.usbserial-DN03FE6A', baudrate=9600, timeout=.1)
def write_read(x):
    ser.write(bytes(x, 'utf-8'))
    time.sleep(0.05)
    data = ser.readline()
    return data
while True:
    num = input("Enter a number: ") # Taking input from user
    value = write_read(num)
    print(value) # printing the value
```