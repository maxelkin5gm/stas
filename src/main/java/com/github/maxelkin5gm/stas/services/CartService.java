package com.github.maxelkin5gm.stas.services;

import com.github.maxelkin5gm.stas.dao.*;
import com.github.maxelkin5gm.stas.dto.CartGiveQuery;
import com.github.maxelkin5gm.stas.models.ReceivedStoEntity;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartService {
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
            var stoEntity = stoDao.findBySto(cartItem.getNameSto()).orElseThrow();
            var remainder = stoCellDao.findRemainderByStoIdAndCellId(stoEntity.getId(), cellEntity.getId());

            var newRemainder = remainder - cartItem.getAmount();
            if (newRemainder < 0) {
                throw new RuntimeException("Запрошенное количество СТО больше остатка в ячейке");
            }
            stoCellDao.update(newRemainder, stoEntity.getId(), cellEntity.getId());


            Optional<ReceivedStoEntity> receivedStoEntity = receivedStoDao.find(cartItem.getNameSto(),
                    cartItem.getNameDetail(), cartItem.getOperationNumber(), personnelNumber);
            if (receivedStoEntity.isPresent()) {
                var newAmount = receivedStoEntity.get().getAmount() + cartItem.getAmount();
                receivedStoDao.updateReceivedById(receivedStoEntity.get().getId(), newAmount);
            } else {
                receivedStoDao.insert(new ReceivedStoEntity(null, cartItem.getAmount(), 228,
                        cellEntity.getId(), workerEntity.getId(), cartItem.getNameSto(), cartItem.getNameDetail(),
                        cartItem.getOperationNumber()));
            }
        });
    }

    @Transactional
    public void take(String nameSto, int amount, String nameDetail, String operationNumber, int stasIndex, String side,
                     int cellNumber, String personnelNumber) {
        if (amount < 1) throw new RuntimeException("Количество не должно быть меньше < 1");

        var stoEntity = stoDao.findBySto(nameSto).orElseThrow();
        var cellEntity = cellDao.findByCell(stasIndex, side, cellNumber).orElseThrow();
        var remainder = stoCellDao.findRemainderByStoIdAndCellId(stoEntity.getId(), cellEntity.getId());

        var newRemainder = remainder + amount;
        stoCellDao.update(newRemainder, stoEntity.getId(), cellEntity.getId());

        var receivedStoEntity = receivedStoDao.find(nameSto, nameDetail, operationNumber,
                personnelNumber).orElseThrow();

        var newAmount = receivedStoEntity.getAmount() - amount;
        if (newAmount < 0) throw new RuntimeException("Выданные СТО не могут быть меньше нуля");
        if (newAmount == 0)
            receivedStoDao.deleteById(receivedStoEntity.getId());
        else
            receivedStoDao.updateReceivedById(receivedStoEntity.getId(), newAmount);
    }

    public List<Map<String, Object>> findAllMatchStoByCellAndReceivedSto(int stasIndex, String side, int cellNumber,
                                                                         String personnelNumber) {
        String sql = """
                SELECT receivedNameSto, amount, receivedNameDetail, receivedOperationNumber, operationDate, CELL.side,
                    CELL.cellNumber, CELL.stasIndex
                FROM CELL,
                     WORKER,
                     RECEIVED_STO,
                     (SELECT nameSto FROM STO, CELL, STO_CELL
                      WHERE STO_CELL.sto_id = STO.id
                        AND STO_CELL.cell_id = CELL.id
                        AND stasIndex = ?
                        AND side = ?
                        AND cellNumber = ?) stoByCell
                WHERE RECEIVED_STO.cell_id = CELL.id
                  AND RECEIVED_STO.worker_id = WORKER.id
                  AND stoByCell.nameSto = receivedNameSto
                  AND personnelNumber = ?;""";
        return jdbcTemplate.queryForList(sql, stasIndex, side, cellNumber, personnelNumber);
    }
}
