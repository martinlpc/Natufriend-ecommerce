import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RegisterForm from '../components/Register/RegisterForm';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function RegisterContainer() {
    return (
        <main className="d-flex justify-content-center pt-2">
            <div className="login-container justify-content-center">
                <h2 className="text-center">Registrate</h2>
                <RegisterForm />
            </div>
        </main>
    );
}
