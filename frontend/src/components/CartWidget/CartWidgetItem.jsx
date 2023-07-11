import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export const CartWidgetItem = ({ item }) => {
    const { removeItemById } = useContext(CartContext);

    return (
        <span className="cart-item" key={item.id}>
            <Link to={"/item/" + item.id}>
                <img src={item.img} className="cart-item-img" alt={item.title} />
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
        </span>
    );
};
