package com.github.maxelkin5gm.stas.controllers.panels;

import com.github.maxelkin5gm.stas.dao.WorkerDao;
import com.github.maxelkin5gm.stas.dao.panels.WorkerPanelDao;
import com.github.maxelkin5gm.stas.dto.workerPanel.QueryFindAllReceivedByWorker;
import com.github.maxelkin5gm.stas.dto.workerPanel.QueryFindAllReceivedByWorkerAndStas;
import com.github.maxelkin5gm.stas.models.Worker;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/api/workerPanel")
@AllArgsConstructor
public class WorkerPanelController {
    WorkerDao workerDao;
    WorkerPanelDao workerPanelDao;

    @PostMapping("/findAllByName")
    public List<Worker> findAllByName(@RequestBody String nameWorker) {
        return workerDao.findAllByName(nameWorker);
    }

    @PostMapping("/findByPersonnelNumber")
    public Worker findByPersonnelNumber(@RequestBody String personnelNumber) {
        return workerDao.findByPersonnelNumber(personnelNumber).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/findAllReceivedByWorkerAndStas")
    public List<Map<String, Object>> findAllReceivedByWorkerAndStas(
            @RequestBody QueryFindAllReceivedByWorkerAndStas query) {
        return workerPanelDao.findAllReceivedByWorkerAndStas(query.getPersonnelNumber(), query.getStasIndex());
    }

    @PostMapping("/findAllReceivedByWorker")
    public List<Map<String, Object>> findAllReceivedByWorker(
            @RequestBody QueryFindAllReceivedByWorker query) {
        return workerPanelDao.findAllReceivedByWorker(query.getPersonnelNumber());
    }
}
