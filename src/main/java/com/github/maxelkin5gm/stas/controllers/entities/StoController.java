package com.github.maxelkin5gm.stas.controllers.entities;

import com.github.maxelkin5gm.stas.dao.StoCellDao;
import com.github.maxelkin5gm.stas.dao.StoDao;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/sto/")
@AllArgsConstructor
public class StoController {
    StoCellDao stoCellDao;
    StoDao stoDao;

    @PostMapping("/delete")
    @Transactional
    public void delete(@RequestParam String nameSto) {
        stoDao.findBy(nameSto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО не найдено"));
        if (stoCellDao.countBy(nameSto) > 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "СТО нельзя удалить, пока оно находится в ячейке. Удалите сначала из ячейки.");
        stoDao.deleteBy(nameSto);
    }


}
