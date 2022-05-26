package com.github.maxelkin5gm.stas.controllers;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletResponse;
import java.io.IOException;

@RestController
@AllArgsConstructor
public class TestController {

    @GetMapping("/test")
    public void test(ServletResponse resp) throws IOException, InterruptedException {
//        resp.getWriter().close();
//        Thread.sleep(5000);
        System.out.println("test");
//        return StasDelivery.getStasBy(0);
    }


}
