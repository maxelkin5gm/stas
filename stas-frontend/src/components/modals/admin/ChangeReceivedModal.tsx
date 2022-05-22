import React, {useState} from 'react';
import BaseModal from "../BaseModal";
import {Worker} from "../../../store/stasReducer/types/worker";
import InputNumber from "../../Input/InputNumber";
import {Button} from "antd";
import {AdminService} from "../../../services/AdminService";
import {UtilsStore} from "../../../store/UtilsStore";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

interface ChangeReceivedModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    worker: Worker
    onClose: () => void
    fillTable: () => void
}

const ChangeReceivedModal = ({onClose, modalState, worker, fillTable}: ChangeReceivedModalProps) => {
    const dispatch = useTypeDispatch();

    const inputAmountState = useState(modalState.row.amount)

    function saveHandler() {
        if (!worker.personnelNumber) {
            UtilsStore.showError(dispatch, "Сотрудник не выбран")
            return
        }
        if (!inputAmountState[0] || inputAmountState[0] < 0) {
            UtilsStore.showError(dispatch, "Неверно указано количество")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        AdminService.updateAmountReceivedSto(modalState.row, worker.personnelNumber, inputAmountState[0])
            .then(() => {
                fillTable();
                onClose()
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function deleteHandler() {
        if (!worker.personnelNumber) {
            UtilsStore.showError(dispatch, "Сотрудник не выбран")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        AdminService.deleteReceivedSto(modalState.row, worker.personnelNumber)
            .then(() => {
                fillTable();
                onClose()
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    return (
        <BaseModal onClose={onClose}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <h2>Изменение выданной позиции: <span
                    style={{fontWeight: "bold"}}>{modalState.row.receivedNameSto}</span></h2>
                <InputNumber valueState={inputAmountState}/>
                <div>
                    <Button type="primary" size="middle" onClick={saveHandler}>Сохранить</Button>
                    <Button style={{margin: 10}} type="primary" size="middle" onClick={deleteHandler}>Удалить</Button>
                </div>
            </div>
        </BaseModal>
    );
};

export default ChangeReceivedModal;