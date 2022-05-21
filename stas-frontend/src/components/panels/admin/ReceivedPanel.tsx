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
        } catch (e) {
            UtilsStore.showError(dispatch, "Сотрудник не найдет")
            return
        }
    }

    function deleteHandler() {
        if (!worker.personnelNumber) {
            UtilsStore.showError(dispatch, "Сотрудник выбран")
            return
        }
        UtilsStore.showError(dispatch, "Данная функция недоступна")
    }


    return (
        <div style={{margin: 10}}>
            <div style={{display: "flex", alignItems: "center", padding: 5}}>
                <InputAutocomplete valueState={personnelNumberInputState} autocompleteType={"personnelNumber"}
                                   placeholder={"Табельный номер"}/>
                <Button style={{margin: "0 10px"}} type="primary" size="middle" onClick={showHandler}>Показать</Button>
                <Button disabled type="primary" size="middle">Добавить сотрудника</Button>

            </div>

            <div style={{display: "flex", alignItems: "center", padding: 5}}>
                <span style={{fontSize: 16}}>
                    Выбран: <span style={{fontWeight: "bold"}}>{worker.nameWorker}({worker.personnelNumber})</span>
                </span>
                <Button disabled={!worker.personnelNumber} style={{margin: "0 10px"}} type="primary" size="middle"
                        onClick={deleteHandler}>Удалить</Button>
                <Button disabled type="primary" size="middle">Изменить</Button>
            </div>

            <div>
                <AdminReceivedTable worker={worker}/>
            </div>
        </div>
    );
};

export default ReceivedPanel;