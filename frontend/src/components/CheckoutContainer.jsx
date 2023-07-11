import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItemList from "./Cart/CartItemList";

import { OrderForm } from "./Order/OrderForm";

export const CheckoutContainer = () => {
    const { totalItems } = useContext(CartContext);
    return (
        <>
            <CartItemList />
            {totalItems > 0 && <OrderForm />}
        </>
    );
};
