import React, {useCallback, useEffect, useState} from 'react';
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {UtilsStore} from "../../store/UtilsStore";
import BaseTable from "./BaseTable/BaseTable";
import {receivedStoColumns} from "./columns/searchAll/receivedStoColumns";
import {TableService} from "../../services/TableService";
import {Worker} from "../../store/stasReducer/types/worker";
import ChangeReceivedModal from "../modals/admin/ChangeReceivedModal";
import {addKeyPropertyForArray} from "../../services/utils/addKeyPropertyForArray";

interface AdminReceivedTableProps {
    worker: Worker | null
}

const AdminReceivedTable = ({worker}: AdminReceivedTableProps) => {
    const dispatch = useTypeDispatch();

    const [tableState, setTableState] = useState({
        columns: receivedStoColumns,
        data: [] as any[]
    })
    const [changeReceivedModalState, setChangeReceivedModalState] = useState({
        visible: false,
        row: {} as any
    })

    const fillTable = useCallback(() => {
        if (!worker) return

        UtilsStore.setLoader(dispatch, true)
        TableService.findAllByWorker(worker.personnelNumber)
            .then(data => setTableState({
                columns: receivedStoColumns,
                data: addKeyPropertyForArray(data)
            }))
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [worker, dispatch])


    useEffect(() => {
        fillTable()
    }, [fillTable])

    function onDoubleClickHandler(row: any) {
        setChangeReceivedModalState({row, visible: true})
    }

    return (
        <>
            <BaseTable onDoubleClickRow={onDoubleClickHandler} tableState={tableState}/>

            {changeReceivedModalState.visible && worker
                ? <ChangeReceivedModal modalState={changeReceivedModalState}
                                       worker={worker}
                                       fillTable={fillTable}
                                       onClose={() => setChangeReceivedModalState({
                                           ...changeReceivedModalState,
                                           visible: false
                                       })}
                /> : null}
        </>
    );
};

export default AdminReceivedTable;