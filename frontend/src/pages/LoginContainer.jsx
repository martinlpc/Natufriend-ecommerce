import LoginForm from '../components/Login/LoginForm';
import '../assets/css/Login.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const LoginContainer = () => {
    return (
        <main className="d-flex justify-content-center">
            <div className="login-container justify-content-center">
                <h2>Iniciá sesión</h2>
                <LoginForm />
                <Link className="d-flex justify-content-center" to="/register">
                    <button className="m-1 btn btn-primary">
                        <FontAwesomeIcon icon={faUserPlus} /> Registrarse
                    </button>
                </Link>
            </div>
        </main>
    );
};

export default LoginContainer;
