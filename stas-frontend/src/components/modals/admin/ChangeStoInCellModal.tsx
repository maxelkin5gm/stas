import React, {useState} from 'react';
import BaseModal from "../BaseModal";
import InputNumber from "../../Input/InputNumber";
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {UtilsStore} from "../../../store/UtilsStore";
import {AdminService} from "../../../services/AdminService";

interface ChangeStoInCellModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    onClose: () => void
    fillTable: () => void
}

const ChangeStoInCellModal = ({onClose, modalState, fillTable}: ChangeStoInCellModalProps) => {
    const dispatch = useTypeDispatch();

    const inputAmountState = useState(modalState.row.remainder as number)

    function saveHandler() {
        if (inputAmountState[0] < 0) {
            UtilsStore.showError(dispatch, "Не правильно введен остаток");
            return
        }
        UtilsStore.setLoader(dispatch, true)
        AdminService.changeStoInCell(modalState.row, inputAmountState[0])
            .then(() => {
                fillTable();
                onClose()
            })
            .catch((e) => UtilsStore.showError(dispatch, e.response?.data?.message))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function deleteHandler() {
        UtilsStore.setLoader(dispatch, true)
        AdminService.deleteStoFromCell(modalState.row)
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
                <h2>Изменение в ячейке: </h2>
                <h2>STO: <span style={{fontWeight: "bold"}}>{modalState.row.nameSto}</span></h2>

                <InputNumber style={{margin: 10, width: "100%"}} valueState={inputAmountState}/>

                <div>
                    <Button type="primary" size="large" onClick={saveHandler}>Сохранить</Button>
                    <Button style={{margin: 10}} type="primary" size="large" onClick={deleteHandler}>Удалить</Button>
                </div>
            </div>
        </BaseModal>
    );
};

export default ChangeStoInCellModal;