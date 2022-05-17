import React, {useState} from 'react';
import BaseTable from "./BaseTable/BaseTable";


const SearchAllTable = () => {

    const [tableState, setTableState] = useState({
        columns: [] as any[],
        data: [] as any[]
    })

    // useEffect(() => {
    //     fillSearchAllTable(tableQuery, stasIndex, setTableState)
    //         .catch((e: Error) => dispatch({
    //             type: AppStateActionTypes.SET_ERROR_MODAL,
    //             visible: true,
    //             title: "Ошибка",
    //             text: e.message
    //         }))
    // }, [tableQuery, stasIndex, dispatch])

    return (
        <BaseTable tableState={tableState}/>
    );
}

export default SearchAllTable;