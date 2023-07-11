import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export const OrderConfirm = ({ orderId }) => {
    const { clearCart } = useContext(CartContext);
    return (
        <>
            <h1>¡Orden generada con éxito!</h1>
            <h2>
                Tu orden de compra tiene el id: <b>{orderId}</b>
            </h2>
            <Link to={"/"}>
                <Button onClick={clearCart} variant="outline-primary">
                    Volver al comienzo
                </Button>
            </Link>
        </>
    );
};
