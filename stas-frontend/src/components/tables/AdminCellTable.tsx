import React, {useState} from 'react';
import BaseTable from "./BaseTable/BaseTable";
import {receivedStoColumns} from "./columns/searchAll/receivedStoColumns";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {CellEntity} from "../../types/models";


interface AdminCellTableProps {
    cellEntity: CellEntity
}

const AdminCellTable = ({cellEntity}: AdminCellTableProps) => {
    const dispatch = useTypeDispatch();

    const [tableState, setTableState] = useState({
        columns: receivedStoColumns,
        data: [] as any[]
    })

    // useEffect(() => {
    //     if (!personnelNumber) return
    //
    //     UtilsStore.setLoader(dispatch, true)
    //     TableService.findAllByWorker(personnelNumber)
    //         .then(data => setTableState({
    //             columns: receivedStoColumns,
    //             data
    //         }))
    //         .catch((e: Error) => UtilsStore.showError(dispatch, e.message))
    //         .finally(() => UtilsStore.setLoader(dispatch, false))
    //
    // }, [personnelNumber, dispatch])

    return (
        <>
            <BaseTable tableState={tableState}/>
        </>
    );
};

export default AdminCellTable;