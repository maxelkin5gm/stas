import {SearchAllAction, SearchAllState, SearchAllStateActionTypes} from "./searchAllReducer.type";
import {SearchAllTableTypeEnum} from "./types/table.types";

const searchAllInit: SearchAllState = {
    table: {
        type: SearchAllTableTypeEnum.CLEAR,
        query: undefined
    },
}



export const searchAllReducer = (state: SearchAllState = searchAllInit, action: SearchAllAction): SearchAllState => {
    switch (action.type) {
        case SearchAllStateActionTypes.SET_SEARCH_ALL_TABLE:
            return {...state, table: action.table};

        default:
            return state;
    }
}