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

    @PostMapping("/addStoAndDetail")
    public void addStoAndDetail(@RequestParam String nameSto,
                                @RequestParam String nameDetail,
                                @RequestParam String operationNumber) {
        adminService.addStoAndDetail(nameSto, nameDetail, operationNumber);
    }

    @PostMapping("/deleteRelationshipStoAndDetail")
    public void deleteRelationshipStoAndDetail(@RequestParam String nameSto,
                                               @RequestParam String nameDetail,
                                               @RequestParam String operationNumber) {
        adminService.deleteRelationshipStoAndDetail(nameSto, nameDetail, operationNumber);
    }


}
