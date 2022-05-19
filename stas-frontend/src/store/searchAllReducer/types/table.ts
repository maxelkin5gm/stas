export enum SearchAllTableTypeEnum {
    CLEAR = "CLEAR",
    BY_WORKER = "BY_WORKER",
    BY_DETAIL = "BY_DETAIL",
    CELL_BY_STO = "CELL_BY_STO",
    RECEIVED_BY_STO = "RECEIVED_BY_STO",
    BY_STO_AND_REMAINDER = "BY_STO_AND_REMAINDER",
}

export type SearchAllTableQuery =
    ClearTableQuery
    | ByWorkerTableQuery
    | ByDetailTableQuery
    | CellByStoTableQuery
    | ReceivedByStoTableQuery
    | ByStoAndRemainderTableQuery;


// Queries START //
interface ClearTableQuery {
    type: SearchAllTableTypeEnum.CLEAR
    query: undefined
}

interface ByWorkerTableQuery {
    type: SearchAllTableTypeEnum.BY_WORKER,
    query: {
        personnelNumber: string
    }
}

interface ByDetailTableQuery {
    type: SearchAllTableTypeEnum.BY_DETAIL,
    query: {
        detail: string,
        operationNumber: string
    }
}

interface CellByStoTableQuery {
    type: SearchAllTableTypeEnum.CELL_BY_STO,
    query: {
        nameSto: string
    }
}

interface ReceivedByStoTableQuery {
    type: SearchAllTableTypeEnum.RECEIVED_BY_STO,
    query: {
        nameSto: string
    }
}

interface ByStoAndRemainderTableQuery {
    type: SearchAllTableTypeEnum.BY_STO_AND_REMAINDER,
    query: {
        nameSto: string,
        remainder: number
    }
}

// Queries END //