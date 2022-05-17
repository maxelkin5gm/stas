import React, {useState} from 'react';
import {Button} from "antd";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import {WorkerService} from "../../../services/WorkerService";
import {StasStateActionTypes} from "../../../store/stasReducer/stasReducer.type";
import InputCustom from "../../Input/InputCustom";
import {AppStateActionTypes} from "../../../store/appReducer/appReducer.type";
import SelectWorkerModal from "../../modals/SelectWorkerModal";
import {Worker} from "../../../store/stasReducer/types/worker.types";
import {TableTypeEnum} from "../../../store/stasReducer/types/table.types";
import {StasStateEnum} from "../../../store/stasReducer/types/state.types";

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

    async function selectByNameHandler() {
        dispatch({type: AppStateActionTypes.SET_LOADING, isLoading: true})
        const workers: Worker[] | null = await WorkerService.findAllByName(nameInputState[0])
        dispatch({type: AppStateActionTypes.SET_LOADING, isLoading: false})

        if (!workers || workers.length === 0) {
            dispatch({
                type: AppStateActionTypes.SET_ERROR_MODAL,
                visible: true,
                title: "Ошибка",
                text: "Сотрудника с таким ФИО не найдено"
            })
            return;
        }

        if (workers.length === 1)
            dispatch({type: StasStateActionTypes.SET_WORKER, worker: workers[0], stasIndex})

        if (workers.length > 1)
            setModalState({visible: true, workers})
    }

    async function selectByNumberHandler() {
        dispatch({type: AppStateActionTypes.SET_LOADING, isLoading: true})
        const worker: Worker | null = await WorkerService.findByPersonnelNumber(numberInputState[0])
        dispatch({type: AppStateActionTypes.SET_LOADING, isLoading: false})

        if (!worker)
            dispatch({
                type: AppStateActionTypes.SET_ERROR_MODAL,
                visible: true,
                title: "Ошибка",
                text: "Сотрудника с таким табельным номером не найдено"
            });
        else
            dispatch({type: StasStateActionTypes.SET_WORKER, worker, stasIndex});
    }

    function resetHandler() {
        dispatch({type: StasStateActionTypes.SET_WORKER, stasIndex, worker: {name: "", personnelNumber: ""}})
    }

    function tableHandler() {
        if (!worker.personnelNumber)
            dispatch({
                type: AppStateActionTypes.SET_ERROR_MODAL, visible: true, title: "Ошибка", text: "Сотрудник не выбран"
            })
        else
            dispatch({
                type: StasStateActionTypes.SET_TABLE,
                stasIndex: stasIndex,
                table: {type: TableTypeEnum.WORKER, query: worker}
            })
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
                <Button htmlType={"submit"} form={"formNumber" + stasIndex} type="primary" size="middle">Выбрать</Button>
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
                    {worker.name
                        ? `${worker.name} (${worker.personnelNumber})`
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