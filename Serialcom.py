import serial
import sys
ser= serial.Serial('/dev/ttyACM0',9600)
if sys.argv[1]=="on":   
    ser.write("joseferon")
elif sys.argv[1]=="off":    
    ser.write("joseferoff")
ser.close()
   
