import LoginContainer from './LoginContainer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getCurrentSession } from '../queries/Session';
import { CartContext } from '../context/CartContext';

export const Home = () => {
    const navigate = useNavigate();
    const { userData, setUser } = useContext(UserContext);
    const { fetchCart } = useContext(CartContext);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionData = await getCurrentSession();
                if (sessionData) {
                    setUser(sessionData);
                    fetchCart();
                    navigate('/products');
                }
            } catch (error) {
                console.error('Error checking session: ', error);
            }
        };
        checkSession();
    }, []);

    return <>{!userData && <LoginContainer />}</>;
};
