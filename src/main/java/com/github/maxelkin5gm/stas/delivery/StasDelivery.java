package com.github.maxelkin5gm.stas.delivery;

import java.util.Objects;

public class StasDelivery {

    static final StasDelivery[] LIST_STAS = new StasDelivery[]{new StasDelivery(), new StasDelivery(), new StasDelivery()};

    private String state;
    private int cellNumber;
    private String side;
    private String error;

    public StasDelivery() {
        state = "READY";
        cellNumber = 11;
        side = "ПРАВО";
    }

    public void bringCell(String side, int cellNumber) {
        state = "GO";
        this.cellNumber = cellNumber;
        this.side = side;
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        state = "WAIT";
    }

    public void bringBackCell() {
        state = "GO";
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        state = "READY";
    }


    public boolean isBusy() {
        return !Objects.equals(state, "READY");
    }

    public static StasDelivery getBy(int stasIndex) {
        return LIST_STAS[stasIndex];
    }


    public String getState() {
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
