package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.models.CellEntity;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.Objects;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class CellDao {
    JdbcTemplate jdbcTemplate;

    public Optional<CellEntity> findBy(int stasIndex, String side, int cellNumber) {
        return jdbcTemplate.query("""
                        SELECT * FROM CELL
                        WHERE stasIndex = ? AND side = ? AND cellNumber = ?
                        """,
                new BeanPropertyRowMapper<>(CellEntity.class), stasIndex, side, cellNumber).stream().findAny();
    }

    @Transactional
    public void updateNoteBy(int stasIndex, String side, int cellNumber, String note) {
        var cellEntity = findBy(stasIndex, side, cellNumber).orElseThrow();
        jdbcTemplate.update("UPDATE CELL SET note = ? WHERE CELL.id = ?;", note, cellEntity.getId());
    }

    @Transactional
    public void updateStatusAndNoteBy(String status, String note, int cellId) {
        jdbcTemplate.update("UPDATE CELL SET status = ?, note = ? WHERE CELL.id = ?;", status, note, cellId);
    }

    public int insert(int stasIndex, String side, int cellNumber, String status) {
        var keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO CELL (stasIndex, side, cellNumber, status) VALUES (?,?,?,?);");
            ps.setInt(1, stasIndex);
            ps.setString(2, side);
            ps.setInt(3, cellNumber);
            ps.setString(4, status);
            return ps;
        }, keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }
}
