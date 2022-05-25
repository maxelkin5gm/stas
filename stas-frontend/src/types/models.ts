import {StatusCell} from "../store/stasReducer/types/selectedCell";

export interface DetailEntity {
    id?: number
    nameDetail: string
    operationNumber: string
}

export interface CellEntity {
    id?: number,
    stasIndex: number
    side: string
    cellNumber: number
    status: StatusCell
    note: string
}
