import React, {useState} from 'react';
import InputCustom from "../../Input/InputCustom";
import {Button} from "antd";
import {SearchAllStateActionTypes} from "../../../store/searchAllReducer/searchAllReducer.type";
import {SearchAllTableTypeEnum} from "../../../store/searchAllReducer/types/table";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

const StoPanel = () => {
    const dispatch = useTypeDispatch();

    const stoInputState = useState("");

    function cellByStoHandler() {
        dispatch({
            type: SearchAllStateActionTypes.SET_SEARCH_ALL_TABLE,
            table: {
                type: SearchAllTableTypeEnum.CELL_BY_STO,
                query: {
                    nameSto: stoInputState[0]
                }
            }
        })
    }

    function receivedByStoHandler() {
        dispatch({
            type: SearchAllStateActionTypes.SET_SEARCH_ALL_TABLE,
            table: {
                type: SearchAllTableTypeEnum.RECEIVED_BY_STO,
                query: {
                    nameSto: stoInputState[0]
                }
            }
        })
    }

    return (
        <>
            <div>
                <InputCustom valueState={stoInputState} placeholder={"Обозначение СТО"}/>
            </div>

            <div>
                <Button type="primary" size="large" onClick={cellByStoHandler}>Показать ячейки</Button>
            </div>

            <div>
                <Button type="primary" size="large" onClick={receivedByStoHandler}>Показать кому выдано</Button>
            </div>
        </>
    );
};

export default StoPanel;