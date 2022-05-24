package com.github.maxelkin5gm.stas.controllers.entities;

import com.github.maxelkin5gm.stas.dao.DetailDao;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/detail/")
@AllArgsConstructor
public class DetailController {
    DetailDao detailDao;

    @GetMapping("/findAllBy")
    public List<Map<String, Object>> findAllBySto(@RequestParam String nameSto) {
        return detailDao.findAllBy(nameSto);
    }

    @PostMapping("/deleteBy")
    public void deleteBy(@RequestParam String nameDetail,
                         @RequestParam String operationNumber) {
        detailDao.deleteBy(nameDetail, operationNumber);
    }
}
