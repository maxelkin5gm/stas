package com.github.maxelkin5gm.stas.controllers;


import com.github.maxelkin5gm.stas.ui.Gui;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class TestController {

    JdbcTemplate jdbcTemplate;
    Gui gui;

    @GetMapping("/api")
    public List<String> test() {
        gui.openBrowser("https://vk.com");
        return jdbcTemplate.queryForList("SELECT name FROM STO", String.class);
    }
}
