import React, {useState} from 'react';
import BaseModal from "./BaseModal";
import TakeCartTable from "../tables/TakeCartTable";
import InputNumber from "../Input/InputNumber";
import {Button} from "antd";
import {UtilsStore} from "../../store/UtilsStore";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {CartService} from "../../services/CartService";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {StasStateActionTypes} from "../../store/stasReducer/stasReducer.type";


interface TakeCartModalProps {
    modalState: {
        visible: boolean,
    }
    onClose: () => void,
    stasIndex: number
}

const TakeCartModal = ({onClose, stasIndex}: TakeCartModalProps) => {
    const selectedCell = useTypeSelector(state => state.stasList[stasIndex].selectedCell);
    const worker = useTypeSelector(state => state.stasList[stasIndex].worker);
    const dispatch = useTypeDispatch();

    const inputAmountState = useState(1);
    const selectedRowState = useState({} as any)


    function takeHandler() {
        if (!selectedRowState[0].receivedNameSto || !selectedRowState[0].amount) {
            UtilsStore.showError(dispatch, "Не выбрано СТО из таблицы")
            return
        }
        if (inputAmountState[0] > selectedRowState[0].amount || inputAmountState[0] < 1) {
            UtilsStore.showError(dispatch, "Неверно введено количество")
            return
        }
        if (!selectedCell || !worker.personnelNumber) {
            UtilsStore.showError(dispatch, "Сотрудник или ячейка не выбраны")
            return
        }
        UtilsStore.setLoader(dispatch, true)
        CartService.take(selectedRowState[0], inputAmountState[0], stasIndex, selectedCell, worker)
            .catch(() => UtilsStore.showError(dispatch, "Произошла ошибка. Операция отменена."))
            .finally(() => UtilsStore.setLoader(dispatch, false))
            .then(() => {
                dispatch({type: StasStateActionTypes.REFRESH_TABLE, stasIndex})
                onClose()
            })
    }

    return (
        <BaseModal onClose={onClose}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: 10}}>
                <TakeCartTable selectedRowState={selectedRowState} stasIndex={stasIndex}/>
                <div>
                    <span style={{fontSize: 18}}>Выбрано: <span style={{border: "1px solid black", padding: 5, fontWeight: "bold"}}>{selectedRowState[0].receivedNameSto}</span></span>
                    <InputNumber min={1} style={{margin: 10}} valueState={inputAmountState}/>
                    <Button type="primary" size="large" onClick={takeHandler}>Положить</Button>
                </div>
            </div>
        </BaseModal>
    );
};

export default TakeCartModal;