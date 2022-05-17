import React, {useState} from 'react';
import {Button} from "antd";
import InputCustom from "../../Input/InputCustom";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {StasStateEnum} from "../../../store/stasReducer/types/state.types";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {StasStateActionTypes} from "../../../store/stasReducer/stasReducer.type";
import {TableTypeEnum} from "../../../store/stasReducer/types/table.types";

interface StoPanelProps {
    stasIndex: number,
}

const StoPanel = ({stasIndex}: StoPanelProps) => {
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state);
    const dispatch = useTypeDispatch();

    const stoInputState = useState("");

    function tableHandler() {
        dispatch({
            type: StasStateActionTypes.SET_TABLE, stasIndex,
            table: {type: TableTypeEnum.STO, query: {sto: stoInputState[0]}}
        })
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            tableHandler()
        }}>
            <div>
                <InputCustom required valueState={stoInputState} placeholder={"Обозначение СТО"}/>
            </div>

            <div style={{textAlign: "center"}}>
                <Button disabled={stasState !== StasStateEnum.READY} htmlType={"submit"} type="primary"
                        size="middle">Показать</Button>
            </div>
        </form>
    );
};

export default StoPanel;