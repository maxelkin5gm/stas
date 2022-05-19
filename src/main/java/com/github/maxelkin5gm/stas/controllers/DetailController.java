package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.DetailDao;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/detail/")
@AllArgsConstructor
public class DetailController {

    DetailDao detailDao;

    @GetMapping("/findAllBySto")
    public List<Map<String, Object>> findAllBySto(@RequestParam String nameSto) {
        return detailDao.findAllBySto(nameSto);
    }
}
