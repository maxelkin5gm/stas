import {StatusCell} from "../store/stasReducer/types/selectedCell";
import {StasStateEnum} from "../store/stasReducer/types/state";

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

export interface StasDeliveryState {
    error: string,
    state: StasStateEnum,
    side: string,
    cellNumber: number
}
