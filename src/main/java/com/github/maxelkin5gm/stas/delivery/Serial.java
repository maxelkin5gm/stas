package com.github.maxelkin5gm.stas.delivery;

import com.fazecast.jSerialComm.SerialPort;
import lombok.SneakyThrows;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class Serial {
    private SerialPort serialPort;

    public Serial(String portName) {
        setSerialPort(portName);
    }

    @SneakyThrows
    public boolean openPort() {
        if (!serialPort.openPort()) return false;
        Thread.sleep(1000);
        return true;
    }

    public boolean closePort() {
        return serialPort.closePort();
    }

    public boolean writeString(String str) {
        var bytesString = str.getBytes(StandardCharsets.UTF_8);
        var writeStatus = serialPort.writeBytes(bytesString, bytesString.length);
        return writeStatus != -1;
    }

    @SneakyThrows
    public String readString(int timeoutMillis) {
        int timeout = 0;
        while (serialPort.bytesAvailable() == 0) {
            Thread.sleep(300);
            timeout = timeout + 300;
            if (timeout > timeoutMillis) return null;
        }

        byte[] data = new byte[serialPort.bytesAvailable()];
        var count = serialPort.readBytes(data, data.length);
        return new String(data, StandardCharsets.UTF_8);
    }

    public static List<String> getAvailablePorts() {
        List<String> serialPorts = new ArrayList<>();
        for (var serialPort : SerialPort.getCommPorts()) {
            serialPorts.add(serialPort.getSystemPortName());
        }
        return serialPorts;
    }

    public String getSystemPortName() {
        return serialPort.getSystemPortName();
    }

    public void setSerialPort(String portDescriptor) {
        serialPort = SerialPort.getCommPort(portDescriptor);
    }
}
