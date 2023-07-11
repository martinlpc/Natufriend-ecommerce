import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CartItem = ({ item, removeItemById }) => {
    return (
        <article className="cart-item" key={item._id}>
            <Link to={'/item/' + item._id}>
                <img src={item.thumbnails[0]} className="checkout-item-img" alt={item.title} />
            </Link>
            <div className="cart-item-detail">
                <span>
                    <b>{item.title}</b>
                </span>
                <small>Precio unitario: $ {item.price}</small>
                <small>Cantidad: {item.qty}</small>
                <small>Subtotal: $ {item.qty * item.price}</small>
            </div>
            <button className="btn btn-danger">
                <FontAwesomeIcon
                    color="white"
                    icon={faTrashCan}
                    onClick={() => {
                        removeItemById(item._id);
                    }}
                />
            </button>
        </article>
    );
};

export default CartItem;
