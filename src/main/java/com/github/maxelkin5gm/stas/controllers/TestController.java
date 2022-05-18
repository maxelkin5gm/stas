package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.panels.DetailPanelDao;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;


@RestController
@AllArgsConstructor
public class TestController {
    DetailPanelDao detailPanelDao;

    @GetMapping("/test")
    public String test() {
        return "test";
    }

}
