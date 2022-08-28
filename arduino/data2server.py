import serial
import time
import requests

COMPORT = "/dev/tty.usbserial-143310"
BAUDRATE = 9600

def data2server():
  ser = serial.Serial(COMPORT, BAUDRATE, timeout=0)
  
  prev_temp = -1
  prev_humidity = -1
  prev_car = -1

  print("Start Serial Monitor")

  while True:
    # get new data
    line = ser.readline().decode('ascii')[:-1]

    if line != "":
      temp, humidity, car = line.split()
      print(f"temp: {temp} humidity: {humidity} car: {car}")

      # check whether data is updated
      if (temp != prev_temp or humidity != prev_humidity or car != prev_car):
        url = f"https://adminbempolije.com/api/temp?temp={temp}&humidity={humidity}&car={car}"
        http_code = requests.post(url)
        print(f"[POST] temp: {temp} humidity: {humidity} car: {car}")

      # get previous data
      prev_temp = temp
      prev_humidity = humidity
      prev_car = car

      time.sleep(3)
      line = ser.readline().decode('ascii')[:-1]

data2server()