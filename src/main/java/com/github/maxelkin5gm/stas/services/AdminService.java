package com.github.maxelkin5gm.stas.services;

import com.github.maxelkin5gm.stas.dao.*;
import com.github.maxelkin5gm.stas.models.CellEntity;
import com.github.maxelkin5gm.stas.models.DetailEntity;
import com.github.maxelkin5gm.stas.models.StoEntity;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class AdminService {
    StoDao stoDao;
    DetailDao detailDao;
    StoDetailDao stoDetailDao;
    CellDao cellDao;
    StoCellDao stoCellDao;

    @Transactional
    public void addStoAndDetail(String nameSto, String nameDetail, String operationNumber) {
        var stoEntity = stoDao.findBy(nameSto).orElse(null);
        if (stoEntity == null) {
            var id = stoDao.insert(nameSto);
            stoEntity = new StoEntity(id, nameSto);
        }

        var detailEntity = detailDao.findBy(nameDetail, operationNumber).orElse(null);
        if (detailEntity == null) {
            var id = detailDao.insert(nameDetail, operationNumber);
            detailEntity = new DetailEntity(id, nameDetail, operationNumber);
        }

        var stoDetail = stoDetailDao.countBy(stoEntity.getId(), detailEntity.getId());
        if (stoDetail == 0) {
            stoDetailDao.insert(stoEntity.getId(), detailEntity.getId());
        } else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такая связь уже существует");
    }

    @Transactional
    public void deleteRelationshipStoAndDetail(String nameSto, String nameDetail, String operationNumber) {
        var stoEntity = stoDao.findBy(nameSto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО не существует"));

        var detailEntity = detailDao.findBy(nameDetail, operationNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Такой детели и номера операции не существует"));

        var stoDetail = stoDetailDao.countBy(stoEntity.getId(), detailEntity.getId());
        if (stoDetail != 0) {
            stoDetailDao.deleteBy(stoEntity.getId(), detailEntity.getId());
        } else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такой связи не существует");
    }

    @Transactional
    public void changeCellAndRemainder(int stasIndex, String side, int cellNumber, String nameSto, int remainder,
                                       String status, String note) {
        var stoEntity = stoDao.findBy(nameSto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО не существует"));
        var cellEntity = cellDao.findBy(stasIndex, side, cellNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такой ячейки не существует"));
        stoCellDao.findBy(stoEntity.getId(), cellEntity.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО в ячейке не найдено"));

        if (remainder < 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Остаток не может быть меньше 0");
        stoCellDao.update(remainder, stoEntity.getId(), cellEntity.getId());

        cellDao.updateStatusAndNoteBy(status, note, cellEntity.getId());
    }

    @Transactional
    public void deleteStoFromCell(int stasIndex, String side, int cellNumber, String nameSto) {
        var stoEntity = stoDao.findBy(nameSto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО не существует"));
        var cellEntity = cellDao.findBy(stasIndex, side, cellNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такой ячейки не существует"));
        stoCellDao.findBy(stoEntity.getId(), cellEntity.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО в ячейке не найдено"));

        stoCellDao.deleteBy(stoEntity.getId(), cellEntity.getId());
    }

    @Transactional
    public void addStoInCell(int stasIndex, String side, int cellNumber, String nameSto, int remainder) {
        var stoEntity = stoDao.findBy(nameSto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО не существует"));

        var cellEntity = cellDao.findBy(stasIndex, side, cellNumber).orElse(null);
        if (cellEntity == null) {
            var status = "УСТАНОВЛЕНА";
            var id = cellDao.insert(stasIndex,side, cellNumber, status);
            cellEntity = new CellEntity(id, stasIndex, side, cellNumber, status, "");
        }

        if (stoCellDao.findBy(stoEntity.getId(), cellEntity.getId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такое СТО уже есть в ячейке");
        }

        stoCellDao.insert(stoEntity.getId(), cellEntity.getId(), remainder);
    }
}
