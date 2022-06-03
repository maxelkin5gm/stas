package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.CellDao;
import com.github.maxelkin5gm.stas.delivery.Serial;
import com.github.maxelkin5gm.stas.delivery.StasDelivery;
import com.github.maxelkin5gm.stas.delivery.StasFactory;
import com.github.maxelkin5gm.stas.delivery.TestDelivery;
import com.github.maxelkin5gm.stas.entities.enums.StatusCellEnum;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.ServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/delivery/")
@AllArgsConstructor
public class DeliveryController {

    CellDao cellDao;
    StasFactory stasFactory;

    @GetMapping("/getState")
    public TestDelivery getState(@RequestParam int stasIndex) {
        return stasFactory.getBy(stasIndex);
    }

    @GetMapping("/getAllPorts")
    public List<String> getAllPorts() {
        return Serial.getAvailablePorts();
    }

    @GetMapping("/getCurrentPorts")
    public String[] getCurrentPorts() {
        return stasFactory.getCurrentPorts();
    }

    @PostMapping("/setPort")
    public void setPort(@RequestParam int stasIndex,
                        @RequestParam String portName) {
        stasFactory.getBy(stasIndex).setSerial(portName);
    }

    @PostMapping("/resetError")
    public void resetError(@RequestParam int stasIndex) {
        stasFactory.getBy(stasIndex).setError(null);
    }

    @PostMapping("/bringCell")
    public void bringCell(@RequestParam int stasIndex,
                          @RequestParam String side,
                          @RequestParam int cellNumber,
                          ServletResponse response) throws IOException {
        var stasDelivery = stasFactory.getBy(stasIndex);
        if (!stasDelivery.takeStasForBring()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "В данный момент СТАС " + (stasIndex + 1) + " занят");
        }
        stasDelivery.bringCell(side, cellNumber, response);
    }

    @PostMapping("/bringBackCell")
    public void bringBackCell(@RequestParam int stasIndex, ServletResponse response) throws IOException {
        var stasDelivery = stasFactory.getBy(stasIndex);
        if (!stasDelivery.takeStasForBringBack()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "В данный момент СТАС " + (stasIndex + 1) + " занят");
        }
        stasDelivery.bringBackCell(response);
    }

    @PostMapping("/removeCell")
    public void removeCell(@RequestParam int stasIndex,
                           @RequestParam String side,
                           @RequestParam int cellNumber) {
        var cellEntity = cellDao.findBy(stasIndex + 1, side, cellNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такая ячейка не найдена"));
        stasFactory.getBy(stasIndex).removeCell();
        cellDao.updateStatusAndNoteBy(StatusCellEnum.REMOVED.toString(), cellEntity.getNote(), cellEntity.getId());
    }

    @PostMapping("/returnCell")
    public void returnCell(@RequestParam int stasIndex,
                           @RequestParam String side,
                           @RequestParam int cellNumber) {
        var cellEntity = cellDao.findBy(stasIndex + 1, side, cellNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такая ячейка не найдена"));
        stasFactory.getBy(stasIndex).returnCell(side, cellNumber);
        cellDao.updateStatusAndNoteBy(StatusCellEnum.INSTALLED.toString(), cellEntity.getNote(), cellEntity.getId());
    }
}
