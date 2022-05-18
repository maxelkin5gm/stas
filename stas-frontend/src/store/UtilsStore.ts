import {useTypeDispatch} from "../hooks/useTypeDispatch";
import {AppStateActionTypes} from "./appReducer/appReducer.type";
import {TableQuery, TableTypeEnum} from "./stasReducer/types/table.types";
import {StasStateActionTypes} from "./stasReducer/stasReducer.type";

type Dispatch = ReturnType<typeof useTypeDispatch>

export class UtilsStore {

    /**
     * Default title "Ошибка"
     */
    static showError(dispatch: Dispatch, text?: string) {
        dispatch({
            type: AppStateActionTypes.SET_ERROR_MODAL,
            visible: true,
            title: "Ошибка",
            text: text || "При запросе на сервер прозошла ошибка. Проверьте активность программы."
        });
    }

    static setLoader(show: boolean, dispatch: Dispatch) {
        dispatch({type: AppStateActionTypes.SET_LOADING, isLoading: show})
    }

    static setTable(dispatch: Dispatch, stasIndex: number, table: TableQuery) {
        dispatch({
            type: StasStateActionTypes.SET_TABLE,
            stasIndex: stasIndex,
            table
        })
    }

}