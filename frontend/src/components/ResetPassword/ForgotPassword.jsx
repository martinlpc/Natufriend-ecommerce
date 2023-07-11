import { useRef } from 'react';

const ForgotPassword = () => {
    const form = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const email = Object.fromEntries(formData);
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        };
    };

    return (
        <div className="container">
            <form ref={form} onSubmit={handleSubmit}>
                <h2>Recuperación de cuenta</h2>
                <input type="email" placeholder="Email" name="email" required />
                <button className="btn btn-success">Enviar link de recuperación</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
