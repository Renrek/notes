# Python Serial Governor (Commands microcontroller over serial)

Goal: Have this script as a chron job and automate sensor data to database storage based on specified timed.

TODO: Add error catching along with logging events

[Arduino Micro Controller listener example]()

## Files
###### governor.py
```python
import configparser
import serial
import time

# Gather Parameters
cfg = configparser.ConfigParser()
cfg.read('config.ini')
devPort = cfg.get('DEVICE', 'port')
devBaud = cfg.get('DEVICE', 'baud')
devCommand = cfg.get('DEVICE', 'command')

# Set up connection details
ser = serial.Serial(
    port = devPort,
    baudrate = devBaud,
    timeout=10
)

# Clear the stream
ser.reset_input_buffer()
ser.reset_output_buffer()

# Wait for microcontroller prepare itself
time.sleep(5)

# Send Command
ser.write(f'{devCommand}\n'.encode('utf-8'))

# Read microcontroller output
data = ser.readline().decode('utf-8').strip()

# Do something with data here
# for example send to database (code not included)
print(data)

# Conclude connection
ser.close()
```

###### config.ini
```ini
[DEVICE]
port=/dev/cu.usbserial-DN03FE6A
baud=115200
command=send
```