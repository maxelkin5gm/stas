package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.DetailDao;
import com.github.maxelkin5gm.stas.dao.StoDao;
import com.github.maxelkin5gm.stas.dao.WorkerDao;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/autocomplete/")
@AllArgsConstructor
public class AutocompleteController {

    StoDao stoDao;
    DetailDao detailDao;
    WorkerDao workerDao;

    @GetMapping("/nameSto")
    public List<String> sto(@RequestParam String part) {
        return stoDao.findByLike(part);
    }

    @GetMapping("/nameDetail")
    public List<String> nameDetail(@RequestParam String part) {
        return detailDao.findAllByNameDetailLike(part);
    }

    @GetMapping("/operationNumber")
    public List<String> operationNumber(@RequestParam String part) {
        return detailDao.findAllByOperationNumberLike(part);
    }

    @GetMapping("/nameWorker")
    public List<String> nameWorker(@RequestParam String part) {
        return workerDao.findAllByNameWorkerLike(part);
    }

    @GetMapping("/personnelNumber")
    public List<String> personnelNumber(@RequestParam String part) {
        return workerDao.findAllByPersonnelNumberLike(part);
    }
}
