import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";

import BaseTable from "./BaseTable/BaseTable";
import {fillSearchAllTable} from "./utils/fillSearchAllTable";
import {UtilsStore} from "../../store/UtilsStore";


const SearchAllTable = () => {
    const tableQuery = useTypeSelector(state => state.searchAll.table);
    const dispatch = useTypeDispatch();

    const [tableState, setTableState] = useState({
        columns: [] as any[],
        data: [] as any[]
    })

    useEffect(() => {
        UtilsStore.setLoader(dispatch, true)
        fillSearchAllTable(tableQuery, setTableState)
            .catch((e: Error) => UtilsStore.showError(dispatch, e.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [tableQuery, dispatch])


    return (
        <>
            <BaseTable tableState={tableState}/>
        </>
    );
}

export default SearchAllTable;