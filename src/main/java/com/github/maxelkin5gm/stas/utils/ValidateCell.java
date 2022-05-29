package com.github.maxelkin5gm.stas.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ValidateCell {

    public static int getSideInt(String side) throws ResponseStatusException {
        if (side.equals("ЛЕВО"))
            return 0;
        else if (side.equals("ПРАВО"))
            return 1;
        else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Не правильно указана сторона ячейки");
    }

    public static void validateCellNumber(int cellNumber) throws ResponseStatusException {
        if (cellNumber < 1 || cellNumber > 300)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Номер ячейки должен быть в диапозоне от 1 до 300");
    }

}
