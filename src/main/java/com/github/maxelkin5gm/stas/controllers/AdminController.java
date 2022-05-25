package com.github.maxelkin5gm.stas.controllers;

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


    // Sto and Detail //
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


    // Change Cell //
    @PostMapping("/changeStoInCell")
    public void changeStoInCell(@RequestParam int stasIndex,
                                @RequestParam String side,
                                @RequestParam int cellNumber,
                                @RequestParam String nameSto,
                                @RequestParam int remainder) {
        adminService.changeStoInCell(stasIndex, side, cellNumber, nameSto, remainder);
    }

    @PostMapping("/changeCell")
    public void changeCell(@RequestParam int stasIndex,
                           @RequestParam String side,
                           @RequestParam int cellNumber,
                           @RequestParam String status,
                           @RequestParam String note) {
        adminService.changeCell(stasIndex, side, cellNumber, status, note);
    }

    @PostMapping("/deleteStoFromCell")
    public void deleteStoFromCell(@RequestParam int stasIndex,
                                  @RequestParam String side,
                                  @RequestParam int cellNumber,
                                  @RequestParam String nameSto) {
        adminService.deleteStoFromCell(stasIndex, side, cellNumber, nameSto);
    }

    @PostMapping("/addStoInCell")
    public void addStoInCell(@RequestParam int stasIndex,
                             @RequestParam String side,
                             @RequestParam int cellNumber,
                             @RequestParam String nameSto,
                             @RequestParam int remainder) {
        adminService.addStoInCell(stasIndex, side, cellNumber, nameSto, remainder);
    }


}
