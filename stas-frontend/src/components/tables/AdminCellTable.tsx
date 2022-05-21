import React, {useEffect, useState} from 'react';
import BaseTable from "./BaseTable/BaseTable";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {stoColumns} from "./columns/admin/stoColumns";
import {UtilsStore} from "../../store/UtilsStore";
import {TableService} from "../../services/TableService";
import {Cell} from "../panels/admin/CellPanel";
import {addKeyPropertyForArray} from "../../services/utils/addKeyPropertyForArray";


interface AdminCellTableProps {
    cell: Cell | null
}

const AdminCellTable = ({cell}: AdminCellTableProps) => {
    const dispatch = useTypeDispatch();

    const [tableState, setTableState] = useState({
        columns: stoColumns,
        data: [] as any[]
    })

    useEffect(() => {
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

    return (
        <>
            <BaseTable tableState={tableState}/>
        </>
    );
};

export default AdminCellTable;