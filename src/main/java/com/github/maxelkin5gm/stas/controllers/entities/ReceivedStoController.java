package com.github.maxelkin5gm.stas.controllers.entities;

import com.github.maxelkin5gm.stas.dao.ReceivedStoDao;
import com.github.maxelkin5gm.stas.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/receivedSto/")
@AllArgsConstructor
public class ReceivedStoController {
    ReceivedStoDao receivedStoDao;

    @PostMapping("/updateAmount")
    @Transactional
    public void updateAmount(@RequestParam String receivedNameSto,
                             @RequestParam String receivedNameDetail,
                             @RequestParam String receivedOperationNumber,
                             @RequestParam String personnelNumber,
                             @RequestParam int amount) {
        var receivedStoEntity = receivedStoDao
                .findBy(receivedNameSto, receivedNameDetail, receivedOperationNumber, personnelNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Такой позиции выданного СТО не найдено"));
        receivedStoDao.updateAmountBy(receivedStoEntity.getId(), amount);
    }

    @PostMapping("/delete")
    public void deleteReceivedSto(@RequestParam String receivedNameSto,
                                  @RequestParam String receivedNameDetail,
                                  @RequestParam String receivedOperationNumber,
                                  @RequestParam String personnelNumber) {
        var receivedStoEntity = receivedStoDao
                .findBy(receivedNameSto, receivedNameDetail, receivedOperationNumber, personnelNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Такой позиции выданного СТО не найдено"));
        receivedStoDao.deleteBy(receivedStoEntity.getId());
    }
}
