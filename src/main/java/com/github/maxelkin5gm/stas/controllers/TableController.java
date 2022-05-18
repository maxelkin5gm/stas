package com.github.maxelkin5gm.stas.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

import com.github.maxelkin5gm.stas.dao.TableDao;

@RestController
@RequestMapping("/api/table")
@AllArgsConstructor
public class TableController {
    TableDao tableDao;

    // Worker START //
    @GetMapping("/findAllByWorkerAndStas")
    public List<Map<String, Object>> findAllByWorkerAndStas(@RequestParam String personnelNumber,
                                                            @RequestParam int stasIndex) {
        return tableDao.findAllByWorkerAndStas(personnelNumber, stasIndex);
    }

    @GetMapping("/findAllByWorker")
    public List<Map<String, Object>> findAllByWorker(@RequestParam String personnelNumber) {
        return tableDao.findAllByWorker(personnelNumber);
    }
    // Worker END //

    // Detail START //
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
    // Detail END //

    // Sto START //
    @GetMapping("/findAllByStoAndStas")
    public List<Map<String, Object>> findAllByStoAndStas(@RequestParam String nameSto,
                                                         @RequestParam int stasIndex) {
        return tableDao.findAllByStoAndStas(nameSto, stasIndex);
    }

    @GetMapping("/findAllBySto")
    public List<Map<String, Object>> findAllBySto(@RequestParam String nameSto) {
        return tableDao.findAllBySto(nameSto);
    }
    // Sto END //

    // Cell START //
    @GetMapping("/findAllByCellAndStas")
    public List<Map<String, Object>> findAllByCellAndStas(@RequestParam String side,
                                                          @RequestParam int cellNumber,
                                                          @RequestParam int stasIndex) {
        return tableDao.findAllByCellAndStas(side, cellNumber, stasIndex);
    }
    // Cell END //

}