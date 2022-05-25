package com.github.maxelkin5gm.stas.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import com.github.maxelkin5gm.stas.dao.TableDao;

@RestController
@RequestMapping("/api/table/")
@AllArgsConstructor
public class TableController {
    TableDao tableDao;

    // Worker panel START //
    @GetMapping("/findAllByWorkerAndStas")
    public List<Map<String, Object>> findAllByWorkerAndStas(@RequestParam String personnelNumber,
                                                            @RequestParam int stasIndex) {
        return tableDao.findAllByWorkerAndStas(personnelNumber, stasIndex);
    }

    @GetMapping("/findAllByWorker")
    public List<Map<String, Object>> findAllByWorker(@RequestParam String personnelNumber) {
        return tableDao.findAllByWorker(personnelNumber);
    }
    // Worker panel END //


    // Detail panel START //
    @GetMapping("/findAllByDetailAndStas")
    public List<Map<String, Object>> findAllByDetailAndStas(@RequestParam String nameDetail,
                                                            @RequestParam String operationNumber,
                                                            @RequestParam int stasIndex) {
        return tableDao.findAllByDetailAndStas(nameDetail, operationNumber, stasIndex);
    }

    @GetMapping("/findAllByDetail")
    public List<Map<String, Object>> findAllByDetail(@RequestParam String nameDetail,
                                                     @RequestParam String operationNumber) {
        return tableDao.findAllByDetail(nameDetail, operationNumber);
    }
    // Detail panel END //


    // Sto panel START //
    @GetMapping("/findAllByStoAndStas")
    public List<Map<String, Object>> findAllByStoAndStas(@RequestParam String nameSto,
                                                         @RequestParam int stasIndex) {
        return tableDao.findAllCellByStoAndStas(nameSto, stasIndex);
    }

    @GetMapping("/findAllBySto")
    public List<Map<String, Object>> findAllBySto(@RequestParam String nameSto) {
        return tableDao.findAllCellBySto(nameSto);
    }

    @GetMapping("/findAllReceivedBySto")
    public List<Map<String, Object>> findAllReceivedBySto(@RequestParam String nameSto) {
        return tableDao.findAllReceivedBySto(nameSto);
    }

    @GetMapping("/findAllByStoAndRemainder")
    public List<Map<String, Object>> findAllByStoAndRemainder(@RequestParam String nameSto, @RequestParam int remainder) {
        return tableDao.findAllByStoAndRemainder(nameSto, remainder);
    }
    // Sto panel END //


    // Cell panel START //
    @GetMapping("/findAllByCellAndStas")
    public List<Map<String, Object>> findAllByCellAndStas(@RequestParam String side,
                                                          @RequestParam int cellNumber,
                                                          @RequestParam int stasIndex) {
        return tableDao.findAllByCellAndStas(side, cellNumber, stasIndex);
    }
    // Cell panel END //

}
