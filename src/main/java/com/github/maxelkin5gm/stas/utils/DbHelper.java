package com.github.maxelkin5gm.stas.utils;

import javax.swing.*;
import java.io.File;

public class DbHelper {

    public static void validate() {
        var isExist = new File("./sqlite/db.sqlite").exists();
        if (!isExist) {
            JOptionPane.showMessageDialog(new JFrame(),
                    "Файл базы данных не обнаружен", "Ошибка", JOptionPane.ERROR_MESSAGE);
            System.exit(0);
        }
    }
}
