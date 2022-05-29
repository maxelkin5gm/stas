package com.github.maxelkin5gm.stas.controllers;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@AllArgsConstructor
public class TestController {

    @GetMapping("/test")
    public String test() throws IOException, InterruptedException {
        return "test";
    }


}
