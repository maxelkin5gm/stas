import React, {useState} from 'react';
import {Button, Radio} from "antd";

import AdminCellTable from "../../tables/AdminCellTable";
import InputCustom from "../../Input/InputCustom";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import InputAutocomplete from "../../Input/InputAutocomplete";
import InputNumber from "../../Input/InputNumber";
import {UtilsStore} from "../../../store/UtilsStore";

export type Cell = { stasIndex: number, side: string, cellNumber: number }

const CellPanel = () => {
    const dispatch = useTypeDispatch();

    const [cellState, setCellState] = useState(null as Cell | null)
    const [sideRadioValue, setSideRadioValue] = useState("ПРАВО");
    const [stasRadioValue, setStasRadioValue] = useState("0");
    const cellNumberInputState = useState("");
    const nameStoInputState = useState("");
    const remainderInputState = useState(1);


    function showHandler() {
        if (!sideRadioValue || !stasRadioValue || !cellNumberInputState[0]) {
            UtilsStore.showError(dispatch, "Не все поля заполнены для поиска")
            return
        }
        if (Number(cellNumberInputState[0]) <= 0) {
            UtilsStore.showError(dispatch, "Некорректно введен номер ячейки")
            return
        }

        setCellState({
            stasIndex: Number(stasRadioValue),
            side: sideRadioValue,
            cellNumber: Number(cellNumberInputState[0])
        })
    }

    return (
        <div style={{margin: 10}}>


            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center", padding: 5}}>
                    <Radio.Group size="small" defaultValue="0" buttonStyle="solid" value={stasRadioValue}
                                 onChange={(e => setStasRadioValue(e.target.value))}>
                        <Radio.Button value="0">СТАС 1</Radio.Button>
                        <Radio.Button value="1">СТАС 2</Radio.Button>
                        <Radio.Button value="2">СТАС 3</Radio.Button>
                    </Radio.Group>

                    <Radio.Group style={{margin: "0 20px"}} size="small" defaultValue="ПРАВО" buttonStyle="solid"
                                 value={sideRadioValue}
                                 onChange={(e => setSideRadioValue(e.target.value))}>
                        <Radio.Button value="ПРАВО">ПРАВО</Radio.Button>
                        <Radio.Button value="ЛЕВО">ЛЕВО</Radio.Button>
                    </Radio.Group>

                    <InputCustom style={{width: 100}} type={"number"} valueState={cellNumberInputState}
                                 placeholder={"№ ячейки"}/>

                    <Button style={{margin: "0 20px"}} type="primary" size="middle"
                            onClick={showHandler}>Выбрать</Button>

                </div>
            </div>

            {cellState
                ? <div style={{display: "flex", margin: "10px 5px", alignItems: "center"}}>
                    <div style={{marginRight: 10}}>

                        <span style={{border: "1px solid black", padding: 5, fontSize: 16}}>
                            Выбрано: <span style={{fontWeight: "bold"}}>
                            СТАС: {cellState.stasIndex + 1} | Ячейка: {cellState.cellNumber} | Сторона: {cellState.side}
                        </span>
                        </span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <InputAutocomplete valueState={nameStoInputState} autocompleteType={"nameSto"}
                                           placeholder="Обозначение СТО"/>
                        <InputNumber style={{fontSize: 15, width: 90, margin: "0 10px"}}
                                     valueState={remainderInputState}/>
                        <Button type="primary" size="middle">Добавить в ячейку</Button>
                    </div>
                </div>
                : null}

            <div style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", marginTop: 20}}>
                <AdminCellTable cell={cellState}/>
            </div>

        </div>
    );
};

export default CellPanel;