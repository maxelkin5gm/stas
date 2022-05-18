package com.github.maxelkin5gm.stas.dao.panels;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@AllArgsConstructor
public class CellPanelDao {
    JdbcTemplate jdbcTemplate;

    private final String sql = """
            SELECT nameSto, remainder, side, cellNumber, status, note
            FROM STO, CELL, STO_CELL
            WHERE STO_CELL.sto_id = STO.id AND STO_CELL.cell_id = CELL.id
                AND side = ? AND cellNumber = ? AND stasIndex = ?;""";

    public List<Map<String, Object>> findAllByCellAndStas(String side, int cellNumber, int stasIndex) {
        return jdbcTemplate.queryForList(sql, side, cellNumber, stasIndex);
    }


}
