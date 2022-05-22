package com.github.maxelkin5gm.stas.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceivedStoEntity {
    Integer id;
    int amount;
    String operationDate;
    int cell_id;
    int worker_id;
    String receivedNameSto;
    String receivedNameDetail;
    String receivedOperationNumber;
}
