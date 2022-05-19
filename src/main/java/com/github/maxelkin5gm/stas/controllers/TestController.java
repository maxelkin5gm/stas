package com.github.maxelkin5gm.stas.controllers;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
public class TestController {

    JdbcTemplate jdbcTemplate;

    @GetMapping("/test")
    public String test() {
        return "test";

    }

}
