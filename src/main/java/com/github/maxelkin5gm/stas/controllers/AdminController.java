package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.DetailDao;
import com.github.maxelkin5gm.stas.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/")
@AllArgsConstructor
public class AdminController {
    AdminService adminService;
    DetailDao detailDao;

    // Sto and Detail START //
    @PostMapping("/addStoAndDetail")
    public void addStoAndDetail(@RequestParam String nameSto,
                                @RequestParam String nameDetail,
                                @RequestParam String operationNumber) {
        adminService.addStoAndDetail(nameSto, nameDetail, operationNumber);
    }

    @PostMapping("/deleteRelationshipByStoAndDetail")
    public void deleteRelationshipByStoAndDetail(@RequestParam String nameSto,
                                                 @RequestParam String nameDetail,
                                                 @RequestParam String operationNumber) {
        adminService.deleteRelationshipByStoAndDetail(nameSto, nameDetail, operationNumber);
    }

    @PostMapping("/deleteSto")
    public void deleteSto(@RequestParam String nameSto) {
        adminService.deleteSto(nameSto);
    }

    @PostMapping("/deleteDetail")
    public void deleteDetail(@RequestParam String nameDetail,
                             @RequestParam String operationNumber) {
        detailDao.deleteBy(nameDetail, operationNumber);
    }
    // Sto and Detail END //


    // Received Sto START //
//    @PostMapping("/deleteReceivedSto")
//    public void deleteReceivedSto(@RequestParam String nameSto) {
//        adminService.deleteSto(nameSto);
//    }


    // Received Sto END //


}
