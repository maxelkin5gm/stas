package com.github.maxelkin5gm.stas.delivery;

import com.github.maxelkin5gm.stas.entities.enums.StateStasEnum;
import com.github.maxelkin5gm.stas.utils.ValidateCell;
import lombok.AccessLevel;
import lombok.Getter;

import javax.servlet.ServletResponse;
import java.io.IOException;
import java.util.Objects;

@Getter
public class StasDelivery {

    @Getter(AccessLevel.PRIVATE)
    private Serial serial = new Serial("COM3");
    private final int stasIndex;
    private int cellNumber;
    private String side;
    private StateStasEnum state = StateStasEnum.READY;
    private String error;

    public StasDelivery(int stasIndex) {
        this.stasIndex = stasIndex;
    }

    public void bringCell(String side, int cellNumber, ServletResponse response) throws IOException {
        try {
            ValidateCell.validateCellNumber(cellNumber);
            var sideInt = ValidateCell.getSideInt(side);

            this.cellNumber = cellNumber;
            this.side = side;
            this.error = null;
//            if (!serial.openPort())
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
//                        "Не получилось открыть порт. Проверьте настройки или перезапустите сервер.");
//
//            var command = "p," + cellNumber + "," + sideInt;
//            serial.writeString(command);
//            var responseStatus = serial.readString(5000);
//            if (responseStatus == null || !responseStatus.equals("OK")) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Arduino crash");
//            }
//            response.getWriter().close();
//
//            responseStatus = serial.readString(120000);
//            if (responseStatus == null || !responseStatus.equals("READY")) {
//                error = "Arduino crash";
//                setState(StateStasEnum.READY);
//                return;
//            }

            // for test, потом удалить exceptions
            response.getWriter().close();
            Thread.sleep(5000);

//            error = "СТАС " + (stasIndex + 1) + ": Arduino crash";
//            setState(StateStasEnum.READY);

            setState(StateStasEnum.WAIT);
            return;


//            setState(StateStasEnum.WAIT);
        } catch (Exception e) {
            setState(StateStasEnum.READY);
            try {
                throw e;
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
        } finally {
            System.out.print("Close port: ");
            System.out.println(serial.closePort());
        }
    }

    public void bringBackCell(ServletResponse response) throws IOException {
        try {
            ValidateCell.validateCellNumber(this.cellNumber);
            var sideInt = ValidateCell.getSideInt(this.side);
            this.error = null;

//            if (!serial.openPort())
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
//                        "Не получилось открыть порт. Проверьте настройки или перезапустите сервер.");
//
//            var command = "b," + cellNumber + "," + sideInt;
//            serial.writeString(command);
//            var responseStatus = serial.readString(5000);
//            if (responseStatus == null || !responseStatus.equals("OK")) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Arduino crash");
//            }
//            response.getWriter().close();
//
//            responseStatus = serial.readString(120000);
//            if (responseStatus == null || !responseStatus.equals("READY")) {
//                error = "Arduino crash";
//                setState(StateStasEnum.READY);
//                return;
//            }



            // for test, потом удалить exceptions
            response.getWriter().close();
            Thread.sleep(5000);

//            error = "СТАС " + (stasIndex + 1) + ": Arduino crash";
//            setState(StateStasEnum.READY);

            setState(StateStasEnum.READY);
            return;


//            setState(StateStasEnum.WAIT);
        } catch (Exception e) {
            setState(StateStasEnum.READY);
            try {
                throw e;
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
        } finally {
            System.out.print("Close port: ");
            System.out.println(serial.closePort());
        }
    }

    public void removeCell() {
        setState(StateStasEnum.READY);
    }

    public void returnCell(String side, int cellNumber) {
        ValidateCell.validateCellNumber(cellNumber);
        ValidateCell.getSideInt(side);
        setState(StateStasEnum.WAIT);
        this.cellNumber = cellNumber;
        this.side = side;
    }

    public synchronized boolean takeStasForBring() {
        if (Objects.equals(state, StateStasEnum.READY)) {
            state = StateStasEnum.GO;
            return true;
        }
        return false;
    }
    public synchronized boolean takeStasForBringBack() {
        if (Objects.equals(state, StateStasEnum.WAIT)) {
            state = StateStasEnum.GO;
            return true;
        }
        return false;
    }

    public synchronized void setState(StateStasEnum stateStasEnum) {
        state = stateStasEnum;
    }

    public void setSerial(String portDescriptor) {
        serial = new Serial(portDescriptor);
    }

    public void setError(String error) {
        this.error = error;
    }
}
