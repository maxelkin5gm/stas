package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.CellDao;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cell/")
@AllArgsConstructor
public class CellController {

    CellDao cellDao;

    @PostMapping("/updateNoteByCell")
    public void updateNoteByCellId(@RequestParam int stasIndex,
                                   @RequestParam String side,
                                   @RequestParam int cellNumber,
                                   @RequestParam String note) {
        cellDao.updateNoteByCell(stasIndex, side, cellNumber, note);
    }
}
