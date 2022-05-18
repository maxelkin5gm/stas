package com.github.maxelkin5gm.stas.dao;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@AllArgsConstructor
public class TableDao {
    JdbcTemplate jdbcTemplate;

    // Worker START //
    public List<Map<String, Object>> findAllByWorkerAndStas(String personnelNumber, int stasIndex) {
        String sql = """
                SELECT receivedNameSto, amount, receivedNameDetail, receivedOperationNumber, operationDate, side,
                    cellNumber, status, note
                FROM CELL, WORKER, RECEIVED_STO
                WHERE RECEIVED_STO.cell_id = CELL.id AND RECEIVED_STO.worker_id = WORKER.id
                    AND personnelNumber = ? AND stasIndex = ?;""";
        return jdbcTemplate.queryForList(sql, personnelNumber, stasIndex);
    }

    public List<Map<String, Object>> findAllByWorker(String personnelNumber) {
        String sql = """
                SELECT receivedNameSto, amount, receivedNameDetail, receivedOperationNumber, operationDate, side,
                    cellNumber, status, note
                FROM CELL, WORKER, RECEIVED_STO
                WHERE RECEIVED_STO.cell_id = CELL.id AND RECEIVED_STO.worker_id = WORKER.id
                    AND personnelNumber = ?;""";
        return jdbcTemplate.queryForList(sql, personnelNumber);
    }
    // Worker END //


    // Detail START //
    public List<Map<String, Object>> findAllByDetailAndStas(String nameDetail, String operationNumber, int stasIndex) {
        String sql = """
                SELECT nameDetail, operationNumber, nameSto, remainder, side, cellNumber, status, note
                FROM STO, DETAIL, CELL, STO_DETAIL, STO_CELL
                WHERE STO_DETAIL.sto_id = STO.id AND STO_DETAIL.detail_id = DETAIL.id
                  AND STO_CELL.sto_id = STO.id AND STO_CELL.cell_id = CELL.id
                  AND nameDetail = ? AND operationNumber = ? AND stasIndex = ?;""";
        return jdbcTemplate.queryForList(sql, nameDetail, operationNumber, stasIndex);
    }

    public List<Map<String, Object>> findAllByDetail(String nameDetail, String operationNumber) {
        String sql = """
                SELECT nameDetail, operationNumber, nameSto, remainder, side, cellNumber, status, note
                FROM STO, DETAIL, CELL, STO_DETAIL, STO_CELL
                WHERE STO_DETAIL.sto_id = STO.id AND STO_DETAIL.detail_id = DETAIL.id
                  AND STO_CELL.sto_id = STO.id AND STO_CELL.cell_id = CELL.id
                  AND nameDetail = ? AND operationNumber = ?;""";
        return jdbcTemplate.queryForList(sql, nameDetail, operationNumber);
    }
    // Derail END //


    // Sto START //
    public List<Map<String, Object>> findAllByStoAndStas(String nameSto, int stasIndex) {
        String sql = """
                SELECT nameSto, remainder, side, cellNumber, status, note
                FROM STO, CELL, STO_CELL
                WHERE STO_CELL.sto_id = STO.id AND STO_CELL.cell_id = CELL.id
                    AND nameSto = ? AND stasIndex = ?;""";
        return jdbcTemplate.queryForList(sql, nameSto, stasIndex);
    }

    public List<Map<String, Object>> findAllBySto(String nameSto) {
        String sql = """
                SELECT nameSto, remainder, side, cellNumber, status, note
                FROM STO, CELL, STO_CELL
                WHERE STO_CELL.sto_id = STO.id AND STO_CELL.cell_id = CELL.id
                    AND nameSto = ?;""";
        return jdbcTemplate.queryForList(sql, nameSto);
    }
    // Sto END //


    // Cell START //
    public List<Map<String, Object>> findAllByCellAndStas(String side, int cellNumber, int stasIndex) {
        String sql = """
                SELECT nameSto, remainder, side, cellNumber, status, note
                FROM STO, CELL, STO_CELL
                WHERE STO_CELL.sto_id = STO.id AND STO_CELL.cell_id = CELL.id
                    AND side = ? AND cellNumber = ? AND stasIndex = ?;""";
        return jdbcTemplate.queryForList(sql, side, cellNumber, stasIndex);
    }
    // Cell END //


}
