package com.github.maxelkin5gm.stas.controllers.entities;

import com.github.maxelkin5gm.stas.dao.WorkerDao;
import com.github.maxelkin5gm.stas.models.WorkerEntity;

import com.github.maxelkin5gm.stas.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.sqlite.SQLiteException;

import java.sql.SQLException;
import java.util.List;

@RestController
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

    @PostMapping("/create")
    @Transactional
    public void create(@RequestParam String nameWorker, @RequestParam String personnelNumber) {
        if (workerDao.findBy(personnelNumber).isPresent()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Сотрудник с таким табельным номером уже существует");
        workerDao.insert(nameWorker, personnelNumber);
    }

    @PostMapping("/delete")
    @Transactional
    public void delete(@RequestParam String personnelNumber) {
        workerDao.findBy(personnelNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Сотрудник не существует"));
        workerDao.deleteBy(personnelNumber);
    }

    @PostMapping("/update")
    @Transactional
    public void update(@RequestParam String personnelNumber,
                       @RequestParam String newNameWorker,
                       @RequestParam String newPersonnelNumber) {
        workerDao.findBy(personnelNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Сотрудник не существует"));
        if (workerDao.findBy(newPersonnelNumber).isPresent() && !personnelNumber.equals(newPersonnelNumber))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такой табельный номер уже существует");
        workerDao.updateBy(personnelNumber, newNameWorker, newPersonnelNumber);
    }
}
