import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {useTypeSelector} from "../../../hooks/useTypeSelector";

import InputCustom from "../../Input/InputCustom";
import {TableTypeEnum} from "../../../store/stasReducer/types/table.types";
import {StasStateEnum} from "../../../store/stasReducer/types/state.types";
import {UtilsStore} from "../../../store/UtilsStore";

interface DetailPanelProps {
    stasIndex: number,
}

const DetailPanel = ({stasIndex}: DetailPanelProps) => {
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state);
    const dispatch = useTypeDispatch();

    const detailInputState = useState("");
    const numberInputState = useState("");

    function tableHandler() {
        UtilsStore.setTable(dispatch, stasIndex, {
            type: TableTypeEnum.DETAIL,
            query: {detail: detailInputState[0], operationNumber: numberInputState[0]}
        })
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            tableHandler()
        }}>
            <div>
                <InputCustom required valueState={detailInputState} placeholder={"Обозначение детали"}/>
            </div>

            <div>
                <InputCustom required valueState={numberInputState} placeholder={"Номер операции"}/>
            </div>


            <div style={{textAlign: "center"}}>
                <Button disabled={stasState !== StasStateEnum.READY} htmlType={"submit"} type="primary"
                        size="middle">Показать</Button>
            </div>
        </form>
    );
};

export default DetailPanel;