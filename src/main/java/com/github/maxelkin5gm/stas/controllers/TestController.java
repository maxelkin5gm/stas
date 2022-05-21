package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.StoDao;
import com.github.maxelkin5gm.stas.dao.StoDetailDao;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
public class TestController {

    JdbcTemplate jdbcTemplate;
    StoDao stoDao;
    StoDetailDao stoDetailDao;

    @GetMapping("/test")
    public String test() {

//        stoDetailDao.insertById(10,1);

        return "test";
    }

}
