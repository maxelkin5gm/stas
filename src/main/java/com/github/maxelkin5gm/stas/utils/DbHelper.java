package com.github.maxelkin5gm.stas.utils;

import javax.swing.*;
import java.io.File;

public class DbHelper {

    static final String RELATIVE_PATH_TO_DATABASE = "./sqlite/db.sqlite";
    static String PATH_TO_DATABASE = "./sqlite/db.sqlite";

    public static void validate() {

        if (new File(RELATIVE_PATH_TO_DATABASE).exists()) return;

        var pathToDatabase = FileSystemHelper.getAbsolutePathJar() + RELATIVE_PATH_TO_DATABASE;
        if (new File(pathToDatabase).exists()) {
            PATH_TO_DATABASE = pathToDatabase;
            return;
        }

        JOptionPane.showMessageDialog(new JFrame(),
                "Файл базы данных не обнаружен", "Ошибка", JOptionPane.ERROR_MESSAGE);
        System.exit(0);
    }

    public static String getPathToDatabase() {
        return PATH_TO_DATABASE;
    }

}
