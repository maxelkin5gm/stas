package com.github.maxelkin5gm.stas.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CellEntity {
    int id;
    int statIndex;
    String side;
    int cellNumber;
    String status;
    String note;
}
