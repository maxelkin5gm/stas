package com.github.maxelkin5gm.stas.controllers.panels;

import com.github.maxelkin5gm.stas.dao.WorkerDao;
import com.github.maxelkin5gm.stas.models.Worker;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController()
@RequestMapping("/api/workerPanel")
@AllArgsConstructor
public class WorkerPanelController {
    WorkerDao workerDao;

    @GetMapping("/findAllByName")
    public List<Worker> findAllByName(@RequestParam String nameWorker) {
        return workerDao.findAllByName(nameWorker);
    }

    @GetMapping("/findByPersonnelNumber")
    public Worker findByPersonnelNumber(@RequestParam String personnelNumber) {
        return workerDao.findByPersonnelNumber(personnelNumber).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
