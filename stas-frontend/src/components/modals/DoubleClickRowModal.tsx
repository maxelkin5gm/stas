import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {useTypeSelector} from "../../hooks/useTypeSelector";

import BaseModal from "./BaseModal";
import InputNumber from "../Input/InputNumber";
import cl from "./DoubleClickRowModal.module.scss";

import {StasStateEnum} from "../../store/stasReducer/types/state.types";
import {Cart} from "../../store/stasReducer/types/cart.types";
import {CartService} from "../../services/CartService";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";
import {StasStateActionTypes} from "../../store/stasReducer/stasReducer.type";
import {AppStateActionTypes} from "../../store/appReducer/appReducer.type";

interface DoubleClickRowModalProps {
    modalState: {
        visible: boolean,
        row: any
    }
    onClose: () => void,
    stasIndex: number
}

const DoubleClickRowModal = ({modalState, onClose, stasIndex}: DoubleClickRowModalProps) => {
    const dispatch = useTypeDispatch();
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state)
    const cart = useTypeSelector(state => state.stasList[stasIndex].cart)

    const [countStoInputState, setCountStoInputState] = useState(1);
    const [noteInputState, setNoteInputState] = useState(modalState.row.note)

    useEffect(() => {
        setNoteInputState(modalState.row.note);
        setCountStoInputState(1);
    }, [modalState])

    if (!modalState.visible) return null;

    function saveNoteHandler() {

    }

    function addToCartHandler() {
        if (countStoInputState < 1) {
            dispatch({
                type: AppStateActionTypes.SET_ERROR_MODAL,
                visible: true,
                title: "Ошибка",
                text: "Неверно введено количество"
            })
            return;
        }

        const newItem: Cart = {
            key: modalState.row.sto,
            sto: modalState.row.sto,
            amount: countStoInputState,
            detail: "test detail",
            operationNumber: "test operation"
        }
        const fullAmount: number = modalState.row.remainder;

        const newCart = CartService.add(cart, newItem, fullAmount);

        if (newCart) {
            dispatch({
                type: StasStateActionTypes.SET_CART,
                stasIndex: stasIndex,
                cart: newCart
            })
        } else
            dispatch({type: AppStateActionTypes.SET_ERROR_MODAL, visible: true, title: "Ошибка", text: "Превышено количество"})
    }

    return (
        <BaseModal onClose={onClose}>
            <div className={cl.modal}>

                {stasState === StasStateEnum.WAIT
                    ? <div className={cl.leftSide}>
                        <h3>Выбрано: <span>{modalState.row.sto}</span></h3>
                        <h3>Количество в ячейке: {modalState.row.remainder}</h3>
                        <select multiple>
                            <option value="боеголовка 228">боеголовка 228</option>
                            <option value="корпус 229">корпус 229</option>
                        </select>
                        <InputNumber valueState={[countStoInputState, setCountStoInputState]}/>
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

export default DoubleClickRowModal;