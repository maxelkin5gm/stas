import React, {useState} from 'react';
import BaseModal from "../BaseModal";
import InputCustom from "../../Input/InputCustom";
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {UtilsStore} from "../../../store/UtilsStore";
import {WorkerService} from "../../../services/entities/WorkerService";

interface CreateWorkerModalProps {
    onClose: () => void
}

const CreateWorkerModal = ({onClose}: CreateWorkerModalProps) => {
    const dispatch = useTypeDispatch();
    const nameWorkerInputState = useState("")
    const personnelNumberInputState = useState("")

    function saveHandler() {
        if (!nameWorkerInputState[0] || !personnelNumberInputState[0]) {
            UtilsStore.showError(dispatch, "Не все поля заполнены")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        WorkerService.create(nameWorkerInputState[0], personnelNumberInputState[0])
            .then(() => onClose())
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    return (
        <BaseModal onClose={onClose}>

            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h3>Введите данные нового сотрудника:</h3>
                <InputCustom style={{width: 250, margin: 10}} valueState={nameWorkerInputState}
                             placeholder={"Введите ФИО"}/>
                <InputCustom style={{width: 250, margin: 20}} valueState={personnelNumberInputState}
                             placeholder={"Введите табельный номер"}/>
            </div>
            <Button style={{margin: 10}} type="primary" size="large" onClick={saveHandler}>Сохранить</Button>
        </BaseModal>
    );
};

export default CreateWorkerModal;