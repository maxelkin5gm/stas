import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {SearchAllTableTypeEnum} from "../../../store/searchAllReducer/types/table";
import {SearchAllStateActionTypes} from "../../../store/searchAllReducer/searchAllReducer.type";
import InputAutocomplete from "../../Input/InputAutocomplete";

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
                <InputAutocomplete type={"number"} valueState={numberInputState} placeholder={"Табельный номер"}
                                   autocompleteType={"personnelNumber"}/>
            </div>

            <div>
                <Button type="primary" size="large" onClick={tableHandler}>Показать выданные СТО</Button>
            </div>
        </>
    );
};

export default WorkerPanel;