#include "C:\Users\nasakinaia\Desktop\STAS\Cart.h"
#include "C:\Users\nasakinaia\Desktop\STAS\Engine.h"
#include "C:\Users\nasakinaia\Desktop\STAS\Sensors.h"
#include "C:\Users\nasakinaia\Desktop\STAS\Shovel.h"
#include "C:\Users\nasakinaia\Desktop\STAS\Parsing.h"

String inString = "";
Cart cart;
Sensors sensors;
Parsing parsing;
Engine engine;

bool getCommandFromSerial() {
  
  while (Serial.available() > 0) {
    inString = Serial.readString();
    parsing.parseInput(inString);
    return true;
  }
  return false;
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  char action = ' ';
  parsing.clearAll();
  Serial.flush();
  
  getCommandFromSerial();

  if (parsing.getFinished() != "") {  
    if (parsing.getCommand() == "p")
      action = 'p';
    else if (parsing.getCommand() == "b") 
      action = 'b';
  }

  
  switch (action) {
    case 'p':
      cart.pickUp(parsing.getX(), parsing.getY(), parsing.getSide());
      break;
    case 'b':
      cart.putBack(parsing.getX(), parsing.getY(), parsing.getSide());
      break;
  } 
}
