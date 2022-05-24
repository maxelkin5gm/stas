package com.github.maxelkin5gm.stas.delivery;

import java.util.Objects;

public class StasDelivery {

    static final StasDelivery[] LIST_STAS = new StasDelivery[]{new StasDelivery(), new StasDelivery(), new StasDelivery()};

    private String state;

    public StasDelivery() {
        state = "READY";
    }

    public void forward() {
        state = "FORWARD";
    }

    public void back() {
        state = "BACK";
    }

    public String getState() {
        return state;
    }

    public boolean isBusy() {
        return !Objects.equals(state, "READY");
    }

    public static StasDelivery getStasBy(int stasIndex) {
        return LIST_STAS[stasIndex];
    }
}
