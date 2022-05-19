import {Worker} from "./types/worker";
import {TableQuery} from "./types/table";
import {StasStateEnum} from "./types/state";
import {SelectedCell} from "./types/selectedCell";
import {Cart} from "./types/cart";

// state => StasState[] - stas 1, stas 2..
export interface StasState {
    state: StasStateEnum,
    worker: Worker,
    table: TableQuery,
    selectedCell: SelectedCell | null,
    cart: Cart[]
}

export enum StasStateActionTypes {
    SET_STATE = "SET_STATE",
    SET_WORKER = "SET_WORKER",
    SET_TABLE = "SET_TABLE",
    REFRESH_TABLE = "REFRESH_TABLE",
    SET_SELECTED_CELL = "SET_SELECTED_CELL",
    SET_CART = "SET_CART"
}

export type StasAction =
    SetStateAction
    | SetWorkerAction
    | SetTableAction
    | RefreshTableAction
    | SetSelectedCellAction
    | SetCartAction;


// Actions START //
export interface SetStateAction {
    type: StasStateActionTypes.SET_STATE,
    stasIndex: number,
    state: StasStateEnum
}

export interface SetWorkerAction {
    type: StasStateActionTypes.SET_WORKER,
    stasIndex: number,
    worker: Worker
}

export interface SetTableAction {
    type: StasStateActionTypes.SET_TABLE,
    stasIndex: number,
    table: TableQuery
}

export interface RefreshTableAction {
    type: StasStateActionTypes.REFRESH_TABLE,
    stasIndex: number
}

export interface SetSelectedCellAction {
    type: StasStateActionTypes.SET_SELECTED_CELL,
    stasIndex: number,
    selectedCell: SelectedCell
}

export interface SetCartAction {
    type: StasStateActionTypes.SET_CART,
    stasIndex: number,
    cart: Cart[]
}

// Actions END //