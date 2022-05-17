package com.github.maxelkin5gm.stas.ui;

import org.springframework.stereotype.Component;

import java.awt.*;
import javax.swing.*;
import java.net.*;

@Component
public class Gui {
    public static final String APPLICATION_NAME = "STAS Control Panel";
    public static final String ICON_PATH = "/ui/icon-tray.png";
    private TrayIcon trayIcon;

    public Gui() {
        createGUI();
    }

    private void createGUI() {
        try {
            createTrayIcon();
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(new JFrame(), "При инициализации приложения произошла ошибка",
                    "Ошибка", JOptionPane.ERROR_MESSAGE);
            System.exit(0);
        }
    }

    private void createTrayIcon() throws AWTException {
        if (!SystemTray.isSupported()) {
            return;
        }
        SystemTray tray = SystemTray.getSystemTray();

        Image image = Toolkit.getDefaultToolkit().getImage(Gui.class.getResource(ICON_PATH));

        PopupMenu trayMenu = new PopupMenu();
        MenuItem item1 = new MenuItem("Открыть окно приложения");
        MenuItem item2 = new MenuItem("Выход");
        item1.addActionListener(event -> openBrowser("http://localhost:8080"));
        item2.addActionListener(e -> System.exit(0));
        trayMenu.add(item1);
        trayMenu.add(item2);

        this.trayIcon = new TrayIcon(image, APPLICATION_NAME, trayMenu);
        trayIcon.setImageAutoSize(true);

        tray.add(trayIcon);
    }

    public void openBrowser(String url) {
        try {
            Desktop.getDesktop().browse(new URI(url));
            this.trayIcon.displayMessage(APPLICATION_NAME, "Открыто окно в браузере", TrayIcon.MessageType.INFO);
        } catch (Exception e) {
            e.printStackTrace();
            this.trayIcon.displayMessage(APPLICATION_NAME, "При открытии окна браузер произошла ошибка", TrayIcon.MessageType.ERROR);
        }
    }
}
