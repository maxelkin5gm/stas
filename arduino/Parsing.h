#pragma once

class Parsing {
private:
    int x = 0;
    int y = 0;
    int side = 0;
    String command = "";
    String finished = "";
    int cellNumber = 0;

public:
    Parsing() {}

    void parseInput(String data) {
        int i1 = data.indexOf(',');
        command = data.substring(0, i1);
        int i2 = data.indexOf(',', i1 + 1);
        cellNumber = data.substring(i1 + 1, i2 + 1).toInt();
        int i3 = data.indexOf(',', i2 + 1);
        side = data.substring(i2 + 1).toInt();
        //finished = data.substring(i3 + 1).toInt();

        if (cellNumber > 300 || cellNumber < 1) {
            Serial.println("Неправильно указан номер ячейки");
            command = "";
            x = 0;
            y = 0;
            side = 0;
            return;
        }
        else {
            if (cellNumber % 25 == 0)
                x = 25;
            else
                x = cellNumber % 25;
            y = cellNumber / 25;

            if (cellNumber % 25 == 0)
                y = y - 1;
        }

        if (y > 10 || y == 6) {
            Serial.print("Ряд по горизнтали недоступен по техническим причинам");
            command = "";
            x = 0;
            y = 0;
            side = 0;
            return; 
        }

        Serial.print("OK");


        //  int i2 = data.indexOf(',', i1 + 1);
        //  x = data.substring(i1 + 1, i2 + 1).toInt();
        //  Serial.print(x);
        //  int i3 = data.indexOf(',', i2 + 1);
        //  y = data.substring(i2 + 1, i3 + 1).toInt();
        //  int i4 = data.indexOf(',', i3 + 1);
        //  side = data.substring(i3 + 1, i4 + 1).toInt();
        //  int i5 = data.indexOf(',', i4 + 1);
        //  finished = data.substring(i4 + 1).toInt();
    }

    int getX() {
        return x;
    }

    int getY() {
        return y;
    }

    int getSide() {
        return side;
    }

    String getCommand() {
        return command;
    }

    String getFinished() {
        return command;
    }

    void clearAll() {
        x = 0;
        y = 0;
        side = 0;
        command = "";
        finished = "";
    }
};
