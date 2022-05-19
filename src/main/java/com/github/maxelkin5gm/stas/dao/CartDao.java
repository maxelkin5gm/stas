package com.github.maxelkin5gm.stas.dao;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import com.github.maxelkin5gm.stas.dto.CartGiveQuery;
import com.github.maxelkin5gm.stas.models.ReceivedStoEntity;

@Repository
@AllArgsConstructor
public class CartDao {
    JdbcTemplate jdbcTemplate;
    CellDao cellDao;
    StoDao stoDao;
    StoCellDao stoCellDao;
    WorkerDao workerDao;
    ReceivedStoDao receivedStoDao;

    @Transactional
    public void give(int stasIndex, String side, int cellNumber, String personnelNumber, List<CartGiveQuery> cart) {
        var cellEntity = cellDao.findByCell(stasIndex, side, cellNumber).orElseThrow();
        cart.forEach(cartItem -> {
            var workerEntity = workerDao.findByPersonnelNumber(personnelNumber).orElseThrow();
            var stoEntity = stoDao.findByName(cartItem.getNameSto()).orElseThrow();
            var remainder = stoCellDao.findRemainderByStoIdAndCellId(stoEntity.getId(), cellEntity.getId());

            var newRemainder = remainder - cartItem.getAmount();
            if (newRemainder < 0) {
                throw new RuntimeException("Запрошенное количество СТО больше остатка в ячейке");
            }

            stoCellDao.update(newRemainder, stoEntity.getId(), cellEntity.getId());

            var receivedStoEntity = new ReceivedStoEntity(cartItem.getAmount(), 228, cellEntity.getId(), workerEntity.getId(),
                    cartItem.getNameSto(), cartItem.getNameDetail(), cartItem.getOperationNumber());
            receivedStoDao.insert(receivedStoEntity);


        });
    }

}
