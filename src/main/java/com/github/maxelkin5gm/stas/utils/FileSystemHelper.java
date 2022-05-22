package com.github.maxelkin5gm.stas.utils;

import java.util.Objects;
import java.util.Scanner;

public class FileSystemHelper {

    public static String readFile(String path) {
        try (var stream = FileSystemHelper.class.getResourceAsStream(path)) {
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

    public static String getAbsolutePathJar() {
        var path = Objects.requireNonNull(FileSystemHelper.class.getResource("/")).getPath();
        var firstIndex = path.indexOf('!');
        if (firstIndex >  0) path = path.substring(0, firstIndex);
        if (path.startsWith("file:/")) path = path.substring(6);
        path = path.substring(0, path.lastIndexOf('/') + 1);
        return path;
    }
}
