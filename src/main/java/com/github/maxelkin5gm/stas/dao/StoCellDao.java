package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.models.StoCellEntity;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.Objects;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class StoCellDao {
    JdbcTemplate jdbcTemplate;

    public Optional<StoCellEntity> findBy(int stoId, int cellId) {
        return jdbcTemplate.query("SELECT * FROM STO_CELL WHERE sto_id = ? AND cell_id = ?",
                new BeanPropertyRowMapper<>(StoCellEntity.class), stoId, cellId).stream().findAny();
    }

    public int findRemainderBy(int stoId, int cellId) {
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

    public Integer countBy(String nameSto) {
        return jdbcTemplate.queryForObject("""
                SELECT count(*) FROM STO, STO_CELL
                WHERE STO_CELL.sto_id = STO.id AND nameSto = ?;
                """, Integer.class, nameSto);
    }

    public void deleteBy(int stoId, int cellId) {
        jdbcTemplate.update("DELETE FROM STO_CELL WHERE sto_id = ? AND cell_id = ?", stoId, cellId);
    }

    public int insert(int stoId, int cellId, int remainder) {
        var keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO STO_CELL (sto_id, cell_id, remainder) VALUES (?,?,?);");
            ps.setInt(1, stoId);
            ps.setInt(2, cellId);
            ps.setInt(3, remainder);
            return ps;
        }, keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }
}
