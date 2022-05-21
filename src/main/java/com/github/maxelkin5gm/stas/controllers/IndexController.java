package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.services.FileService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@AllArgsConstructor
public class IndexController {
    final static String indexPath = "/static/index.html";
    FileService fileService;

    @GetMapping("/")
    public String indexHtmlReact() {
        var fileData = fileService.readFile(indexPath);

        if (fileData == null) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Не найден файл index.html");
        return fileData;
    }

}
