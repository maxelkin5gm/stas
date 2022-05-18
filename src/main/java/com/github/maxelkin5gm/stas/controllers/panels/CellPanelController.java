package com.github.maxelkin5gm.stas.controllers.panels;

import com.github.maxelkin5gm.stas.dao.panels.CellPanelDao;
import com.github.maxelkin5gm.stas.dto.cellPanel.QueryFindAllByCellAndStas;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cellPanel/")
@AllArgsConstructor
public class CellPanelController {

    CellPanelDao cellPanelDao;

    @PostMapping("/findAllByCellAndStas")
    public List<Map<String, Object>> findAllByCellAndStas(@RequestBody QueryFindAllByCellAndStas query) {
        return cellPanelDao.findAllByCellAndStas(query.getSide(), query.getCellNumber(), query.getStasIndex());
    }
}
