#pragma once

class Shovel {
  private:
    const int pinShovelRight = 19;
    const int pinShovelLeft = 18;
    
    
  public:
    Shovel() {
      pinMode(pinShovelLeft, OUTPUT);
      pinMode(pinShovelRight, OUTPUT);
    }
  
    void moveLeft () {
      digitalWrite(pinShovelLeft, HIGH);
      digitalWrite(pinShovelRight, LOW);
    }

    void moveRight () {
      digitalWrite(pinShovelLeft, LOW);
      digitalWrite(pinShovelRight, HIGH);
    }

    void stopMovement () {
      digitalWrite(pinShovelLeft, LOW);
      digitalWrite(pinShovelRight, LOW);
    }
};
