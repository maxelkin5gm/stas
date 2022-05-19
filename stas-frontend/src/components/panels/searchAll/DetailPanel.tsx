import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import {SearchAllStateActionTypes} from "../../../store/searchAllReducer/searchAllReducer.type";
import {SearchAllTableTypeEnum} from "../../../store/searchAllReducer/types/table";
import InputCustom from "../../Input/InputCustom";


const DetailPanel = () => {
    const dispatch = useTypeDispatch();

    const detailInputState = useState("");
    const numberInputState = useState("");

    function tableHandler() {
        dispatch({
            type: SearchAllStateActionTypes.SET_SEARCH_ALL_TABLE,
            table: {
                type: SearchAllTableTypeEnum.BY_DETAIL,
                query: {
                    detail: detailInputState[0],
                    operationNumber: numberInputState[0]
                }
            }
        })
    }

    return (
        <>
            <div>
                <InputCustom valueState={detailInputState} placeholder={"Обозначение детали"}/>
            </div>

            <div>
                <InputCustom valueState={numberInputState} placeholder={"Номер операции"}/>
            </div>

            <div>
                <Button type="primary" size="large" onClick={tableHandler}>Показать</Button>
            </div>
        </>
    );
};

export default DetailPanel;