package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.models.Worker;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import java.sql.PreparedStatement;
import java.util.*;

@Repository
@AllArgsConstructor
public class WorkerDao {

    JdbcTemplate jdbcTemplate;

    public List<Worker> findAllByName(String name) {
        return jdbcTemplate.query("SELECT name, personnelNumber FROM WORKER WHERE name = ?;",
                new BeanPropertyRowMapper<>(Worker.class), name);
    }

    public Optional<Worker> findAllByPersonnelNumber(String personnelNumber) {
        return jdbcTemplate.query("SELECT name, personnelNumber FROM WORKER WHERE personnelNumber = ?;",
                new BeanPropertyRowMapper<>(Worker.class), personnelNumber).stream().findAny();
    }

    // todo test
    public int insert(Worker worker) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
                    PreparedStatement ps = connection.prepareStatement(
                            "INSERT INTO WORKER (name, personnelNumber) VALUES (?, ?);");
                    ps.setString(1, worker.getName());
                    ps.setString(2, worker.getPersonnelNumber());
                    return ps;
                }, keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }
}
