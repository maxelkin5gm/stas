package com.github.maxelkin5gm.stas.dao;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@AllArgsConstructor
public class DetailDao {
    JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> findAllBySto(String nameSto) {
        String sql = """
                SELECT nameDetail, operationNumber
                FROM STO, DETAIL, STO_DETAIL
                WHERE STO_DETAIL.sto_id = STO.id AND STO_DETAIL.detail_id = DETAIL.id
                    AND nameSto = ?;""";
        return jdbcTemplate.queryForList(sql, nameSto);
    }
}
