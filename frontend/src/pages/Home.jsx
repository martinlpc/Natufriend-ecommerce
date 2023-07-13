import LoginContainer from './LoginContainer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getCurrentSession } from '../queries/Session';

export const Home = () => {
    const navigate = useNavigate();
    const { userData, setUser } = useContext(UserContext);

    const checkSession = async () => {
        try {
            const sessionData = await getCurrentSession();
            console.log('Active session: ' + JSON.stringify(sessionData.email));
            if (sessionData) {
                setUser(sessionData);
                navigate('/products');
            }
        } catch (error) {
            console.error('Error checking session: ', error);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return <>{!userData && <LoginContainer />}</>;
};
