import axios from "axios";
import {Cart} from "../store/stasReducer/types/cart";
import {SelectedCell} from "../store/stasReducer/types/selectedCell";
import {Worker} from "../store/stasReducer/types/worker";
import {addKeyPropertyForArray} from "./utils/addKeyPropertyForArray";
import {DetailEntity} from "../types/models";

export class CartService {

    static give(cart: Cart[], stasIndex: number, selectedCell: SelectedCell, worker: Worker) {
        return axios.post("/api/cart/give", cart, {
            params: {
                stasIndex: stasIndex + 1,
                side: selectedCell.side,
                cellNumber: selectedCell.cellNumber,
                personnelNumber: worker.personnelNumber
            }
        })
    }

    static take(row: any, amount: number, stasIndex: number, selectedCell: SelectedCell, worker: Worker) {
        return axios.post("/api/cart/take", null, {
            params: {
                nameSto: row.receivedNameSto,
                amount,
                nameDetail: row.receivedNameDetail,
                operationNumber: row.receivedOperationNumber,
                stasIndex: stasIndex + 1,
                side: selectedCell.side,
                cellNumber: selectedCell.cellNumber,
                personnelNumber: worker.personnelNumber
            }
        })
    }

    static async findAllMatchStoByCellAndReceivedSto(stasIndex: number, selectedCell: SelectedCell, worker: Worker) {
        const data = await axios.get("/api/cart/findAllMatchStoBy", {
            params: {
                stasIndex: stasIndex + 1,
                side: selectedCell.side,
                cellNumber: selectedCell.cellNumber,
                personnelNumber: worker.personnelNumber
            }
        }).then(res => res.data)
        return addKeyPropertyForArray(data);
    }

    static addToCart(cart: Cart[],row: any, countSto: number, selectedOptionState: DetailEntity) {
        const newItem: Cart = {
            key: row.nameSto,
            nameSto: row.nameSto,
            amount: countSto,
            nameDetail: selectedOptionState.nameDetail || "",
            operationNumber: selectedOptionState.operationNumber || ""
        }
        const fullAmount = row.remainder;
        const newCart = [...cart];

        if (newItem.amount > fullAmount) return null;

        const index = cart.findIndex((value) =>
            value.nameSto === newItem.nameSto
        )
        if (index === -1) {
            newCart.push(newItem);
            return newCart;
        }

        const resultAmount = cart[index].amount + newItem.amount;
        if (resultAmount <= fullAmount) {
            newItem.amount = resultAmount;
            newCart[index] = newItem;
            return newCart;
        }
        return null;
    }
}