import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CartItem = ({ item, removeItemById }) => {
    return (
        <article className="cart-item" key={item.id}>
            <Link to={"/item/" + item.id}>
                <img src={item.img} className="checkout-item-img" alt={item.title} />
            </Link>
            <div className="cart-item-detail">
                <span>
                    <b>{item.title}</b>
                </span>
                <small>Precio unitario: $ {item.price}</small>
                <small>Cantidad: {item.qty}</small>
                <small>Subtotal: $ {item.qty * item.price}</small>
            </div>
            <div className="cart-item-remove">
                <FontAwesomeIcon
                    color="red"
                    icon={faTrashCan}
                    onClick={() => {
                        removeItemById(item.id);
                    }}
                />
            </div>
        </article>
    );
};

export default CartItem;
