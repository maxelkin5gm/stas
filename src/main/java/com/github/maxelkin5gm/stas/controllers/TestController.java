package com.github.maxelkin5gm.stas.controllers;


import com.github.maxelkin5gm.stas.delivery.StasDelivery;
import com.github.maxelkin5gm.stas.entities.enums.StatusCellEnum;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@AllArgsConstructor
public class TestController {

    @GetMapping("/test")
    public StasDelivery test() throws IOException, InterruptedException {
        return StasDelivery.getBy(0);
    }


}
