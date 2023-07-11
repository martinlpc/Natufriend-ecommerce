import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { logout } from '../../queries/Session';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

const UserWidget = () => {
    const navigate = useNavigate();
    const { userData, removeUser } = useContext(UserContext);

    const handleLogout = async (event) => {
        event.preventDefault();
        const response = await logout();
        if (response) {
            removeUser();
            navigate('../');
        }
    };

    return (
        <Dropdown className="mx-1" align="end">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <FontAwesomeIcon icon={faUser} color="white" size="1x" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="flex-row">
                <span className="fs-6">
                    Hola {userData.first_name}! ({userData.email})
                </span>
                <button className="btn btn-danger" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> Salir
                </button>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserWidget;
