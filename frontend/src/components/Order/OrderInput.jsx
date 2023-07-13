import { Form } from 'react-bootstrap';

const OrderInput = ({ initialValue, inputState, setInputState, type, label, placeholder, maxLength, onKeyDown, onKeyUp, inputFunction }) => {
    const handleChange = (e) => {
        setInputState(e.target.value);
    };

    // Se ejecuta solo si la funcion fue pasada como param
    if (inputFunction) {
        inputFunction();
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                onChange={handleChange}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                required={true}
                type={type}
                placeholder={placeholder}
                value={inputState}
                maxLength={maxLength}
                defaultValue={initialValue}
            />
            <Form.Control.Feedback type="invalid">Este campo es requerido</Form.Control.Feedback>
        </Form.Group>
    );
};

export default OrderInput;
