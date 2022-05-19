import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import InputCustom from "../../Input/InputCustom";
import {StasStateEnum} from "../../../store/stasReducer/types/state.types";
import {TableTypeEnum} from "../../../store/stasReducer/types/table.types";
import {UtilsStore} from "../../../store/UtilsStore";

interface StoPanelProps {
    stasIndex: number,
}

const StoPanel = ({stasIndex}: StoPanelProps) => {
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state);
    const dispatch = useTypeDispatch();

    const stoInputState = useState("");

    function tableHandler() {
        UtilsStore.setTable(dispatch, stasIndex, {
            type: TableTypeEnum.BY_STO,
            query: {nameSto: stoInputState[0]}
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