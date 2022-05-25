package com.github.maxelkin5gm.stas.controllers.entities;

import com.github.maxelkin5gm.stas.dao.CellDao;
import com.github.maxelkin5gm.stas.entities.CellEntity;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/cell/")
@AllArgsConstructor
public class CellController {
    CellDao cellDao;

    @GetMapping("/findOrCreate")
    public CellEntity findOrCreate(@RequestParam int stasIndex,
                                   @RequestParam String side,
                                   @RequestParam int cellNumber) {
        if (cellNumber < 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Номер ячейки не должен быть меньше 0");
        var cellEntity = cellDao.findBy(stasIndex, side, cellNumber).orElse(null);
        if (cellEntity == null) {
            var status = "УСТАНОВЛЕНА";
            var id = cellDao.insert(stasIndex, side, cellNumber, status);
            cellEntity = new CellEntity(id, stasIndex, side, cellNumber, status, "");
        }
        return cellEntity;
    }

    @PostMapping("/updateNoteBy")
    public void updateNoteBy(@RequestParam int stasIndex,
                             @RequestParam String side,
                             @RequestParam int cellNumber,
                             @RequestParam String note) {
        cellDao.updateNoteBy(stasIndex, side, cellNumber, note);
    }
}
