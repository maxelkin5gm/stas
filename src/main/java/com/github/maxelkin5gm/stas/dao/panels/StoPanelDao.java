//package com.github.maxelkin5gm.stas.dao.panels;
//
//import lombok.AllArgsConstructor;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Map;
//
//@Repository
//@AllArgsConstructor
//public class StoPanelDao {
//    JdbcTemplate jdbcTemplate;
//
//    private final String sql = """
//            SELECT nameDetail, operationNumber, nameSto, remainder, side, cellNumber, status, note
//            FROM STO, DETAIL, CELL, STO_DETAIL, STO_CELL
//            WHERE STO_DETAIL.sto_id = STO.id AND STO_DETAIL.detail_id = DETAIL.id
//              AND STO_CELL.sto_id = STO.id AND STO_CELL.cell_id = CELL.id
//              AND nameDetail = ? AND operationNumber = ?""";
//
//    public List<Map<String, Object>> findAllByStoAndStas(String nameSto, int stasIndex) {
//        String sqlWithStasIndex = sql + " AND stasIndex = ?;";
//        return jdbcTemplate.queryForList(sqlWithStasIndex, nameSto, stasIndex);
//    }
//
//    public List<Map<String, Object>> findAllBySto(String nameSto) {
//        return jdbcTemplate.queryForList(sql, nameSto);
//    }
//
//}
