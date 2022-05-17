import React, {useEffect} from 'react';
import {Button} from "antd";
import {useTypeDispatch} from "../../../hooks/useTypeDispatch";
import {useTypeSelector} from "../../../hooks/useTypeSelector";

import {StasStateEnum} from "../../../store/stasReducer/types/state.types";
import CartTable from "../../tables/CartTable";
import {StasStateActionTypes} from "../../../store/stasReducer/stasReducer.type";

interface CartPanelProps {
    stasIndex: number,
}

const CartPanel = ({stasIndex}: CartPanelProps) => {
    const stasState = useTypeSelector(state => state.stasList[stasIndex].state);
    const dispatch = useTypeDispatch();

    function clearCartHandler() {
        dispatch({type: StasStateActionTypes.SET_CART, stasIndex, cart: []})
    }

    useEffect(() => {
        if (stasState !== StasStateEnum.WAIT) {
            clearCartHandler()
        }
    })

    return (
        <>
            <div style={{minHeight: "150px", overflow: "auto", border: "1px solid black"}}>
                <CartTable stasIndex={stasIndex}/>
            </div>


            <div style={{display: "grid", gridTemplate: "1fr 1fr / 1fr 1fr", gridGap: "5px"}}>
                <Button disabled type="primary" size="middle">Выбрать все</Button>
                <Button disabled={stasState !== StasStateEnum.WAIT} type="primary" size="middle">Выдать</Button>
                <Button disabled={stasState !== StasStateEnum.WAIT} onClick={clearCartHandler}
                        type="primary" size="middle">Очистить</Button>
                <Button disabled type="primary" size="middle">Положить</Button>
            </div>
        </>
    );
};

export default CartPanel;