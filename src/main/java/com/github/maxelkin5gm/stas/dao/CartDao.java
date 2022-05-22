package com.github.maxelkin5gm.stas.dao;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@AllArgsConstructor
public class CartDao {
    JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> findAllMatchStoBy(int stasIndex, String side, int cellNumber,
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
