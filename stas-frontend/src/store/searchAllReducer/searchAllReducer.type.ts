import {SearchAllTableQuery} from "./types/table";


export interface SearchAllState {
    table: SearchAllTableQuery
}

export enum SearchAllStateActionTypes {
    SET_SEARCH_ALL_TABLE = "SET_SEARCH_ALL_TABLE",
}

export type SearchAllAction = SetTableAction;


// Actions START //
export interface SetTableAction {
    type: SearchAllStateActionTypes.SET_SEARCH_ALL_TABLE,
    table: SearchAllTableQuery
}

// Actions END //
