package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.delivery.StasDelivery;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class TestController {

    @GetMapping("/test")
    public String test() {
        var stas = StasDelivery.getStasBy(0);
        System.out.println(stas.getState());

        stas.forward();

        return "test";
    }

    @GetMapping("/test2")
    public String test2() {
        var stas = StasDelivery.getStasBy(0);
        System.out.println(stas.getState());

        stas.back();

        return "test2";
    }

}
