import LoginForm from '../components/Login/LoginForm';
import '../assets/css/Login.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const LoginContainer = () => {
    return (
        <main className="d-flex justify-content-center pt-2">
            <div className="login-container justify-content-center">
                <h2 className="text-center">Iniciá sesión</h2>
                <LoginForm />
                <Link className="d-flex justify-content-center" to="/register">
                    Crear nuevo usuario
                </Link>
            </div>
        </main>
    );
};

export default LoginContainer;
