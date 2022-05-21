import React, {useEffect, useState} from 'react';
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {UtilsStore} from "../../store/UtilsStore";
import BaseTable from "./BaseTable/BaseTable";
import {receivedStoColumns} from "./columns/searchAll/receivedStoColumns";
import {TableService} from "../../services/TableService";
import {Worker} from "../../store/stasReducer/types/worker";
import ChangeReceivedModal from "../modals/admin/ChangeReceivedModal";

interface AdminReceivedTableProps {
    worker: Worker
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
    const personnelNumber = worker.personnelNumber;

    useEffect(() => {
        if (!personnelNumber) return

        UtilsStore.setLoader(dispatch, true)
        TableService.findAllByWorker(personnelNumber)
            .then(data => setTableState({
                columns: receivedStoColumns,
                data
            }))
            .catch((e: Error) => UtilsStore.showError(dispatch, e.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))

    }, [personnelNumber, dispatch])

    function onDoubleClickHandler(row: any) {
        setChangeReceivedModalState({row, visible: true})
    }

    return (
        <>
            <BaseTable onDoubleClickRow={onDoubleClickHandler} tableState={tableState}/>

            {changeReceivedModalState.visible
                ? <ChangeReceivedModal modalState={changeReceivedModalState}
                                       worker={worker}
                                       onClose={() => setChangeReceivedModalState({
                                           ...changeReceivedModalState,
                                           visible: false
                                       })}
                /> : null}
        </>
    );
};

export default AdminReceivedTable;