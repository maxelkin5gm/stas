import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import {StasStateActionTypes} from "../../../store/stasReducer/stasReducer.type";
import SelectWorkerModal from "../../modals/SelectWorkerModal";
import {Worker} from "../../../store/stasReducer/types/worker";
import {TableTypeEnum} from "../../../store/stasReducer/types/table";
import {StasStateEnum} from "../../../store/stasReducer/types/state";
import {UtilsStore} from "../../../store/UtilsStore";
import InputAutocomplete from "../../Input/InputAutocomplete";
import {WorkerService} from "../../../services/WorkerService";

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

    function selectByNumberHandler() {
        UtilsStore.setLoader(dispatch, true)
        WorkerService.findByPersonnelNumber(numberInputState[0])
            .then(worker => dispatch({type: StasStateActionTypes.SET_WORKER, worker, stasIndex}))
            .catch((e) => {
                if (e.response.status === 404)
                    UtilsStore.showError(dispatch, "Сотрудник с таким табельным номером не найден")
                else
                    UtilsStore.showError(dispatch)
            })
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function selectByNameHandler() {
        UtilsStore.setLoader(dispatch, true)
        WorkerService.findAllByName(nameInputState[0])
            .then(workers => {
                if (workers.length > 1)
                    setModalState({visible: true, workers})
                else if (workers.length === 1)
                    dispatch({type: StasStateActionTypes.SET_WORKER, worker: workers[0], stasIndex})
                else
                    UtilsStore.showError(dispatch, "Сотрудник с таким ФИО не найден")
            })
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))
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
                    <InputAutocomplete required placeholder={"Табельный номер"} type={"number"}
                                       valueState={numberInputState} autocompleteType={"personnelNumber"}/>
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
                    <InputAutocomplete required placeholder={"ФИО"} valueState={nameInputState}
                                       autocompleteType={"nameWorker"}/>
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