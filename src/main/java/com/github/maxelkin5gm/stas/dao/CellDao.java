package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.models.CellEntity;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class CellDao {
    JdbcTemplate jdbcTemplate;

    public Optional<CellEntity> findByCell(int stasIndex, String side, int cellNumber) {
        return jdbcTemplate.query("""
                SELECT * FROM CELL
                WHERE stasIndex = ? AND side = ? AND cellNumber = ?""",
                new BeanPropertyRowMapper<>(CellEntity.class), stasIndex, side, cellNumber).stream().findAny();
    }

    public void updateNoteByCell(int stasIndex, String side, int cellNumber, String note) {
        var cellEntity = findByCell(stasIndex, side, cellNumber).orElseThrow();
        jdbcTemplate.update("UPDATE CELL SET note = ? WHERE CELL.id = ?;", note, cellEntity.getId());
    }
}
