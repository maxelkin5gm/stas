package com.github.maxelkin5gm.stas.services;

import com.github.maxelkin5gm.stas.dao.*;
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
}
