import {SearchAllTableQuery} from "./types/table";


export interface SearchAllState {
    table: SearchAllTableQuery
}

export enum SearchAllStateActionTypes {
    SET_SEARCH_ALL_TABLE = "SET_SEARCH_ALL_TABLE",
    REFRESH_SEARCH_ALL_TABLE = "REFRESH_SEARCH_ALL_TABLE",
}

export type SearchAllAction = SetTableAction | RefreshTableAction;


// Actions START //
export interface SetTableAction {
    type: SearchAllStateActionTypes.SET_SEARCH_ALL_TABLE,
    table: SearchAllTableQuery
}
export interface RefreshTableAction {
    type: SearchAllStateActionTypes.REFRESH_SEARCH_ALL_TABLE
}

// Actions END //
