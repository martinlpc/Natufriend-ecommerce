import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../queries/Session';

export default function RegisterForm() {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await register(fName, lName, email, password);
            if (response) {
                setRegistered(true);
                setError(false);
                return;
            }
            setRegistered(false);
            setError(true);
        } catch (error) {
            // error logic
        }
    };
    return (
        <>
            <form className="d-flex flex-column justify-content-center" onSubmit={handleRegister}>
                <label htmlFor="firstName">Nombre:</label>
                <input onChange={(e) => setFName(e.target.value)} type="text" id="fName" name="fName" required />

                <label htmlFor="lName">Apellido:</label>
                <input onChange={(e) => setLName(e.target.value)} type="text" id="lName" name="lName" required />

                <label htmlFor="email">Email:</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required />

                <label htmlFor="password">Contraseña:</label>
                <input onChange={(e) => setPassword(e.target.value)} className="mb-1" type="password" id="password" name="password" required />
                <button className={`btn btn-success m-1 ${registered ? 'disabled' : ''}`} type="submit">
                    <FontAwesomeIcon icon={faUserPlus} /> Registrarse como nuevo usuario
                </button>
                <p className={`text-center ${registered ? '' : 'hidden'}`}>Nuevo usuario creado, volvé al Home para loguearte</p>
                <p className={`text-center message-error-login ${error ? '' : 'hidden'}`}>Ocurrió un error, intentalo de nuevo</p>
            </form>
            <div className="d-flex justify-content-center m-1">
                <Link to="/">Volver al home</Link>
            </div>
        </>
    );
}
