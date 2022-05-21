package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.CellDao;

import com.github.maxelkin5gm.stas.models.CellEntity;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cell/")
@AllArgsConstructor
public class CellController {
    CellDao cellDao;

    @GetMapping("/findByCell")
    public CellEntity findByCell(@RequestParam int stasIndex,
                                 @RequestParam String side,
                                 @RequestParam int cellNumber) {
        return cellDao.findByCell(stasIndex, side, cellNumber).orElseThrow();
    }

    @PostMapping("/updateNoteByCell")
    public void updateNoteByCellId(@RequestParam int stasIndex,
                                   @RequestParam String side,
                                   @RequestParam int cellNumber,
                                   @RequestParam String note) {
        cellDao.updateNoteByCell(stasIndex, side, cellNumber, note);
    }
}
