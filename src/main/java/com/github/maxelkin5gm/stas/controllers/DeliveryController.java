package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.CellDao;
import com.github.maxelkin5gm.stas.delivery.StasDelivery;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/bringCell")
    public void bringCell(@RequestParam int stasIndex,
                          @RequestParam String side,
                          @RequestParam int cellNumber,
                          ServletResponse response) throws IOException {
        response.getWriter().close();
        StasDelivery.getBy(stasIndex).bringCell(side, cellNumber);
    }

    @GetMapping("/bringBackCell")
    public void bringBackCell(@RequestParam int stasIndex, ServletResponse response) throws IOException {
        response.getWriter().close();
        StasDelivery.getBy(stasIndex).bringBackCell();
    }

//    @GetMapping("/removeCell")
//    public void removeCell(@RequestParam int stasIndex,
//                           @RequestParam String side,
//                           @RequestParam int cellNumber) {
//        var cellEntity = cellDao.findBy(stasIndex, side, cellNumber)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такая ячейка не найдена"));
//        var stas = StasDelivery.getBy(stasIndex);
//        if (stas.getCellNumber() != cellNumber || !stas.getSide().equals(side) || !stas.getState().equals("WAIT"))
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ячейка не привезена");
//        cellDao.updateStatusAndNoteBy("СНЯТА", cellEntity.getNote(), cellEntity.getId());
//    }
}
