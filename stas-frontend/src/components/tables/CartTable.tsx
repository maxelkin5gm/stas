import React, {useEffect, useState} from 'react';
import BaseTable from "./BaseTable/BaseTable";
import {cartColumns} from "./columns/stas/cartColumns";
import {useTypeSelector} from "../../hooks/useTypeSelector";

interface CartTableProps {
    stasIndex: number
}

const CartTable = ({stasIndex}: CartTableProps) => {
    const cart = useTypeSelector(state => state.stasList[stasIndex].cart);

    const [tableState, setTableState] = useState({
        columns: [] as any[],
        data: [] as any[]
    })

    useEffect(() => {
        setTableState({
            columns: cartColumns,
            data: cart
        })
    }, [cart])

    return (
        <BaseTable tableState={tableState}/>
    );
};

export default CartTable;