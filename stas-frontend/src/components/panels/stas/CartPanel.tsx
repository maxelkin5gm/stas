import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {useTypeSelector} from "../../../hooks/useTypeSelector";

import {StasStateEnum} from "../../../store/stasReducer/types/state";
import CartTable from "../../tables/CartTable";
import {StasStateActionTypes} from "../../../store/stasReducer/stasReducer.type";
import {CartService} from "../../../services/CartService";
import {UtilsStore} from "../../../store/UtilsStore";
import TakeCartModal from "../../modals/TakeCartModal";

interface CartPanelProps {
    stasIndex: number,
}

const CartPanel = ({stasIndex}: CartPanelProps) => {
    const cart = useTypeSelector(state => state.stasList[stasIndex].cart);
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state);
    const selectedCell = useTypeSelector(state => state.stasList[stasIndex].selectedCell);
    const worker = useTypeSelector(state => state.stasList[stasIndex].worker);
    const dispatch = useTypeDispatch();

    const [modalState, setModalState] = useState({visible: false})

    async function giveHandler() {
        if (!selectedCell || !worker.personnelNumber) {
            UtilsStore.showError(dispatch, "Сотрудник или ячейка не выбраны")
            return;
        }
        if (cart.length === 0) {
            UtilsStore.showError(dispatch, "Корзина пустая")
            return;
        }
        try {
            UtilsStore.setLoader(dispatch, true)
            await CartService.give(cart, stasIndex, selectedCell, worker)
        } catch (e) {
            UtilsStore.showError(dispatch, "Во время выдачи произошла ошибка. Операция отменена.")
            return;
        } finally {
            UtilsStore.setLoader(dispatch, false)
        }
        dispatch({type: StasStateActionTypes.REFRESH_TABLE, stasIndex})
        clearCartHandler()
    }

    function takeHandler() {
        if (!worker.personnelNumber || !selectedCell) {
            UtilsStore.showError(dispatch, "Не выбран сотрудник или ячейка");
            return
        }
        setModalState({visible: true})
    }

    function clearCartHandler() {
        dispatch({type: StasStateActionTypes.SET_CART, stasIndex, cart: []})
    }

    useEffect(() => {
        if (stasState !== StasStateEnum.WAIT) {
            dispatch({type: StasStateActionTypes.SET_CART, stasIndex, cart: []})
        }
    }, [stasState, stasIndex, dispatch])

    return (
        <>
            <div style={{minHeight: "150px", overflow: "auto", border: "1px solid black"}}>
                <CartTable stasIndex={stasIndex}/>
            </div>


            <div style={{display: "grid", gridTemplate: "1fr 1fr / 1fr 1fr", gridGap: "5px"}}>
                <Button disabled type="primary" size="middle">Выбрать все</Button>
                <Button disabled={stasState !== StasStateEnum.WAIT} type="primary" size="middle"
                        onClick={giveHandler}>Выдать</Button>
                <Button disabled={stasState !== StasStateEnum.WAIT} onClick={clearCartHandler}
                        type="primary" size="middle">Очистить</Button>
                <Button disabled={stasState !== StasStateEnum.WAIT} type="primary" size="middle" onClick={takeHandler}>Положить</Button>
            </div>

            {modalState.visible
                ? <TakeCartModal modalState={modalState}
                                 stasIndex={stasIndex}
                                 onClose={() => setModalState({...modalState, visible: false})}
                /> : null}

        </>
    );
};

export default CartPanel;