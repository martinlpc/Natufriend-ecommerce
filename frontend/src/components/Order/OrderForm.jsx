//import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
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
    const { buyCart } = useContext(CartContext);

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

        await buyCart();
    };

    useEffect(() => {
        const fullName = `${JSON.parse(localStorage.getItem('user')).first_name} ${JSON.parse(localStorage.getItem('user')).last_name}`;
        const userEmail = `${JSON.parse(localStorage.getItem('user')).email}`;
        setName(fullName);
        setEmail(userEmail);
    }, []);

    return (
        <Col xs={12} lg={4}>
            <h2 className="card-title mb-3">Generá tu compra</h2>
            <Form validated={validated} onSubmit={handleSubmit}>
                <OrderInput
                    inputState={name}
                    setInputState={setName}
                    type="text"
                    label="Nombre y apellido"
                    placeholder="Ingresa tu nombre y apellido"
                    initialValue={name}
                />

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

                <OrderInput inputState={email} setInputState={setEmail} type="email" label="Email" placeholder="correo@dominio.com" initialValue={email} />

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
