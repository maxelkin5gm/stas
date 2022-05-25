package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.entities.ReceivedStoEntity;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class ReceivedStoDao {
    JdbcTemplate jdbcTemplate;

    public Optional<ReceivedStoEntity> findBy(String receivedNameSto, String receivedNameDetail,
                                              String receivedOperationNumber, String personnelNumber) {
        return jdbcTemplate.query("""
                        SELECT RECEIVED_STO.id, amount, operationDate, cell_id, worker_id, receivedNameSto,
                               receivedNameDetail, receivedOperationNumber
                        FROM RECEIVED_STO, WORKER
                        WHERE RECEIVED_STO.worker_id = WORKER.id
                          AND personnelNumber = ?
                          AND receivedNameSto = ?
                          AND receivedNameDetail = ?
                          AND receivedOperationNumber = ?;
                        """, new BeanPropertyRowMapper<>(ReceivedStoEntity.class), personnelNumber, receivedNameSto,
                receivedNameDetail, receivedOperationNumber).stream().findAny();
    }

    public int insert(ReceivedStoEntity receivedSto) {
        return jdbcTemplate.update("""
                        INSERT INTO RECEIVED_STO (amount, operationDate, receivedNameSto, receivedNameDetail,
                                                  receivedOperationNumber, cell_id, worker_id)
                        VALUES (?, ?, ?, ?, ?, ?, ?);
                        """, receivedSto.getAmount(), receivedSto.getOperationDate(), receivedSto.getReceivedNameSto(),
                receivedSto.getReceivedNameDetail(), receivedSto.getReceivedOperationNumber(), receivedSto.getCell_id(),
                receivedSto.getWorker_id());
    }

    public int updateAmountBy(int receivedStoId, int amount) {
        return jdbcTemplate.update("""
                UPDATE RECEIVED_STO SET amount = ?
                WHERE RECEIVED_STO.id = ?;
                """, amount, receivedStoId);
    }

    public int deleteBy(int receivedStoId) {
        return jdbcTemplate.update("""
                DELETE FROM RECEIVED_STO WHERE RECEIVED_STO.id = ?;
                """, receivedStoId);
    }


}
