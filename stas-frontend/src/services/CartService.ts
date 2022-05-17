import {Cart} from "../store/stasReducer/types/cart.types";

export class CartService {

    static add(cart: Cart[], newItem: Cart, fullAmount: number) {
        const newCart = [...cart];

        if (newItem.amount > fullAmount) return null;

        const index = cart.findIndex((value) =>
            value.sto === newItem.sto &&
            value.detail === newItem.detail &&
            value.operationNumber === newItem.operationNumber
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