import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";

import BaseTable from "./BaseTable/BaseTable";
import {StasStateActionTypes} from "../../store/stasReducer/stasReducer.type";
import DoubleClickModal from "../modals/table/DoubleClickModal";
import {fillStasTable} from "./utils/fillStasTable";
import {UtilsStore} from "../../store/UtilsStore";

interface MainTableProps {
    stasIndex: number,
    isLoading?: boolean
}

const StasTable = ({stasIndex, isLoading}: MainTableProps) => {
    const tableQuery = useTypeSelector(state => state.stasList[stasIndex].table);
    const dispatch = useTypeDispatch();

    const [doubleClickModalState, setDoubleClickModalState] = useState({
        visible: false,
        row: {} as any
    })
    const [tableState, setTableState] = useState({
        columns: [] as any[],
        data: [] as any[]
    })

    function onClickRowHandler(row: any) {
        dispatch({
            type: StasStateActionTypes.SET_SELECTED_CELL,
            stasIndex,
            selectedCell: {
                cellNumber: row.cellNumber,
                side: row.side,
                status: row.status
            }
        })
    }

    function onDoubleClickHandler(row: any) {
        setDoubleClickModalState({row, visible: true})
    }


    useEffect(() => {
        UtilsStore.setLoader(dispatch, true)
        fillStasTable(tableQuery, stasIndex, setTableState)
            .catch((e: Error) => UtilsStore.showError(dispatch, e.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [tableQuery, stasIndex, dispatch])

    return (
        <>
            <BaseTable tableState={tableState}
                       isLoading={isLoading}
                       onClickRow={onClickRowHandler}
                       onDoubleClickRow={onDoubleClickHandler}
            />


            {doubleClickModalState.visible
                ? <DoubleClickModal stasIndex={stasIndex} modalState={doubleClickModalState}
                                    onClose={() => setDoubleClickModalState({
                                        ...doubleClickModalState,
                                        visible: false
                                    })}/> : null}

        </>
    );
};

export default StasTable;