import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export const CartWidgetItem = ({ item }) => {
    const { removeItemById } = useContext(CartContext);

    return (
        <span className="cart-item" key={item._id}>
            <Link to={'/item/' + item._id}>
                <img src={item.thumbnails[0]} className="cart-item-img" alt={item.title} />
            </Link>
            <div className="cart-item-detail">
                <span>
                    <b>{item.title}</b>
                </span>
                <small>Precio unitario: $ {item.price}</small>
                <small>Cantidad: {item.quantity}</small>
                <small>Subtotal: $ {item.quantity * item.price}</small>
            </div>
            <div className="cart-item-remove">
                <button className="btn btn-danger">
                    <FontAwesomeIcon
                        color="white"
                        icon={faTrashCan}
                        onClick={() => {
                            removeItemById(item._id);
                        }}
                    />
                </button>
            </div>
        </span>
    );
};
