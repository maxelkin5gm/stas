import BaseTable from "./BaseTable/BaseTable";
import {takeCartColumns} from "./columns/stas/takeCartColumns";
import {UtilsStore} from "../../store/UtilsStore";
import {CartService} from "../../services/CartService";

import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import React, {useEffect, useState} from 'react';


interface TakeCartTableProps {
    stasIndex: number,
    selectedRowState: [any, React.Dispatch<any>]
}

const TakeCartTable = ({stasIndex, selectedRowState}: TakeCartTableProps) => {
    const selectedCell = useTypeSelector(state => state.stasList[stasIndex].selectedCell);
    const worker = useTypeSelector(state => state.stasList[stasIndex].worker);
    const dispatch = useTypeDispatch();


    const [tableState, setTableState] = useState({
        columns: takeCartColumns,
        data: [] as any[]
    })

    function clickRowHandler(row: any) {
        selectedRowState[1](row);
    }

    useEffect(() => {
        UtilsStore.setLoader(dispatch, true)
        CartService.findAllMatchStoByCellAndReceivedSto(stasIndex, selectedCell!, worker)
            .then(data => {
                if (data.length === 0) UtilsStore.showError(dispatch,
                    "У данного сотрудника нет СТО, которые можно положить в эту ячейку")
                setTableState({
                    columns: takeCartColumns,
                    data: data
                })
            })
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [selectedCell, worker, stasIndex, dispatch])


    return (
        <BaseTable onClickRow={clickRowHandler} tableState={tableState}/>
    );
};

export default TakeCartTable;