package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.WorkerDao;
import com.github.maxelkin5gm.stas.models.Worker;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController()
@RequestMapping("/api/worker")
@AllArgsConstructor
public class WorkerController {
    WorkerDao workerDao;

    @PostMapping("/findByName")
    public List<Worker> findByName(@RequestBody String name) {
        return workerDao.findAllByName(name);
    }

    @PostMapping("/findByPersonnelNumber")
    public Worker findByPersonnelNumber(@RequestBody String personnelNumber) {
        return workerDao.findAllByPersonnelNumber(personnelNumber).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
