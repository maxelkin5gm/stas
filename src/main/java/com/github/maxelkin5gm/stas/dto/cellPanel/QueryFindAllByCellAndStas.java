package com.github.maxelkin5gm.stas.dto.cellPanel;

import lombok.Data;

@Data
public class QueryFindAllByCellAndStas {
    String side;
    int cellNumber;
    int stasIndex;
}
