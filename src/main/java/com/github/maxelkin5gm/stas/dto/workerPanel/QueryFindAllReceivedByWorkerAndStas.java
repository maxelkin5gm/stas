package com.github.maxelkin5gm.stas.dto.workerPanel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueryFindAllReceivedByWorkerAndStas extends QueryFindAllReceivedByWorker {
    int stasIndex;
}
