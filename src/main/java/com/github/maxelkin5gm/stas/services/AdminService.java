package com.github.maxelkin5gm.stas.services;

import com.github.maxelkin5gm.stas.dao.DetailDao;
import com.github.maxelkin5gm.stas.dao.StoCellDao;
import com.github.maxelkin5gm.stas.dao.StoDao;
import com.github.maxelkin5gm.stas.dao.StoDetailDao;
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
    public void deleteRelationshipByStoAndDetail(String nameSto, String nameDetail, String operationNumber) {
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
        if (stoDetail != 0) {
            stoDetailDao.deleteBy(stoEntity.getId(), detailEntity.getId());
        } else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такой связи не существует");
    }

    @Transactional
    public void deleteSto(String nameSto) {
        stoDao.findBy(nameSto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО не найдено"));

        if (stoCellDao.countBy(nameSto) > 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "СТО нельзя удалить, пока оно находится в ячейке. Удалите сначала из ячейки.");

        stoDao.deleteBy(nameSto);
    }

    @Transactional
    public void updateReceivedSto(String receivedNameSto, String receivedNameDetail,
                                  String receivedOperationNumber, String personnelNumber) {

    }


}
