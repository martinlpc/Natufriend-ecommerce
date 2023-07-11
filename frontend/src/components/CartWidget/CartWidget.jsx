import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { Badge, Dropdown } from 'react-bootstrap';
import { CartWidgetItem } from './CartWidgetItem';
import { CartWidgetActions } from './CartWidgetActions';

const CartWidget = () => {
    const { totalItems, cart } = useContext(CartContext);

    return (
        <Dropdown className="mx-1" align="end">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FontAwesomeIcon icon={faCartShopping} color="white" size="1x" />
                {totalItems > 0 && <Badge>{totalItems}</Badge>}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
                {totalItems === 0 ? (
                    <span className="cart-item mb-0">Carrito vacío</span>
                ) : (
                    <>
                        {cart.map((item) => (
                            <CartWidgetItem item={item} key={item._id} />
                        ))}

                        <CartWidgetActions />
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CartWidget;
