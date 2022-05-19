import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import {StasStateActionTypes} from "../../../store/stasReducer/stasReducer.type";
import InputCustom from "../../Input/InputCustom";
import SelectWorkerModal from "../../modals/SelectWorkerModal";
import {Worker} from "../../../store/stasReducer/types/worker";
import {TableTypeEnum} from "../../../store/stasReducer/types/table";
import {StasStateEnum} from "../../../store/stasReducer/types/state";
import {WorkerPanelService} from "../../../services/panels/WorkerPanelService";
import {UtilsStore} from "../../../store/UtilsStore";

interface WorkerPanelProps {
    stasIndex: number
}

const WorkerPanel = ({stasIndex}: WorkerPanelProps) => {
    const worker = useTypeSelector(state => state.stasList[stasIndex].worker);
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state);
    const dispatch = useTypeDispatch();

    const [modalState, setModalState] = useState({visible: false, workers: [] as Worker[]});
    const numberInputState = useState("");
    const nameInputState = useState("");

    const workerPanelService = new WorkerPanelService(dispatch, stasIndex);


    function selectByNumberHandler() {
        workerPanelService.selectByNumberHandler(numberInputState[0])
    }

    function selectByNameHandler() {
        workerPanelService.selectByNameHandler(nameInputState[0], setModalState);
    }

    async function resetHandler() {
        dispatch({type: StasStateActionTypes.SET_WORKER, stasIndex, worker: {nameWorker: "", personnelNumber: ""}})
    }

    function tableHandler() {
        if (worker.personnelNumber) {
            UtilsStore.setTable(dispatch, stasIndex, {type: TableTypeEnum.BY_WORKER, query: worker})
        } else {
            UtilsStore.showError(dispatch, "Сотрудник не выбран")
        }
    }

    return (
        <>
            <div>
                <form id={"formNumber" + stasIndex} onSubmit={e => {
                    e.preventDefault();
                    selectByNumberHandler()
                }}>
                    <InputCustom required placeholder={"Табельный номер"} type={"number"}
                                 valueState={numberInputState}/>
                </form>
            </div>

            <div>
                <Button htmlType={"submit"} form={"formNumber" + stasIndex} type="primary"
                        size="middle">Выбрать</Button>
            </div>

            <div style={{gridRow: "span 2"}}>
                <Button style={{width: "100%"}} type="primary" size="middle" onClick={resetHandler}>Сбросить</Button>
            </div>

            <div>
                <form id={"formName" + stasIndex} onSubmit={e => {
                    e.preventDefault();
                    selectByNameHandler()
                }}>
                    <InputCustom required placeholder={"ФИО"} valueState={nameInputState}/>
                </form>
            </div>

            <div>
                <Button htmlType={"submit"} form={"formName" + stasIndex} type="primary" size="middle">Выбрать</Button>
            </div>

            <div style={{textAlign: "center"}}>
                <span style={{fontSize: 16, fontWeight: "bold"}}>
                    {worker.nameWorker
                        ? `${worker.nameWorker} (${worker.personnelNumber})`
                        : "Не выбрано"}
                </span>
            </div>

            <div style={{gridColumn: "span 2"}}>
                <Button disabled={stasState !== StasStateEnum.READY} style={{width: "100%"}} type="primary"
                        size="middle" onClick={tableHandler}>Показать выданные СТО</Button>
            </div>

            <SelectWorkerModal modalState={modalState} stasIndex={stasIndex}
                               onClose={() => setModalState({...modalState, visible: false})}
            />
        </>
    );
};

export default WorkerPanel;