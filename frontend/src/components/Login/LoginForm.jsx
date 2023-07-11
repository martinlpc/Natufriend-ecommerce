import { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { login } from '../../queries/Session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const loginForm = useRef();

    const [loginError, setLoginError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            console.log(`${email} : ${password}`);
            const userData = await login(email, password);

            if (userData) {
                setUser(userData);
                setLoginError(false);
                navigate('/products');
                return;
            }
            setLoginError(true);
        } catch (error) {
            setLoginError(true);
        }
    };

    return (
        <>
            <form className="d-flex flex-column justify-content-center" ref={loginForm} onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required />

                <label htmlFor="password">Contraseña:</label>
                <input onChange={(e) => setPassword(e.target.value)} className="mb-1" type="password" id="password" name="password" required />
                <button className="btn btn-success m-1" id="submitBtn" type="submit">
                    <FontAwesomeIcon icon={faArrowRightToBracket} /> Iniciar sesión
                </button>
                <p className={`message-error-login ${loginError ? '' : 'hidden'}`}>Usuario o contraseña incorrectos</p>
            </form>
            <div className="d-flex justify-content-center m-1">
                <Link to="/forgotpassword">Olvide mi contraseña</Link>
            </div>
        </>
    );
};

export default LoginForm;
