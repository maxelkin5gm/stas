package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.models.ReceivedStoEntity;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class ReceivedStoDao {

    JdbcTemplate jdbcTemplate;

    void insert(ReceivedStoEntity receivedSto) {
        jdbcTemplate.update("""
                        INSERT INTO RECEIVED_STO (amount, operationDate, receivedNameSto, receivedNameDetail,
                            receivedOperationNumber, cell_id, worker_id)
                        VALUES (?, ?, ?, ?, ?, ?, ?);""",
                receivedSto.getAmount(), receivedSto.getOperationDate(), receivedSto.getReceivedNameSto(),
                receivedSto.getReceivedNameDetail(), receivedSto.getReceivedOperationNumber(), receivedSto.getCell_id(),
                receivedSto.getWorker_id());
    }
}
