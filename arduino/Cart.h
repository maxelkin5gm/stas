#pragma once

#include "Sensors.h"
#include "Shovel.h"
#include "Engine.h"

class Cart {
  private:

    Shovel shovel = Shovel();
    Engine engine = Engine();
    Sensors sensors = Sensors();
    bool flag = true;

  public:
    Cart () {}
  
    void pickUp (int x, int y, int side) {

        while (true) {
            int hD = sensors.readHorisontalSensors();
            int vD = sensors.readVerticalSensors();

            if (hD == x) {
                engine.stopHorisontalMovement();
            } else {
                if ((sensors.readHorisontalSensors() > (x - 3))) 
                    flag = false;

                if (flag) 
                    engine.moveForward(2);
                else 
                    engine.moveForward(1);
            }

            if (vD == y) {
                engine.stopVerticalMovement();
            } else 
                engine.moveUp();

            if (hD == x && vD == y) {
                break;
            } 
        }
        flag=true;
                                                                        
        delay(100);

        switch (side) {
        case 0:  

            while (sensors.getShovelLeftSensorValue() != 1) {       
                shovel.moveLeft();                                  
            }
            shovel.stopMovement();    
            delay(100);
     
            engine.moveUp();
            delay(700);  

            engine.stopVerticalMovement();                          
            delay(100);

            while (sensors.getShovelNeutralSensorValue() == 1) {    
                shovel.moveRight();                                 
            }
            shovel.stopMovement();                                  

            while (sensors.getDownLimitSensorValue() != 1) {        
                engine.moveDown();                                  
            }
            engine.stopVerticalMovement();

            break;
            
        case 1:       

            while (sensors.getShovelRightSensorValue() != 1) {      
                shovel.moveRight();                                 
            }
            shovel.stopMovement();
            delay(100);
    
            engine.moveUp();
            delay(700);   

            engine.stopVerticalMovement();                          
            delay(100);

            while (sensors.getShovelNeutralSensorValue() == 1) {    
                shovel.moveLeft();                                  
            }
            shovel.stopMovement();                                  

            while (sensors.getDownLimitSensorValue() != 1) {        
                engine.moveDown();                                  
            }
            engine.stopVerticalMovement(); 

            break;
        }

        while (true) {
            int hD = sensors.readHorisontalSensors();
            int vD = sensors.readVerticalSensors();

            if (hD == 0) {
                engine.stopHorisontalMovement();
            } else {
                if ((hD < 3) && (hD != -1))
                    flag = false;

                if (flag) 
                    engine.moveBackward(2);
                else 
                    engine.moveBackward(1);
                
            }


            if (vD == 0) {
                engine.stopVerticalMovement();
            } else 
                engine.moveDown();

            if (vD == 0 && hD == 0) {
                break;
            }
        }
        flag=true;

        if (y == 0) {
            engine.moveUp();
            delay(800);
        }
        engine.stopVerticalMovement();

        while (sensors.getShovelRightSensorValue() != 1) {      
            shovel.moveRight();                                 
        }
        shovel.stopMovement();
        delay(100);

        engine.moveDown();
        delay(1000);
        engine.stopVerticalMovement();                                  
        delay(100);

        while (sensors.getShovelNeutralSensorValue() == 1) {      
            shovel.moveLeft();
        }
        shovel.stopMovement();  
        delay(100);

        flag=true;
        Serial.print("READY");

    }

    void putBack(int x, int y, int side) {

        

        while (sensors.getShovelRightSensorValue() != 1) {      
            shovel.moveRight();                                 
        }
        shovel.stopMovement();
        delay(100);

        engine.moveUp();
        delay(800);
        engine.stopVerticalMovement();                                  
        delay(100);

        while (sensors.getShovelNeutralSensorValue() == 1) {      
            shovel.moveLeft();
        }
        shovel.stopMovement();  
        delay(100);




        while (true) {
            int hD = sensors.readHorisontalSensors();
            int vD = sensors.readVerticalSensors();

            if (hD == x) {
                engine.stopHorisontalMovement();
            } else {
                if ((sensors.readHorisontalSensors() > (x - 3))) 
                flag = false;

                if (flag) 
                    engine.moveForward(2);
                else 
                    engine.moveForward(1);
            }

            if (vD == y) {
                engine.stopVerticalMovement();
            } else 
                engine.moveUp();

            if (hD == x && vD == y) {
                break;
            }    
        }
        flag=true;

        if (y != 0) {
            engine.moveUp();
            delay(800);
        }   
   

        engine.stopVerticalMovement();                                  
        delay(100);


        switch (side) {
        case 0:     

            while (sensors.getShovelLeftSensorValue() != 1) {       
                shovel.moveLeft();                                  
            }
            shovel.stopMovement();
            delay(100);

            while (sensors.getDownLimitSensorValue() != 1) {        
                engine.moveDown();                                 
            }
            engine.stopVerticalMovement();
            delay(100);

            while (sensors.getShovelNeutralSensorValue() == 1) {      
                shovel.moveRight();                                 
            }
            shovel.stopMovement();
            delay(100);

            break;

        case 1:

            while (sensors.getShovelRightSensorValue() != 1) {      
                shovel.moveRight();                                 
            }
            shovel.stopMovement();
            delay(100);


            while (sensors.getDownLimitSensorValue() != 1) {        
                engine.moveDown();                                  
            }
            engine.stopVerticalMovement();                       
            delay(100);

            while (sensors.getShovelNeutralSensorValue() == 1) {      
                shovel.moveLeft();
            }
            shovel.stopMovement();  
            delay(100);

            break;
        }


        while (true) {
            int hD = sensors.readHorisontalSensors();
            int vD = sensors.readVerticalSensors();

            if (hD == 0) {
                engine.stopHorisontalMovement();
            } else {
                if ((hD < 3) && (hD != -1))
                    flag = false;

                if (flag) 
                    engine.moveBackward(2);
                else 
                    engine.moveBackward(1);
                
            }


            if (vD == 0) {
                engine.stopVerticalMovement();
            } else 
                engine.moveDown();

            if (vD == 0 && hD == 0) {
                break;
            }
        }
        flag=true;

        if (sensors.readVerticalSensors() == 0) {
            engine.moveDown();
            delay(1000);
        }
        engine.stopVerticalMovement();

        delay(100);
        flag=true;
        Serial.print("READY");

    }

    void testVerticalSensors() {
        for (int i = 0; i++; i < 13) {
            if (sensors.readVerticalSensor(i) == 1) {
                Serial.println("Na datchike #");
                Serial.print(sensors.readVerticalSensor(i));
                Serial.println("--------------");
                delay(200);
            }
        }
    }

    void testArrayFunction() {
        Serial.println("Znacheniya datchikov:");
        Serial.println(sensors.readHorisontalSensors());
    }

    void testPerformance(int testCycles) {

        while (sensors.readHorisontalSensors() != 2) {
            engine.moveForward(1);
        }

        engine.stopHorisontalMovement();
        delay(100);

        while (sensors.getShovelLeftSensorValue() != 1) {
            shovel.moveLeft();
        }

        shovel.stopMovement();
        Serial.println("Äàò÷èê îãðàíè÷åíèÿ äâèæåíèÿ ëîïàòêè âëåâî ðàáîòàåò êîððåêòíî");
        delay(100);

        while (sensors.getShovelNeutralSensorValue() == 1) {
            shovel.moveRight();
        }

        shovel.stopMovement();
        Serial.println("Äàò÷èê íåéòðàëüíîãî ïîëîæåíèÿ ëîïàòêè âëåâî ðàáîòàåò êîððåêòíî");
        delay(100);

        while (sensors.getShovelRightSensorValue() != 1) {
            shovel.moveRight();
        }

        shovel.stopMovement();
        Serial.println("Äàò÷èê îãðàíè÷åíèÿ äâèæåíèÿ ëîïàòêè âïðàâî ðàáîòàåò êîððåêòíî");
        delay(100);

        while (sensors.getShovelNeutralSensorValue() == 1) {
            shovel.moveLeft();
        }
        shovel.stopMovement();
        delay(100);

        while (sensors.readHorisontalSensors() != 1) {
            engine.moveBackward(1);
        }

        engine.stopHorisontalMovement();
        Serial.println("Ãîðèçîíòàëüíûé äàò÷èê çîíû âûãðóçêè ðàáîòàåò êîððåêòíî");
        delay(100);

        for (int i = 2; i < 26; i++) {

            while (sensors.readHorisontalSensors() != i) {
                engine.moveForward(1);
            }
            engine.stopHorisontalMovement();
            Serial.println("Ãîðèçîíòàëüíûé äàò÷èê ");
            Serial.print(i);
            Serial.print(" ðàáîòàåò êîððåêòíî");
            delay(100);
        }

        while (sensors.readHorisontalSensors() != 1) {
            engine.moveBackward(1);
        }
        engine.stopHorisontalMovement();
        delay(100);

        for (int j = 1; j < 13; j++) {

            while (sensors.readVerticalSensors() != j) {
                engine.moveUp();
            }
            engine.stopHorisontalMovement();
            Serial.println("Âåðòèêàëüíûé äàò÷èê ");
            Serial.print(j);
            Serial.print(" ðàáîòàåò êîððåêòíî");
            delay(100);
        }

        while (sensors.readVerticalSensors() != 0) {
            engine.moveDown();
        }
        engine.stopHorisontalMovement();
        delay(100);

    }

};