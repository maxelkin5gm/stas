package com.github.maxelkin5gm.stas.controllers.panels;

import com.github.maxelkin5gm.stas.dao.panels.DetailPanelDao;
import com.github.maxelkin5gm.stas.dto.detailPanel.QueryFindAllByDetail;
import com.github.maxelkin5gm.stas.dto.detailPanel.QueryFindAllByDetailAndStas;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/detailPanel/")
@AllArgsConstructor
public class DetailPanelController {
    private DetailPanelDao detailPanelDao;

    @PostMapping("/findAllByDetailAndStas")
    public List<Map<String, Object>> findAllByDetailAndStas(@RequestBody QueryFindAllByDetailAndStas query) {
        return detailPanelDao.findAllByDetailAndStas(query.getNameDetail(), query.getOperationNumber(), query.getStasIndex());
    }

    @PostMapping("/findAllByDetail")
    public List<Map<String, Object>> findAllByDetail(@RequestBody QueryFindAllByDetail query) {
        return detailPanelDao.findAllByDetail(query.getNameDetail(), query.getOperationNumber());
    }
}

