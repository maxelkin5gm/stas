#pragma once

class Sensors {
  public:
    static const int horizontalSensorsCount = 26;
    static const int verticalSensorsCount = 11;
    const int pinHorisontalSensors[horizontalSensorsCount] = {22, 23, 24, 25 ,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47};
    // Пин зоны выгрузки, пин 1 датчика, пин 2 датчика, пин 3 датчика, ..., пин 25 датчика.
  

    // exclude 11 datchik
    const int pinVerticalSensors[verticalSensorsCount] = {2, 3, 4, 5, 6 ,7, 8, 9, 10, 11, 12};
    // пин 1 датчика, пин 2 датчика, пин 3 датчика, ...., пин 12 датчика

    const int pinShovelNeutralSensor = A0;
    const int pinShovelLeftLimitSensor = A1;      //Оганичение движения лопатки влево
    const int pinShovelRightLimitSensor = A2;     //Ограничение движения лопатки вправо
    const int pinDownLimitSensor = A3;            //Ограничение движения вниз
    const int pinUpLimitSensor = A4;              //Ограничение движения вверх
    const int pinBoxOnSensor = A5;                //Ограничение занятой ячейки

    Sensors() {
      for (int i = 0; i < horizontalSensorsCount; i++) {
        pinMode(pinHorisontalSensors[i], INPUT);
      }

      for (int j = 0; j < verticalSensorsCount; j++) {
          pinMode(pinVerticalSensors[j], INPUT);
      }

      pinMode(pinShovelNeutralSensor, INPUT);
      pinMode(pinShovelLeftLimitSensor, INPUT);
      pinMode(pinShovelRightLimitSensor, INPUT);
      pinMode(pinDownLimitSensor, INPUT);
      pinMode(pinUpLimitSensor, INPUT);
      pinMode(pinBoxOnSensor, INPUT);
    }

    int getShovelNeutralSensorValue() {
        return digitalRead(pinShovelNeutralSensor);
    }

    int getShovelLeftSensorValue() {
        return digitalRead(pinShovelLeftLimitSensor);
    }

    int getShovelRightSensorValue() {
        return digitalRead(pinShovelRightLimitSensor);
    }

    int getUpLimitSensorValue() {
        return digitalRead(pinUpLimitSensor);
    }

    int getDownLimitSensorValue() {
        return digitalRead(pinDownLimitSensor);
    }

    int readHorisontalSensors() {
      int ret = -1;
      
      for (int i = 0; i < horizontalSensorsCount; i++) {
        if (digitalRead(pinHorisontalSensors[i]) == 1) {
          ret = i;
        }
      }
      return ret;
    }

    int readVerticalSensors() {
      int ret = -1;
      
      for (int j = 0; j < verticalSensorsCount; j++) {
        if (digitalRead(pinVerticalSensors[j]) == 1) {
          ret = j;
        }
      }
      return ret;
    }

    int readVerticalSensor(unsigned int j) {

        return digitalRead(pinVerticalSensors[j]);

    }
};
