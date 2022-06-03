package com.github.maxelkin5gm.stas.delivery;

import com.github.maxelkin5gm.stas.entities.enums.StateStasEnum;
import com.github.maxelkin5gm.stas.utils.ValidateCell;
import lombok.AccessLevel;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.ServletResponse;
import java.io.IOException;
import java.util.Objects;

@Getter
public class TestDelivery {

    @Getter(AccessLevel.PRIVATE)
    private final Serial serial = null;
    private final int stasIndex;
    private int cellNumber;
    private String side;
    private StateStasEnum state = StateStasEnum.READY;
    private String error;

    public TestDelivery(int stasIndex, String portName) {
        this.stasIndex = stasIndex;
    }

    public void bringCell(String side, int cellNumber, ServletResponse response) throws IOException {
        try {
            ValidateCell.validateCellNumber(cellNumber);
            var sideInt = ValidateCell.getSideInt(side);

            this.cellNumber = cellNumber;
            this.side = side;
            this.error = null;

            response.getWriter().close();

            Thread.sleep(2000);

            setState(StateStasEnum.WAIT);
        } catch (Exception e) {
            setState(StateStasEnum.READY);
            try {
                throw e;
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
        }
    }

    public void bringBackCell(ServletResponse response) throws IOException {
        try {
            ValidateCell.validateCellNumber(this.cellNumber);
            var sideInt = ValidateCell.getSideInt(this.side);
            this.error = null;

            response.getWriter().close();

            Thread.sleep(2000);

            setState(StateStasEnum.READY);
        } catch (Exception e) {
            setState(StateStasEnum.READY);
            try {
                throw e;
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
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
//        serial.setSerialPort(portDescriptor);
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getSystemPortName() {
        return "Arduino не подключено";
    }
}
