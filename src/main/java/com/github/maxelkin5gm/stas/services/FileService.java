package com.github.maxelkin5gm.stas.services;

import org.springframework.stereotype.Service;

import java.util.Scanner;

@Service
public class FileService {

    public String readFile(String path) {
        try (var stream = FileService.class.getResourceAsStream(path)) {
            if (stream == null) return null;

            StringBuilder fileData = new StringBuilder();
            var scanner = new Scanner(stream);
            while (scanner.hasNextLine()) {
                fileData.append(scanner.nextLine());
            }

            return fileData.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
