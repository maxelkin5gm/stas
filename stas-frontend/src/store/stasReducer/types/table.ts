import {Worker} from "./worker";

export enum TableTypeEnum {
    CLEAR = "CLEAR",
    BY_WORKER = "BY_WORKER",
    BY_DETAIL = "BY_DETAIL",
    BY_STO = "BY_STO",
    BY_CELL = "BY_CELL",
}

export type TableQuery =
    ClearTableQuery
    | WorkerTableQuery
    | DetailTableQuery
    | StoTableQuery
    | CellTableQuery;


// Queries START //
interface ClearTableQuery {
    type: TableTypeEnum.CLEAR
    query: undefined
}

interface WorkerTableQuery {
    type: TableTypeEnum.BY_WORKER,
    query: Worker
}

interface DetailTableQuery {
    type: TableTypeEnum.BY_DETAIL,
    query: {
        detail: string,
        operationNumber: string
    }
}

interface StoTableQuery {
    type: TableTypeEnum.BY_STO,
    query: {
        nameSto: string
    }
}

interface CellTableQuery {
    type: TableTypeEnum.BY_CELL,
    query: {
        side: string,
        cellNumber: number
    }
}
// Queries END //
