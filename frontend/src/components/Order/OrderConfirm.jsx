import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export const OrderConfirm = ({ order }) => {
    const { clearCart } = useContext(CartContext);
    return (
        <>
            <h1>Compra generada con éxito!</h1>
            <h2>
                ID Factura: <b>{order.code}</b>
            </h2>
            <p>
                Monto: <b>$ {order.total_amount}</b>
            </p>
            <p>Comprador: {order.purchaser}</p>
            <p>Fecha y hora de la transacción: {order.purchase_datetime}</p>
            <Link to={'/'}>
                <Button onClick={() => clearCart} variant="outline-primary">
                    Volver al comienzo
                </Button>
            </Link>
        </>
    );
};
