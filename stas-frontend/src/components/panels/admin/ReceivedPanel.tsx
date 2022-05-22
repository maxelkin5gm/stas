import React, {useState} from 'react';
import AdminReceivedTable from "../../tables/AdminReceivedTable";
import InputAutocomplete from "../../Input/InputAutocomplete";
import {Button} from "antd";
import {Worker} from "../../../store/stasReducer/types/worker";
import {WorkerService} from "../../../services/WorkerService";
import {UtilsStore} from "../../../store/UtilsStore";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

const ReceivedPanel = () => {
    const dispatch = useTypeDispatch();

    const personnelNumberInputState = useState("")
    const [worker, setWorker] = useState({} as Worker)

    async function showHandler() {
        try {
            const worker = await WorkerService.findByPersonnelNumber(personnelNumberInputState[0])
            setWorker(worker)
        } catch (e: any) {
            if (e.response.status === 404)
                UtilsStore.showError(dispatch, "Сотрудник с таким табельным номером не найден")
            else
                UtilsStore.showError(dispatch)
        }
    }

    function deleteWorkerHandler() {
        if (!worker.personnelNumber) {
            UtilsStore.showError(dispatch, "Сотрудник не выбран")
            return
        }
        UtilsStore.showError(dispatch, "Данная функция недоступна")
    }

    function changeWorkerHandler() {
        if (!worker.personnelNumber) {
            UtilsStore.showError(dispatch, "Сотрудник не выбран")
            return
        }
        UtilsStore.showError(dispatch, "Данная функция недоступна")
    }

    function createWorkerHandler() {
        UtilsStore.showError(dispatch, "Данная функция недоступна")
    }

    return (
        <div style={{margin: 10}}>
            <div style={{display: "flex", alignItems: "center", padding: 5}}>
                <InputAutocomplete valueState={personnelNumberInputState} autocompleteType={"personnelNumber"}
                                   placeholder={"Табельный номер"}/>
                <Button style={{margin: "0 10px"}} type="primary" size="middle" onClick={showHandler}>Показать</Button>
                <Button type="primary" size="middle" onClick={createWorkerHandler}>Добавить сотрудника</Button>

            </div>

            {worker.personnelNumber && worker.nameWorker
                ? <div style={{display: "flex", alignItems: "center", padding: 5}}>
                <span style={{fontSize: 16}}>
                    Выбран: <span style={{fontWeight: "bold"}}>{worker.nameWorker}({worker.personnelNumber})</span>
                </span>
                    <Button style={{margin: "0 10px"}} type="primary" size="middle"
                            onClick={deleteWorkerHandler}>Изменить</Button>
                    <Button type="primary" size="middle" onClick={changeWorkerHandler}>Удалить</Button>
                </div>
                : null}

            <div style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", marginTop: 10}}>
                <AdminReceivedTable worker={worker}/>
            </div>
        </div>
    );
};

export default ReceivedPanel;