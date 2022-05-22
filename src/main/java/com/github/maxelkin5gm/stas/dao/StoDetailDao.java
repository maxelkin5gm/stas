package com.github.maxelkin5gm.stas.dao;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class StoDetailDao {
    JdbcTemplate jdbcTemplate;


    public void insert(int stoId, int detailId) {
        jdbcTemplate.update("INSERT INTO STO_DETAIL (sto_id, detail_id) VALUES (?,?);", stoId, detailId);
    }

    public Integer countBy(int stoId, int detailId) {
        return jdbcTemplate.queryForObject("SELECT count(*) FROM STO_DETAIL WHERE sto_id = ? AND detail_id = ?;",
                Integer.class, stoId, detailId);
    }

    public void deleteBy(int stoId, int detailId) {
        jdbcTemplate.update("DELETE FROM STO_DETAIL WHERE sto_id = ? AND detail_id = ?;", stoId, detailId);
    }
}
