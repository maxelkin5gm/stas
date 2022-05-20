import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import InputCustom from "../../Input/InputCustom";
import {SearchAllStateActionTypes} from "../../../store/searchAllReducer/searchAllReducer.type";
import {SearchAllTableTypeEnum} from "../../../store/searchAllReducer/types/table";
import InputAutocomplete from "../../Input/InputAutocomplete";

const RemainderStoPanel = () => {
    const dispatch = useTypeDispatch();

    const stoInputState = useState("");
    const remainderInputState = useState("");

    function tableHandler() {
        dispatch({
            type: SearchAllStateActionTypes.SET_SEARCH_ALL_TABLE,
            table: {
                type: SearchAllTableTypeEnum.BY_STO_AND_REMAINDER,
                query: {
                    nameSto: stoInputState[0],
                    remainder: Number(remainderInputState[0])
                }
            }
        })
    }

    return (
        <>
            <div>
                <InputAutocomplete required valueState={stoInputState} placeholder={"Обозначение СТО"}
                                   autocompleteType={"nameSto"}/>
            </div>

            <div>
                <InputCustom type={"number"} valueState={remainderInputState} placeholder={"Остаток"}/>
            </div>

            <div>
                <Button type="primary" size="large" onClick={tableHandler}>Показать</Button>
            </div>
        </>
    );
};

export default RemainderStoPanel;