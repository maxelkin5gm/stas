import React, {useState} from 'react';
import {Button, Radio} from "antd";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import InputCustom from "../../Input/InputCustom";
import {StasStateEnum} from "../../../store/stasReducer/types/state";
import {TableTypeEnum} from "../../../store/stasReducer/types/table";
import {UtilsStore} from "../../../store/UtilsStore";
import {CellService} from "../../../services/entities/CellService";
import {StasStateActionTypes} from "../../../store/stasReducer/stasReducer.type";

interface CellPanelProps {
    stasIndex: number,
}

const CellPanel = ({stasIndex}: CellPanelProps) => {
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state);
    const dispatch = useTypeDispatch();

    const cellInputState = useState("");
    const [radioValue, setRadioValue] = useState("ПРАВО");

    function tableHandler() {
        if (Number(cellInputState[0]) < 0) {
            UtilsStore.showError(dispatch, "Номер ячейки не должен быть меньше 0")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        CellService.findOrCreate(stasIndex, radioValue, Number(cellInputState[0]))
            .then((data) => {
                UtilsStore.setTable(dispatch, stasIndex, {
                    type: TableTypeEnum.BY_CELL,
                    query: {side: data.side, cellNumber: data.cellNumber}
                })
                dispatch({
                    type: StasStateActionTypes.SET_SELECTED_CELL,
                    stasIndex,
                    selectedCell: {
                        cellNumber: data.cellNumber,
                        side: data.side,
                        status: data.status
                    }
                })
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
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
        </form>

    );
};

export default CellPanel;