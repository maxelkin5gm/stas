import React, {useState} from 'react';
import BaseModal from "../BaseModal";
import InputCustom from "../../Input/InputCustom";
import {Button} from "antd";
import {AdminService} from "../../../services/AdminService";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {UtilsStore} from "../../../store/UtilsStore";
import {Worker} from "../../../store/stasReducer/types/worker";

interface ChangeWorkerModalProps {
    onClose: () => void
    worker: Worker
    setWorker: React.Dispatch<React.SetStateAction<Worker | null>>
}

const ChangeWorkerModal = ({onClose, worker, setWorker}: ChangeWorkerModalProps) => {
    const dispatch = useTypeDispatch();
    const nameWorkerInputState = useState(worker.nameWorker)
    const personnelNumberInputState = useState(worker.personnelNumber)

    function saveHandler() {
        if (!nameWorkerInputState[0] || !personnelNumberInputState[0]) {
            UtilsStore.showError(dispatch, "Не все поля заполнены")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        AdminService.updateWorker(worker.personnelNumber, nameWorkerInputState[0], personnelNumberInputState[0])
            .then(() => {
                setWorker({
                    nameWorker: nameWorkerInputState[0],
                    personnelNumber: personnelNumberInputState[0]
                })
                onClose()
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    return (
        <BaseModal onClose={onClose}>

            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h3>Введите новые данные для сотрудника {worker.nameWorker} ({worker.personnelNumber}):</h3>
                <InputCustom style={{width: 250, margin: 10}} valueState={nameWorkerInputState}
                             placeholder={"Введите ФИО"}/>
                <InputCustom style={{width: 250, margin: 20}} valueState={personnelNumberInputState}
                             placeholder={"Введите табельный номер"}/>
            </div>
            <Button style={{margin: 10}} type="primary" size="large" onClick={saveHandler}>Сохранить</Button>
        </BaseModal>
    );
};

export default ChangeWorkerModal;