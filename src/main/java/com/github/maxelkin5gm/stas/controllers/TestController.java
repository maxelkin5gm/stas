package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.models.Worker;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;

import com.github.maxelkin5gm.stas.ui.Gui;
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
