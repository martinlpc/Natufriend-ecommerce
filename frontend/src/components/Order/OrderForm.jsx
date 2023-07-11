//import { getFirestore } from "firebase/firestore";
import React, { useState } from 'react';
import { useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { setOrder } from '../../queries/Orders';
import OrderInput from './OrderInput';

export const OrderForm = () => {
    // Estado que maneja habilitación de SubmitBtn
    const [validated, setValidated] = useState(false);

    // Estados para manejar los componentes OrderInput
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState('');

    // Utiliza CartContext para generar la orden con los productos
    const { cart, totalPrice, setOrderId } = useContext(CartContext);

    const handleOnKeyDownTel = (event) => {
        const input = event.key;
        const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowRight', 'ArrowLeft', 'Tab'];

        if (event.currentTarget.value.length === 0 && input === '0') {
            event.preventDefault();
        }
        if (!validChars.includes(input)) {
            event.preventDefault();
        }
    };

    const handleOnKeyUpTel = () => {
        tel.startsWith('0') && setTel(tel.slice(1));
    };

    const validateEmailCheck = () => {
        if (emailCheck.length > 0) {
            setValidated(email === emailCheck);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const orderProds = cart.map((prod) => ({
            product_id: prod.id,
            product_name: prod.title,
            product_price: prod.price,
            product_qty: prod.qty,
            product_text: prod.text,
        }));

        const order = {
            name: name,
            email: email,
            tel: tel,
            total_price: totalPrice,
            products: orderProds,
            status: 'generada',
        };

        //const db = getFirestore();
        //const orderIdFromFB = await setOrder(db, order);
        //setOrderId(orderIdFromFB);
    };

    return (
        <Col xs={12} lg={4}>
            <h2 className="card-title mb-3">Generá tu orden</h2>
            <Form validated={validated} onSubmit={handleSubmit}>
                <OrderInput inputState={name} setInputState={setName} type="text" label="Nombre y apellido" placeholder="Ingresa tu nombre y apellido" />

                <OrderInput
                    inputState={tel}
                    setInputState={setTel}
                    type="text"
                    label="Número de celular"
                    placeholder="Cod. de área sin 0 y sin 15, ej: 1123456789"
                    maxLength={10}
                    onKeyDown={handleOnKeyDownTel}
                    onKeyUp={handleOnKeyUpTel}
                />

                <OrderInput inputState={email} setInputState={setEmail} type="email" label="Email" placeholder="correo@dominio.com" />

                <OrderInput
                    inputState={emailCheck}
                    setInputState={setEmailCheck}
                    type="email"
                    label="Email"
                    placeholder="correo@dominio.com"
                    inputFunction={validateEmailCheck}
                />

                <Button onSubmit={handleSubmit} variant="primary" type="submit" disabled={!validated} id="SubmitBtn">
                    Comprar
                </Button>
            </Form>
        </Col>
    );
};
