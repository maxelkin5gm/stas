package com.github.maxelkin5gm.stas.dao;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class StoCellDao {
    JdbcTemplate jdbcTemplate;

    public int findRemainderByStoIdAndCellId(int stoId, int cellId) {
        var remainder = jdbcTemplate.queryForObject(
                "SELECT remainder FROM STO_CELL WHERE sto_id = ? AND cell_id = ?", Integer.class, stoId, cellId);
        if (remainder == null || remainder < 0)
            throw new NullPointerException("Поиск остатка СТО в ячейке дал отрицательный результат");
        return remainder;
    }

    public void update(int remainder, int stoId, int cellId) {
        jdbcTemplate.update("""
                        UPDATE STO_CELL SET remainder = ? WHERE sto_id = ? AND cell_id = ?""",
                remainder, stoId, cellId);
    }
}
