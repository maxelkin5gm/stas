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
        var stoEntity = stoDao.findBySto(nameSto).orElse(null);
        if (stoEntity == null) {
            var id = stoDao.insert(nameSto);
            stoEntity = new StoEntity(id, nameSto);
        }

        var detailEntity = detailDao.findByDetail(nameDetail, operationNumber).orElse(null);
        if (detailEntity == null) {
            var id = detailDao.insert(nameDetail, operationNumber);
            detailEntity = new DetailEntity(id, nameDetail, operationNumber);
        }

        var stoDetail = stoDetailDao.countById(stoEntity.getId(), detailEntity.getId());
        if (stoDetail == 0) {
            stoDetailDao.insertById(stoEntity.getId(), detailEntity.getId());
        } else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такая связь уже существует");
    }

    @Transactional
    public void deleteRelationshipByStoAndDetail(String nameSto, String nameDetail, String operationNumber) {
        var stoEntity = stoDao.findBySto(nameSto).orElse(null);
        if (stoEntity == null) {
            var id = stoDao.insert(nameSto);
            stoEntity = new StoEntity(id, nameSto);
        }

        var detailEntity = detailDao.findByDetail(nameDetail, operationNumber).orElse(null);
        if (detailEntity == null) {
            var id = detailDao.insert(nameDetail, operationNumber);
            detailEntity = new DetailEntity(id, nameDetail, operationNumber);
        }

        var stoDetail = stoDetailDao.countById(stoEntity.getId(), detailEntity.getId());
        if (stoDetail != 0) {
            stoDetailDao.deleteById(stoEntity.getId(), detailEntity.getId());
        } else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такой связи не существует");
    }

    @Transactional
    public void deleteSto(String nameSto) {
        stoDao.findBySto(nameSto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такого СТО не найдено"));

        if (stoCellDao.countBySto(nameSto) > 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "СТО нельзя удалить, пока оно находится в ячейке. Удалите сначала из ячейки.");

        stoDao.deleteBySto(nameSto);
    }


}
