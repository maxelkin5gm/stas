package com.github.maxelkin5gm.stas.delivery;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StasFactory {
    @Value("${STAS1_PORT}")
    private String stas1PortNane;
    @Value("${STAS2_PORT}")
    private String stas2PortNane;
    @Value("${STAS3_PORT}")
    private String stas3PortNane;
    private StasDelivery[] LIST_STAS_DELIVERY;

    @PostConstruct
    public void init() {
        LIST_STAS_DELIVERY = new StasDelivery[]{
                new StasDelivery(0, stas1PortNane),
                new StasDelivery(1, stas2PortNane),
                new StasDelivery(2, stas3PortNane)
        };
    }

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
