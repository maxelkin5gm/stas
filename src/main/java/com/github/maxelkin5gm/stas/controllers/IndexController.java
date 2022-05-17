package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.services.FileService;
import lombok.AllArgsConstructor;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@Controller
@AllArgsConstructor
public class IndexController implements ErrorController {

    final static String indexPath = "/static/index.html";

    FileService fileService;

    @RequestMapping("/error")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public String handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        if (status != null) {
            int statusCode = Integer.parseInt(status.toString());

            if(statusCode == HttpStatus.NOT_FOUND.value()) {
                var fileData = fileService.readFile(indexPath);
                if (fileData != null) return fileData;
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            } else
                throw new ResponseStatusException(HttpStatus.valueOf(statusCode));
        }
        return "error";
    }

}
