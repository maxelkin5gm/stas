package com.github.maxelkin5gm.stas.models;

import lombok.Data;

@Data
public class CellEntity {
    int id;
    int statIndex;
    String side;
    int cellNumber;
    String status;
    String note;
}
