package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.models.WorkerEntity;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@AllArgsConstructor
public class WorkerDao {

    JdbcTemplate jdbcTemplate;

    public List<WorkerEntity> findAllByName(String name) {
        return jdbcTemplate.query("SELECT nameWorker, personnelNumber FROM WORKER WHERE nameWorker = ?;",
                new BeanPropertyRowMapper<>(WorkerEntity.class), name);
    }

    public Optional<WorkerEntity> findByPersonnelNumber(String personnelNumber) {
        return jdbcTemplate.query("SELECT * FROM WORKER WHERE personnelNumber = ?;",
                new BeanPropertyRowMapper<>(WorkerEntity.class), personnelNumber).stream().findAny();
    }

    public List<String> findAllByNameWorkerLike(String partNameWorker) {
        return jdbcTemplate.queryForList("""
                SELECT DISTINCT nameWorker FROM WORKER WHERE nameWorker LIKE ? LIMIT 10;
                """, String.class, '%' + partNameWorker + '%');
    }

    public List<String> findAllByPersonnelNumberLike(String partPersonnelNumber) {
        return jdbcTemplate.queryForList("""
                SELECT personnelNumber FROM WORKER WHERE personnelNumber LIKE ? LIMIT 10;
                """, String.class, '%' + partPersonnelNumber + '%');
    }


//    public int insert(Worker worker) {
//        KeyHolder keyHolder = new GeneratedKeyHolder();
//        jdbcTemplate.update(connection -> {
//                    PreparedStatement ps = connection.prepareStatement(
//                            "INSERT INTO WORKER (nameWorker, personnelNumber) VALUES (?, ?);");
//                    ps.setString(1, worker.getName());
//                    ps.setString(2, worker.getPersonnelNumber());
//                    return ps;
//                }, keyHolder);
//        return Objects.requireNonNull(keyHolder.getKey()).intValue();
//    }
}
