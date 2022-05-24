package com.github.maxelkin5gm.stas.controllers.entities;

import com.github.maxelkin5gm.stas.dao.CellDao;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cell/")
@AllArgsConstructor
public class CellController {
    CellDao cellDao;

    @PostMapping("/updateNoteBy")
    public void updateNoteBy(@RequestParam int stasIndex,
                             @RequestParam String side,
                             @RequestParam int cellNumber,
                             @RequestParam String note) {
        cellDao.updateNoteBy(stasIndex, side, cellNumber, note);
    }
}
