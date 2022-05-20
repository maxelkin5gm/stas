import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import {StasStateEnum} from "../../../store/stasReducer/types/state";
import {TableTypeEnum} from "../../../store/stasReducer/types/table";
import {UtilsStore} from "../../../store/UtilsStore";
import InputAutocomplete from "../../Input/InputAutocomplete";

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
                <InputAutocomplete required placeholder={"Обозначение СТО"} valueState={stoInputState}
                                   autocompleteType={"nameSto"}/>
            </div>

            <div style={{textAlign: "center"}}>
                <Button disabled={stasState !== StasStateEnum.READY} htmlType={"submit"} type="primary"
                        size="middle">Показать</Button>
            </div>
        </form>
    );
};

export default StoPanel;