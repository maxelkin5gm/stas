import React, {useCallback, useEffect, useState} from 'react';
import BaseTable from "./BaseTable/BaseTable";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {stoColumns} from "./columns/admin/stoColumns";
import {UtilsStore} from "../../store/UtilsStore";
import {TableService} from "../../services/TableService";
import {addKeyPropertyForArray} from "../../services/utils/addKeyPropertyForArray";
import ChangeStoInCellModal from "../modals/admin/ChangeStoInCellModal";
import {CellEntity} from "../../types/models";


interface AdminCellTableProps {
    cellEntityState: CellEntity | null
}

const AdminCellTable = ({cellEntityState}: AdminCellTableProps) => {
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
        if (!cellEntityState) return
        UtilsStore.setLoader(dispatch, true)
        TableService.findAllByCellAndStas(cellEntityState.side, cellEntityState.cellNumber, cellEntityState.stasIndex)
            .then(data => setTableState({
                columns: stoColumns,
                data: addKeyPropertyForArray(data)
            }))
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [cellEntityState, dispatch])

    useEffect(() => {
        fillTable()
    }, [fillTable])

    function doubleClickHandler(row: any) {
        setChangeCellModalState({visible: true, row})
    }

    return (
        <>
            <BaseTable tableState={tableState}
                       onDoubleClickRow={doubleClickHandler}
            />

            {changeCellModalState.visible
                ? <ChangeStoInCellModal modalState={changeCellModalState}
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