package com.github.maxelkin5gm.stas.entities.enums;

public enum StatusCellEnum {
    INSTALLED("УСТАНОВЛЕНА"), REMOVED("СНЯТА");

    final String name;
    StatusCellEnum(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
