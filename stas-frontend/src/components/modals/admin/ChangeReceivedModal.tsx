import React, {useState} from 'react';
import BaseModal from "../BaseModal";
import {Worker} from "../../../store/stasReducer/types/worker";
import InputNumber from "../../Input/InputNumber";
import {Button} from "antd";

interface ChangeReceivedModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    worker: Worker
    onClose: () => void
}

const ChangeReceivedModal = ({onClose, modalState}: ChangeReceivedModalProps) => {

    const inputAmountState = useState(modalState.row.amount)

    return (
        <BaseModal onClose={onClose}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <h2>Изменение выданной позиции: <span
                    style={{fontWeight: "bold"}}>{modalState.row.receivedNameSto}</span></h2>
                <InputNumber valueState={inputAmountState}/>
                <div>
                    <Button type="primary" size="middle">Сохранить</Button>
                    <Button style={{margin: 10}} type="primary" size="middle">Удалить</Button>
                </div>
            </div>
        </BaseModal>
    );
};

export default ChangeReceivedModal;