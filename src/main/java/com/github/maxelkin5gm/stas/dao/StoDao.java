package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.models.StoEntity;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class StoDao {
    JdbcTemplate jdbcTemplate;

    public Optional<StoEntity> findByName(String nameSto) {
        return jdbcTemplate.query("SELECT * FROM STO WHERE nameSto = ?" ,
                new BeanPropertyRowMapper<>(StoEntity.class) , nameSto).stream().findAny();
    }

    public List<String> findByNameStoLike(String partNameSto) {
        return jdbcTemplate.queryForList("""
                SELECT nameSto FROM STO WHERE nameSto LIKE ? LIMIT 10;
                """, String.class, '%' + partNameSto + '%');
    }
}
