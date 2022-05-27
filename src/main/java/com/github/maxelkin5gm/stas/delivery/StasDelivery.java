package com.github.maxelkin5gm.stas.delivery;

import com.github.maxelkin5gm.stas.entities.enums.StateStasEnum;

import java.util.Objects;

public class StasDelivery {

    static final StasDelivery[] LIST_STAS = new StasDelivery[]{new StasDelivery(), new StasDelivery(), new StasDelivery()};

    private StateStasEnum state;
    private int cellNumber;
    private String side;
    private String error;

    public StasDelivery() {
        state = StateStasEnum.READY;
    }

    public void bringCell(String side, int cellNumber) {
        state = StateStasEnum.GO;
        this.cellNumber = cellNumber;
        this.side = side;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        state = StateStasEnum.WAIT;
    }

    public void bringBackCell() {
        state = StateStasEnum.GO;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        state = StateStasEnum.READY;
    }

    public void removeCell() {
        state = StateStasEnum.READY;
    }

    public void returnCell(String side, int cellNumber) {
        state = StateStasEnum.WAIT;
        this.cellNumber = cellNumber;
        this.side = side;
    }


    public boolean isBusy() {
        return !Objects.equals(state, StateStasEnum.READY);
    }

    public static StasDelivery getBy(int stasIndex) {
        return LIST_STAS[stasIndex];
    }


    public StateStasEnum getState() {
        return state;
    }

    public int getCellNumber() {
        return cellNumber;
    }

    public String getSide() {
        return side;
    }

    public String getError() {
        return error;
    }

}
