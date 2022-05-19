import React, {useState} from 'react';
import InputCustom from "../../Input/InputCustom";
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {SearchAllTableTypeEnum} from "../../../store/searchAllReducer/types/table.types";
import {SearchAllStateActionTypes} from "../../../store/searchAllReducer/searchAllReducer.type";

const WorkerPanel = () => {
    const dispatch = useTypeDispatch();

    const numberInputState = useState("")

    function tableHandler() {
        dispatch({
            type: SearchAllStateActionTypes.SET_SEARCH_ALL_TABLE,
            table: {
                type: SearchAllTableTypeEnum.BY_WORKER,
                query: {
                    personnelNumber: numberInputState[0]
                }
            }
        })
    }

    return (
        <>
            <div>
                <InputCustom type={"number"} valueState={numberInputState} placeholder={"Табельный номер"}/>
            </div>

            <div>
                <Button type="primary" size="large" onClick={tableHandler}>Показать выданные СТО</Button>
            </div>
        </>
    );
};

export default WorkerPanel;