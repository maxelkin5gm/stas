import React, {useState} from 'react';
import AdminReceivedTable from "../../tables/AdminReceivedTable";
import InputAutocomplete from "../../Input/InputAutocomplete";
import {Button} from "antd";
import {Worker} from "../../../store/stasReducer/types/worker";
import {WorkerService} from "../../../services/entities/WorkerService";
import {UtilsStore} from "../../../store/UtilsStore";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import CreateWorkerModal from "../../modals/admin/CreateWorkerModal";
import ChangeWorkerModal from "../../modals/admin/ChangeWorkerModal";

const ReceivedPanel = () => {
    const dispatch = useTypeDispatch();

    const personnelNumberInputState = useState("")
    const [worker, setWorker] = useState(null as Worker | null)
    const [createWorkerModalState, setCreateWorkerModalState] = useState({
        visible: false,
    })
    const [changeWorkerModalState, setChangeWorkerModalState] = useState({
        visible: false,
    })

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
        if (!worker) {
            UtilsStore.showError(dispatch, "Сотрудник не выбран")
            return
        }
        WorkerService.deleteBy(worker.personnelNumber)
            .then(() => {
                setWorker(null)
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
    }

    function changeWorkerHandler() {
        if (!worker) {
            UtilsStore.showError(dispatch, "Сотрудник не выбран")
            return
        }
        setChangeWorkerModalState({visible: true});
    }

    function createWorkerHandler() {
        setCreateWorkerModalState({visible: true});
    }

    return (
        <div style={{margin: 10}}>
            <div style={{display: "flex", alignItems: "center", padding: 5}}>
                <InputAutocomplete valueState={personnelNumberInputState} autocompleteType={"personnelNumber"}
                                   placeholder={"Табельный номер"}/>
                <Button style={{margin: "0 10px"}} type="primary" size="middle" onClick={showHandler}>Показать</Button>
                <Button type="primary" size="middle" onClick={createWorkerHandler}>Добавить сотрудника</Button>

            </div>

            {worker
                ? <div style={{display: "flex", alignItems: "center", padding: 5}}>
                <span style={{fontSize: 16, border: "1px solid black", padding: 5}}>
                    Выбран: <span style={{fontWeight: "bold"}}>{worker.nameWorker} ({worker.personnelNumber})</span>
                </span>
                    <Button style={{margin: "0 10px"}} type="primary" size="middle"
                            onClick={changeWorkerHandler}>Изменить</Button>
                    <Button type="primary" size="middle" onClick={deleteWorkerHandler}>Удалить</Button>
                </div>
                : null}

            <div style={{boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", marginTop: 10}}>
                <AdminReceivedTable worker={worker}/>
            </div>


            {createWorkerModalState.visible
                ? <CreateWorkerModal onClose={() => setCreateWorkerModalState({visible: false})}/>
                : null}

            {changeWorkerModalState.visible && worker
                ? <ChangeWorkerModal onClose={() => setChangeWorkerModalState({visible: false})} worker={worker} setWorker={setWorker}/>
                : null}
        </div>
    );
};

export default ReceivedPanel;