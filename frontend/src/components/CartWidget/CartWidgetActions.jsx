import { useContext } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export const CartWidgetActions = () => {
    const { totalItems, totalPrice, clearCart } = useContext(CartContext);

    return (
        <>
            <Dropdown.Divider />
            <span className="cart-total">Total productos: {totalItems}</span>
            <span className="cart-total">Importe total: $ {totalPrice}</span>
            <Dropdown.Divider />
            <span className="cart-buttons">
                <Link to={'cart/'}>
                    <Button variant="success">Ir al checkout</Button>
                </Link>
                <Button onClick={clearCart} variant="danger">
                    Vaciar carrito
                </Button>
            </span>
        </>
    );
};
