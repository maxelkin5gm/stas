package com.github.maxelkin5gm.stas.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReceivedStoEntity {
    int amount;
    int operationDate;
    int cell_id;
    int worker_id;
    String receivedNameSto;
    String receivedNameDetail;
    String receivedOperationNumber;
}
