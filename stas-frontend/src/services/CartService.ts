import axios from "axios";
import {Cart} from "../store/stasReducer/types/cart";
import {SelectedCell} from "../store/stasReducer/types/selectedCell";
import {Worker} from "../store/stasReducer/types/worker";

export class CartService {

    static give(cart: Cart[], stasIndex: number, selectedCell: SelectedCell, worker: Worker) {
        return axios.post("/api/cart/give", cart, {
            params: {
                stasIndex : stasIndex + 1,
                side: selectedCell.side,
                cellNumber: selectedCell.cellNumber,
                personnelNumber: worker.personnelNumber
            }
        })
    }
}