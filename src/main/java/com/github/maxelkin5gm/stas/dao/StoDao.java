package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.entities.StoEntity;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class StoDao {
    JdbcTemplate jdbcTemplate;

    public Optional<StoEntity> findBy(String nameSto) {
        return jdbcTemplate.query("SELECT * FROM STO WHERE nameSto = ?",
                new BeanPropertyRowMapper<>(StoEntity.class), nameSto).stream().findAny();
    }

    public List<String> findByLike(String partNameSto) {
        return jdbcTemplate.queryForList("""
                SELECT nameSto FROM STO WHERE nameSto LIKE ? LIMIT 10;
                """, String.class, '%' + partNameSto + '%');
    }

    public int insert(String nameSto) {
        var keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO STO (nameSto) VALUES (?);");
            ps.setString(1, nameSto);
            return ps;
        }, keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }

    public void deleteBy(String nameSto) {
        jdbcTemplate.update("DELETE FROM STO WHERE nameSto = ?;", nameSto);
    }
}
