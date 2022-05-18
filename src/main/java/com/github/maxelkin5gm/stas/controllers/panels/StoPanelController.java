package com.github.maxelkin5gm.stas.controllers.panels;

import com.github.maxelkin5gm.stas.dao.panels.StoPanelDao;
import com.github.maxelkin5gm.stas.dto.stoPanel.QueryFindAllBySto;
import com.github.maxelkin5gm.stas.dto.stoPanel.QueryFindAllByStoAndStas;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stoPanel/")
@AllArgsConstructor
public class StoPanelController {
    StoPanelDao stoPanelDao;

    @PostMapping("/findAllByStoAndStas")
    public List<Map<String, Object>> findAllByStoAndStas(@RequestBody QueryFindAllByStoAndStas query) {
        return stoPanelDao.findAllByStoAndStas(query.getNameSto(), query.getStasIndex());
    }

    @PostMapping("/findAllBySto")
    public List<Map<String, Object>> findAllBySto(@RequestBody QueryFindAllBySto query) {
        return stoPanelDao.findAllBySto(query.getNameSto());
    }
}
