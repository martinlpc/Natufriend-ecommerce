import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';

const CartItemList = () => {
    const { cart, removeItemById, totalPrice } = useContext(CartContext);

    return (
        <Col xs={12} lg={8}>
            <h2 className="mb-3">Productos en tu carrito</h2>
            <Container as="section" className="cart-item-list-container container align-center">
                {cart &&
                    cart.map((prod) => {
                        return <CartItem key={prod._id} item={prod} removeItemById={removeItemById} />;
                    })}
            </Container>
            <Container fluid={true} as="section" className="cart-item-list_total d-flex justify-content-center align-content-center">
                {cart.length ? (
                    <div className="mt-3">
                        <h3>Total en esta compra: $ {totalPrice}</h3>
                    </div>
                ) : (
                    <>
                        <Row className="justify-content-center align-content-center">
                            <Col className="col-12 text-center" as="span">
                                Tu carrito está vacío 🐶🐱
                            </Col>

                            <Link className="col-12 text-center" to={'/'}>
                                <p className="mt-2">Ir al inicio</p>
                            </Link>
                        </Row>
                    </>
                )}
            </Container>
        </Col>
    );
};

export default CartItemList;
