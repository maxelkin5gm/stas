import {SelectedCell} from "../store/stasReducer/types/selectedCell";
import {StasAction, StasStateActionTypes} from "../store/stasReducer/stasReducer.type";
import {StasStateEnum} from "../store/stasReducer/types/state.types";
import {Dispatch} from "redux";
import {AppAction} from "../store/appReducer/appReducer.type";
import {TableTypeEnum} from "../store/stasReducer/types/table.types";

export class StasService {

    static bringCell(selectedCell: SelectedCell, stasIndex: number, dispatch: Dispatch<AppAction | StasAction>) {
        dispatch({type: StasStateActionTypes.SET_STATE, stasIndex, state: StasStateEnum.GO})
        dispatch({
            type: StasStateActionTypes.SET_TABLE,
            stasIndex,
            table: {type: TableTypeEnum.CELL, query: {cellNumber: selectedCell.cellNumber, side: selectedCell.side}}
        })
        // fetch
        setTimeout(() => {
            dispatch({
                type: StasStateActionTypes.SET_STATE,
                stasIndex,
                state: StasStateEnum.WAIT
            })
        }, 2000)
    }

    static bringBackCell(selectedCell: SelectedCell, stasIndex: number, dispatch: Dispatch<AppAction | StasAction>) {
        dispatch({
            type: StasStateActionTypes.SET_STATE,
            stasIndex,
            state: StasStateEnum.GO
        })
        // fetch
        setTimeout(() => {
            dispatch({
                type: StasStateActionTypes.SET_STATE,
                stasIndex,
                state: StasStateEnum.READY
            })
        }, 2000)
    }

    static removeCell(selectedCell: SelectedCell, stasIndex: number, dispatch: Dispatch<AppAction | StasAction>) {
        dispatch({
            type: StasStateActionTypes.SET_STATE,
            stasIndex,
            state: StasStateEnum.READY
        })
        // fetch
        dispatch({
            type: StasStateActionTypes.REFRESH_TABLE,
            stasIndex
        })


    }
}