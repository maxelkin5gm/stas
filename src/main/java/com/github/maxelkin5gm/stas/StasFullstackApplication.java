package com.github.maxelkin5gm.stas;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import com.github.maxelkin5gm.stas.utils.DbHelper;

@SpringBootApplication
public class StasFullstackApplication {

    public static void main(String[] args) {
        DbHelper.validate();

        // SpringApplication.run(StasFullstackApplication.class, args);
        // Run without headless mode for Swing UI
        new SpringApplicationBuilder(StasFullstackApplication.class).headless(false).run();
    }

}
