package com.github.maxelkin5gm.stas.services;

import com.github.maxelkin5gm.stas.dao.*;
import com.github.maxelkin5gm.stas.dto.CartGiveQuery;
import com.github.maxelkin5gm.stas.models.ReceivedStoEntity;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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
        var cellEntity = cellDao.findBy(stasIndex, side, cellNumber).orElseThrow();
        cart.forEach(cartItem -> {
            var workerEntity = workerDao.findBy(personnelNumber).orElseThrow();
            var stoEntity = stoDao.findBy(cartItem.getNameSto()).orElseThrow();
            var remainder = stoCellDao.findRemainderBy(stoEntity.getId(), cellEntity.getId());

            var newRemainder = remainder - cartItem.getAmount();
            if (newRemainder < 0) {
                throw new RuntimeException("Запрошенное количество СТО больше остатка в ячейке");
            }
            stoCellDao.update(newRemainder, stoEntity.getId(), cellEntity.getId());


            var receivedStoEntity = receivedStoDao.findBy(cartItem.getNameSto(),
                    cartItem.getNameDetail(), cartItem.getOperationNumber(), personnelNumber);
            if (receivedStoEntity.isPresent()) {
                var newAmount = receivedStoEntity.get().getAmount() + cartItem.getAmount();
                receivedStoDao.updateAmountBy(receivedStoEntity.get().getId(), newAmount);
            } else {
                var dateStr = new SimpleDateFormat("dd.MM.yyyy").format(new Date());
                receivedStoDao.insert(new ReceivedStoEntity(null, cartItem.getAmount(), dateStr,
                        cellEntity.getId(), workerEntity.getId(), cartItem.getNameSto(), cartItem.getNameDetail(),
                        cartItem.getOperationNumber()));
            }
        });
    }

    @Transactional
    public void take(String nameSto, int amount, String nameDetail, String operationNumber, int stasIndex, String side,
                     int cellNumber, String personnelNumber) {
        if (amount < 1) throw new RuntimeException("Количество не должно быть меньше < 1");

        var stoEntity = stoDao.findBy(nameSto).orElseThrow();
        var cellEntity = cellDao.findBy(stasIndex, side, cellNumber).orElseThrow();
        var remainder = stoCellDao.findRemainderBy(stoEntity.getId(), cellEntity.getId());

        var newRemainder = remainder + amount;
        stoCellDao.update(newRemainder, stoEntity.getId(), cellEntity.getId());

        var receivedStoEntity = receivedStoDao.findBy(nameSto, nameDetail, operationNumber,
                personnelNumber).orElseThrow();

        var newAmount = receivedStoEntity.getAmount() - amount;
        if (newAmount < 0) throw new RuntimeException("Выданные СТО не могут быть меньше нуля");
        if (newAmount == 0)
            receivedStoDao.deleteBy(receivedStoEntity.getId());
        else
            receivedStoDao.updateAmountBy(receivedStoEntity.getId(), newAmount);
    }
}
