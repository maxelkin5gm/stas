import React, {useState} from 'react';
import {Button} from "antd";

import InputAutocomplete from "../../Input/InputAutocomplete";
import AdminCellTable from "../../tables/AdminCellTable";
import {CellEntity} from "../../../types/models";

const CellPanel = () => {

    const [cellState, setCellState] = useState(null as CellEntity | null)

    return (
        <div style={{margin: 10}}>

            {/*<div style={{display: "flex", alignItems: "center", padding: 5}}>*/}
            {/*    <InputAutocomplete valueState={personnelNumberInputState} autocompleteType={"personnelNumber"}*/}
            {/*                       placeholder={"Табельный номер"}/>*/}
            {/*    <Button style={{margin: "0 10px"}} type="primary" size="middle" onClick={showHandler}>Показать</Button>*/}
            {/*    <Button disabled type="primary" size="middle">Добавить сотрудника</Button>*/}
            {/*</div>*/}

            {/*<div style={{display: "flex", alignItems: "center", padding: 5}}>*/}
            {/*    <span style={{fontSize: 16}}>*/}
            {/*        Выбран: <span style={{fontWeight: "bold"}}>{worker.nameWorker}({worker.personnelNumber})</span>*/}
            {/*    </span>*/}
            {/*    <Button disabled={!worker.personnelNumber} style={{margin: "0 10px"}} type="primary" size="middle"*/}
            {/*            onClick={deleteHandler}>Удалить</Button>*/}
            {/*    <Button disabled type="primary" size="middle">Изменить</Button>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <AdminCellTable />*/}
            {/*</div>*/}

        </div>
    );
};

export default CellPanel;