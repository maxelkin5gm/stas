package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.CellDao;
import com.github.maxelkin5gm.stas.delivery.StasDelivery;
import com.github.maxelkin5gm.stas.entities.enums.StatusCellEnum;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.ServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/delivery/")
@AllArgsConstructor
public class DeliveryController {

    CellDao cellDao;

    @GetMapping("/getState")
    public StasDelivery getState(@RequestParam int stasIndex) {
        return StasDelivery.getBy(stasIndex);
    }

    @PostMapping("/bringCell")
    public void bringCell(@RequestParam int stasIndex,
                          @RequestParam String side,
                          @RequestParam int cellNumber,
                          ServletResponse response) throws IOException {
        var stas = StasDelivery.getBy(stasIndex);
        if (stas.isBusy()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "В данный момент СТАС занят");
        response.getWriter().close();
        stas.bringCell(side, cellNumber);
    }

    @PostMapping("/bringBackCell")
    public void bringBackCell(@RequestParam int stasIndex, ServletResponse response) throws IOException {
        response.getWriter().close();
        StasDelivery.getBy(stasIndex).bringBackCell();
    }

    @PostMapping("/removeCell")
    public void removeCell(@RequestParam int stasIndex,
                           @RequestParam String side,
                           @RequestParam int cellNumber) {
        var cellEntity = cellDao.findBy(stasIndex + 1, side, cellNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такая ячейка не найдена"));
        StasDelivery.getBy(stasIndex).removeCell();
        cellDao.updateStatusAndNoteBy(StatusCellEnum.REMOVED.toString(), cellEntity.getNote(), cellEntity.getId());
    }

    @PostMapping("/returnCell")
    public void returnCell(@RequestParam int stasIndex,
                           @RequestParam String side,
                           @RequestParam int cellNumber) {
        var cellEntity = cellDao.findBy(stasIndex + 1, side, cellNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такая ячейка не найдена"));
        var stas = StasDelivery.getBy(stasIndex);
        if (stas.isBusy()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "В данный момент СТАС занят");
        stas.returnCell(side, cellNumber);
        cellDao.updateStatusAndNoteBy(StatusCellEnum.INSTALLED.toString(), cellEntity.getNote(), cellEntity.getId());
    }
}
