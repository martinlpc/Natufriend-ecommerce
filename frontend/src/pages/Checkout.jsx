import { Container, Row } from 'react-bootstrap';

import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

import { OrderConfirm } from '../components/Order/OrderConfirm';
import { CheckoutContainer } from '../components/CheckoutContainer';
import { useEffect } from 'react';

export const Checkout = () => {
    const { ticket } = useContext(CartContext);
    const [order, setOrder] = useState();

    useEffect(() => {
        setOrder(ticket);
    }, [ticket]);

    return (
        <main>
            <div className="title-cartpage mb-4">
                <h1>Checkout</h1>
            </div>

            <Container>
                <Row>{!order ? <CheckoutContainer /> : <OrderConfirm order={order} />}</Row>
            </Container>
        </main>
    );
};
