import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";

import cl from "../style/DoubleClickModal.module.scss";
import BaseModal from "../BaseModal";
import InputNumber from "../../Input/InputNumber";
import {StasStateEnum} from "../../../store/stasReducer/types/state";
import {StasStateActionTypes} from "../../../store/stasReducer/stasReducer.type";
import {DetailService} from "../../../services/entities/DetailService";
import {DetailEntity} from "../../../types/models";
import {UtilsStore} from "../../../store/UtilsStore";
import {CellService} from "../../../services/entities/CellService";
import {CartService} from "../../../services/CartService";

interface DoubleClickRowModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    onClose: () => void,
    stasIndex: number
}

const StasDoubleClickModal = ({modalState, onClose, stasIndex}: DoubleClickRowModalProps) => {
    const dispatch = useTypeDispatch();
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state)
    const cart = useTypeSelector(state => state.stasList[stasIndex].cart)

    const [countStoInputState, setCountStoInputState] = useState(1);
    const [noteInputState, setNoteInputState] = useState(modalState.row.note)
    const [optionsState, setOptionsState] = useState([] as DetailEntity[])
    const [selectedOptionState, setSelectedOptionState] = useState({} as DetailEntity)

    useEffect(() => {
        if (stasState !== StasStateEnum.WAIT) return;
        UtilsStore.setLoader(dispatch, true)
        DetailService.findAllBy(modalState.row.nameSto)
            .then((options) => setOptionsState(options))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }, [stasState, modalState.row.nameSto, dispatch])

    function selectOptionHandler(e: React.MouseEvent<HTMLOptionElement, MouseEvent>) {
        const value = e.currentTarget.value;
        const [nameDetail, operationNumber] = value.split(" ");
        setSelectedOptionState({
            nameDetail: nameDetail.trim(),
            operationNumber: operationNumber.trim()
        })
    }

    function saveNoteHandler() {
        UtilsStore.setLoader(dispatch, true)
        CellService.updateNoteBy(stasIndex, modalState.row.side, modalState.row.cellNumber, noteInputState)
            .then(() => {
                dispatch({type: StasStateActionTypes.REFRESH_TABLE, stasIndex})
                onClose()
            })
            .catch(() => UtilsStore.showError(dispatch))
            .finally(() => UtilsStore.setLoader(dispatch, false))
    }

    function addToCartHandler() {
        if (countStoInputState < 1) {
            UtilsStore.showError(dispatch, "Неверно введено количество")
            return;
        }

        const newCart = CartService.addToCart(cart, modalState.row, countStoInputState, selectedOptionState);
        if (newCart) {
            dispatch({
                type: StasStateActionTypes.SET_CART,
                stasIndex,
                cart: newCart
            })
            onClose()
        } else
            UtilsStore.showError(dispatch, "Превышено количество")
    }

    return (
        <BaseModal onClose={onClose}>
            <div className={cl.modal}>

                {stasState === StasStateEnum.WAIT
                    ? <div className={cl.leftSide}>
                        <h3>Выбрано: <span>{modalState.row.nameSto}</span></h3>
                        <h3>Количество в ячейке: {modalState.row.remainder}</h3>
                        <select multiple>
                            {optionsState.map(option =>
                                <option value={option.nameDetail + " " + option.operationNumber}
                                        onClick={selectOptionHandler}
                                        key={option.nameDetail + " " + option.operationNumber}
                                >{option.nameDetail + " " + option.operationNumber}</option>
                            )}
                        </select>
                        <InputNumber min={1} valueState={[countStoInputState, setCountStoInputState]}/>
                        <Button type="primary" size="large" onClick={addToCartHandler}>Добавить в корзину</Button>
                    </div>
                    : null}


                <div className={cl.rightSide}>
                    <h3>Изменение примечания</h3>
                    <textarea value={noteInputState} onChange={e => setNoteInputState(e.target.value)}></textarea>
                    <Button type="primary" size="large" onClick={saveNoteHandler}>Сохранить</Button>
                </div>

            </div>
        </BaseModal>
    );
};

export default StasDoubleClickModal;