package com.github.maxelkin5gm.stas.delivery;

import org.springframework.stereotype.Component;

@Component
public class StasFactory {
    static final StasDelivery[] LIST_STAS_DELIVERY = {
            new StasDelivery(0),
            new StasDelivery(1),
            new StasDelivery(2)
    };

    public StasDelivery getBy(int stasIndex) {
        return LIST_STAS_DELIVERY[stasIndex];
    }

    public String[] getCurrentPorts() {
        return new String[]{
                getBy(0).getSystemPortName(),
                getBy(1).getSystemPortName(),
                getBy(2).getSystemPortName(),
        };
    }
}
