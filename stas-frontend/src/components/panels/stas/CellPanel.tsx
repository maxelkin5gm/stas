import React, {useState} from 'react';
import {Button, Radio} from "antd";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import InputCustom from "../../Input/InputCustom";
import {StasStateEnum} from "../../../store/stasReducer/types/state";
import {TableTypeEnum} from "../../../store/stasReducer/types/table";
import {UtilsStore} from "../../../store/UtilsStore";

interface CellPanelProps {
    stasIndex: number,
}

const CellPanel = ({stasIndex}: CellPanelProps) => {
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state);
    const dispatch = useTypeDispatch();

    const cellInputState = useState("");
    const [radioValue, setRadioValue] = useState("ПРАВО");

    function tableHandler() {
        UtilsStore.setTable(dispatch, stasIndex, {
            type: TableTypeEnum.BY_CELL,
            query: {side: radioValue, cellNumber: Number(cellInputState[0])}
        })
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            tableHandler()
        }}>
            <div>
                <InputCustom required type={"number"} valueState={cellInputState} placeholder={"№ ячейки"}/>
            </div>

            <div>
                <Radio.Group size="small" defaultValue="ПРАВО" buttonStyle="solid" value={radioValue}
                             onChange={(e => setRadioValue(e.target.value))}>
                    <Radio.Button value="ПРАВО">ПРАВО</Radio.Button>
                    <Radio.Button value="ЛЕВО">ЛЕВО</Radio.Button>
                </Radio.Group>
            </div>

            <div style={{gridColumn: "span 2"}}>
                <Button disabled={stasState !== StasStateEnum.READY} htmlType={"submit"} type="primary"
                        size="middle">Показать</Button>
            </div>

            {/*<div style={{gridColumn: "span 2"}}>*/}
            {/*    <Button disabled={stasState !== StasStateEnum.WAIT} type="primary" size="middle">Показать привезенную</Button>*/}
            {/*</div>*/}
        </form>

    );
};

export default CellPanel;