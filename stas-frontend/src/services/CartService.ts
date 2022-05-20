import axios from "axios";
import {Cart} from "../store/stasReducer/types/cart";
import {SelectedCell} from "../store/stasReducer/types/selectedCell";
import {Worker} from "../store/stasReducer/types/worker";
import {addKeyPropertyForArray} from "./utils/addKeyPropertyForArray";

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
        const data = await axios.get("/api/cart/findAllMatchStoByCellAndReceivedSto", {
            params: {
                stasIndex: stasIndex + 1,
                side: selectedCell.side,
                cellNumber: selectedCell.cellNumber,
                personnelNumber: worker.personnelNumber
            }
        }).then(res => res.data)
        return addKeyPropertyForArray(data);
    }
}