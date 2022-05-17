import {Worker} from "./worker.types";

export enum TableTypeEnum {
    CLEAR = "CLEAR",
    WORKER = "WORKER",
    DETAIL = "DETAIL",
    STO = "STO",
    CELL = "CELL",
}

/**
 * Query table types
 */
interface InitTableQuery {
    type: TableTypeEnum.CLEAR
    query: undefined
}

interface WorkerTableQuery {
    type: TableTypeEnum.WORKER,
    query: Worker
}

interface DetailTableQuery {
    type: TableTypeEnum.DETAIL,
    query: {
        detail: string,
        operationNumber: string
    }
}

interface StoTableQuery {
    type: TableTypeEnum.STO,
    query: {
        sto: string
    }
}

interface CellTableQuery {
    type: TableTypeEnum.CELL,
    query: {
        side: string,
        cellNumber: number
    }
}

export type TableQuery =
    InitTableQuery
    | WorkerTableQuery
    | DetailTableQuery
    | StoTableQuery
    | CellTableQuery;
