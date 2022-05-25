import React, {useState} from 'react';
import {Button, Radio} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";


import AdminCellTable from "../../tables/AdminCellTable";
import InputCustom from "../../Input/InputCustom";
import InputAutocomplete from "../../Input/InputAutocomplete";
import InputNumber from "../../Input/InputNumber";
import {UtilsStore} from "../../../store/UtilsStore";
import {AdminService} from "../../../services/AdminService";
import {CellService} from "../../../services/entities/CellService";
import {CellEntity} from "../../../types/models";
import ChangeCellModal from "../../modals/admin/ChangeCellModal";

const ChangeCellPanel = () => {
    const dispatch = useTypeDispatch();

    const [cellEntityState, setCellEntityState] = useState(null as CellEntity | null)
    const [changeCellModal, setChangeCellModal] = useState({visible: false})

    // forms
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
        UtilsStore.setLoader(dispatch, true)
        CellService.findOrCreate(Number(stasRadioValue), sideRadioValue, Number(cellNumberInputState[0]))
            .then((data) => setCellEntityState({...data, stasIndex: data.stasIndex - 1}))
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function addHandler() {
        if (!nameStoInputState[0] || remainderInputState[0] < 0) {
            UtilsStore.showError(dispatch, "Введите корректные данные");
            return
        }
        if (!cellEntityState) {
            UtilsStore.showError(dispatch, "Ячейка не выбрана");
            return
        }
        UtilsStore.setLoader(dispatch, true)
        AdminService.addStoInCell(cellEntityState, nameStoInputState[0], remainderInputState[0])
            .then(() => setCellEntityState({...cellEntityState}))
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function changeModalHandler() {
        setChangeCellModal({visible: true})
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

            {cellEntityState
                ? <>
                    <div style={{display: "flex", margin: "10px 5px", alignItems: "center"}}>

                        <div style={{marginRight: 10}}>
                        <span style={{border: "1px solid black", padding: 5, fontSize: 16}}>
                            Выбрано: <span style={{fontWeight: "bold"}}>
                            СТАС: {cellEntityState.stasIndex + 1} | Ячейка: {cellEntityState.cellNumber}
                            &nbsp;| Сторона: {cellEntityState.side} | Состояние: {cellEntityState.status}
                            </span>
                        </span>
                        </div>

                        <div style={{display: "flex", alignItems: "center"}}>
                            <Button style={{margin: "0 20px 0 5px"}} type="primary" onClick={changeModalHandler}
                                    size="middle">Изменить ячейку</Button>
                        </div>

                    </div>

                    <div style={{display: "flex", alignItems: "center", marginLeft: 7}}>
                        <InputAutocomplete valueState={nameStoInputState} autocompleteType={"nameSto"}
                                           placeholder="Обозначение СТО"/>
                        <InputNumber style={{fontSize: 15, width: 90, margin: "0 10px"}}
                                     valueState={remainderInputState}/>
                        <Button type="primary" size="middle" onClick={addHandler}>Добавить в ячейку</Button>
                    </div>
                </>
                : null}

            <div style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", marginTop: 20}}>
                <AdminCellTable cellEntityState={cellEntityState}/>
            </div>

            {changeCellModal.visible && cellEntityState
                ? <ChangeCellModal cellEntity={cellEntityState}
                                   onClose={() => setChangeCellModal({visible: false})}
                                   setCellEntityState={setCellEntityState}/>
                : null}

        </div>
    );
};

export default ChangeCellPanel;