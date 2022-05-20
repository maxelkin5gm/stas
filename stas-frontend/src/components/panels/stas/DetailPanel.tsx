import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {useTypeSelector} from "../../../hooks/useTypeSelector";

import {TableTypeEnum} from "../../../store/stasReducer/types/table";
import {StasStateEnum} from "../../../store/stasReducer/types/state";
import {UtilsStore} from "../../../store/UtilsStore";
import InputAutocomplete from "../../Input/InputAutocomplete";

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
            type: TableTypeEnum.BY_DETAIL,
            query: {detail: detailInputState[0], operationNumber: numberInputState[0]}
        })
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            tableHandler()
        }}>
            <div>
                <InputAutocomplete required valueState={detailInputState} placeholder={"Обозначение детали"}
                                   autocompleteType={"nameDetail"}/>
            </div>

            <div>
                <InputAutocomplete required valueState={numberInputState} placeholder={"Номер операции"}
                                   autocompleteType={"personnelNumber"}/>
            </div>

            <div style={{textAlign: "center"}}>
                <Button disabled={stasState !== StasStateEnum.READY} htmlType="submit" type="primary"
                        size="middle">Показать</Button>
            </div>
        </form>
    );
};

export default DetailPanel;