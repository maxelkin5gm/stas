package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.WorkerDao;
import com.github.maxelkin5gm.stas.models.WorkerEntity;

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

    @GetMapping("/findAllBy")
    public List<WorkerEntity> findAllBy(@RequestParam String nameWorker) {
        return workerDao.findAllBy(nameWorker);
    }

    @GetMapping("/findBy")
    public WorkerEntity findBy(@RequestParam String personnelNumber) {
        return workerDao.findBy(personnelNumber).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
