#pragma once

class Engine {
  private:
    const int pinEngineForward = 14;
    const int pinEngindeBackward = 15;
    const int pinEngineFast = 16;
    const int pinEngineSlow = 17;
    const int pinEngineDown = 20;
    const int pinEngineUp = 21;
    
  public:
    Engine() {
      pinMode(pinEngineForward, OUTPUT);
      pinMode(pinEngindeBackward, OUTPUT);
      pinMode(pinEngineFast, OUTPUT);
      pinMode(pinEngineSlow, OUTPUT);
      pinMode(pinEngineDown, OUTPUT);
      pinMode(pinEngineUp, OUTPUT);
    }
  
    void moveForward(int speed) {
      if (speed == 1) {
        digitalWrite(pinEngineForward, HIGH);
        digitalWrite(pinEngindeBackward, LOW);
        digitalWrite(pinEngineFast, LOW);
        digitalWrite(pinEngineSlow, HIGH);
      }
      if (speed == 2) {
        digitalWrite(pinEngineForward, HIGH);
        digitalWrite(pinEngindeBackward, LOW);
        digitalWrite(pinEngineFast, HIGH);
        digitalWrite(pinEngineSlow, LOW);
      }
    }

    void moveBackward(int speed) {
      if (speed == 1) {
        digitalWrite(pinEngineForward, LOW);
        digitalWrite(pinEngindeBackward, HIGH);
        digitalWrite(pinEngineFast, HIGH);
        digitalWrite(pinEngineSlow, LOW);
      }
      if (speed == 2) {
        digitalWrite(pinEngineForward, LOW);
        digitalWrite(pinEngindeBackward, HIGH);
        digitalWrite(pinEngineFast, LOW);
        digitalWrite(pinEngineSlow, HIGH);
      }
    }

    void moveUp() {
        digitalWrite(pinEngineUp, HIGH);
        digitalWrite(pinEngineDown, LOW);
    }

    void moveDown() {
        digitalWrite(pinEngineUp, LOW);
        digitalWrite(pinEngineDown, HIGH);
    }

    void stopHorisontalMovement() {
      digitalWrite(pinEngineForward, LOW);
      digitalWrite(pinEngindeBackward, LOW);
      digitalWrite(pinEngineFast, LOW);
      digitalWrite(pinEngineSlow, LOW);
    }

    void stopVerticalMovement() {
        digitalWrite(pinEngineUp, LOW);
        digitalWrite(pinEngineDown, LOW);
    }

    void stopMovement() {
        digitalWrite(pinEngineForward, LOW);
        digitalWrite(pinEngindeBackward, LOW);
        digitalWrite(pinEngineFast, LOW);
        digitalWrite(pinEngineSlow, LOW);
        digitalWrite(pinEngineUp, LOW);
        digitalWrite(pinEngineDown, LOW);
    }
};
