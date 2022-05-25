import React, {useCallback, useEffect, useState} from 'react';
import BaseTable from "./BaseTable/BaseTable";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {stoColumns} from "./columns/admin/stoColumns";
import {UtilsStore} from "../../store/UtilsStore";
import {TableService} from "../../services/TableService";
import {Cell} from "../panels/admin/CellPanel";
import {addKeyPropertyForArray} from "../../services/utils/addKeyPropertyForArray";
import ChangeCellAndRemainderModal from "../modals/admin/ChangeCellAndRemainderModal";


interface AdminCellTableProps {
    cell: Cell | null
}

const AdminCellTable = ({cell}: AdminCellTableProps) => {
    const dispatch = useTypeDispatch();

    const [tableState, setTableState] = useState({
        columns: stoColumns,
        data: [] as any[]
    })
    const [changeCellModalState, setChangeCellModalState] = useState({
        visible: false,
        row: {} as any
    })

    const fillTable = useCallback(() => {
        if (!cell) return
        UtilsStore.setLoader(dispatch, true)
        TableService.findAllByCellAndStas(cell.side, cell.cellNumber, cell.stasIndex)
            .then(data => setTableState({
                columns: stoColumns,
                data: addKeyPropertyForArray(data)
            }))
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [cell, dispatch])

    useEffect(() => {
        fillTable()
    }, [fillTable])

    function doubleClickHandler(row: any) {
        setChangeCellModalState({
            visible: true,
            row
        })
    }

    return (
        <>
            <BaseTable tableState={tableState}
                       onDoubleClickRow={doubleClickHandler}
            />

            {changeCellModalState.visible
                ? <ChangeCellAndRemainderModal modalState={changeCellModalState}
                                               onClose={() => setChangeCellModalState({
                                                   ...changeCellModalState,
                                                   visible: false
                                               })}
                                               fillTable={fillTable}
                /> : null}
        </>
    );
};

export default AdminCellTable;