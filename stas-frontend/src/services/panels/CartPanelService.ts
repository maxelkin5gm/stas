import {Cart} from "../../store/stasReducer/types/cart";
import {DetailEntity} from "../../types/models";

export class CartPanelService {

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