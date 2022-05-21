package com.github.maxelkin5gm.stas.dao;

import com.github.maxelkin5gm.stas.models.DetailEntity;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class DetailDao {
    JdbcTemplate jdbcTemplate;

    public Optional<DetailEntity> findByDetail(String nameDetail, String operationNumber) {
        return jdbcTemplate.query("SELECT * FROM DETAIL WHERE nameDetail = ? AND operationNumber = ?",
                new BeanPropertyRowMapper<>(DetailEntity.class), nameDetail, operationNumber).stream().findAny();
    }

    public List<Map<String, Object>> findAllBySto(String nameSto) {
        String sql = """
                SELECT nameDetail, operationNumber
                FROM STO, DETAIL, STO_DETAIL
                WHERE STO_DETAIL.sto_id = STO.id AND STO_DETAIL.detail_id = DETAIL.id
                    AND nameSto = ?;""";
        return jdbcTemplate.queryForList(sql, nameSto);
    }

    public List<String> findAllByNameDetailLike(String partNameDetail) {
        return jdbcTemplate.queryForList("""
                SELECT DISTINCT nameDetail FROM DETAIL WHERE nameDetail LIKE ? LIMIT 10;
                """, String.class, '%' + partNameDetail + '%');
    }

    public List<String> findAllByOperationNumberLike(String partOperationNumber) {
        return jdbcTemplate.queryForList("""
                SELECT DISTINCT operationNumber FROM DETAIL WHERE operationNumber LIKE ? LIMIT 10;
                """, String.class, '%' + partOperationNumber + '%');
    }

    public int insert(String nameDetail, String operationNumber) {
        var keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO DETAIL (nameDetail, operationNumber) VALUES (?, ?);");
            ps.setString(1, nameDetail);
            ps.setString(2, operationNumber);
            return ps;
        }, keyHolder);
        return Objects.requireNonNull(keyHolder.getKey()).intValue();
    }

    public void deleteByDetail(String nameDetail, String operationNumber) {
        var count = jdbcTemplate.update("DELETE FROM DETAIL WHERE nameDetail = ? AND operationNumber = ?;",
                nameDetail, operationNumber);
        if (count == 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Такой детали и номера операции не найдено");
    }
}
