import "../queries/Orders";
import { Container, Row } from "react-bootstrap";

import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

import { OrderConfirm } from "../components/Order/OrderConfirm";
import { CheckoutContainer } from "../components/CheckoutContainer";
import { useEffect } from "react";

export const Checkout = () => {
    const { orderId } = useContext(CartContext);

    const [order, setOrder] = useState();

    useEffect(() => {
        setOrder(orderId);
    }, [orderId]);

    return (
        <main>
            <div className="title-cartpage mb-4">
                <h1>Checkout</h1>
            </div>

            <Container>
                <Row>{!order ? <CheckoutContainer /> : <OrderConfirm orderId={orderId} />}</Row>
            </Container>
        </main>
    );
};
