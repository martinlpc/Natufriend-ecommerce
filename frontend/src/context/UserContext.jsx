import { createContext, useEffect, useState } from 'react';
//import { getCurrentSession, login, logout } from '../queries/Session';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const setUser = (userData) => {
        setUserData(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const removeUser = () => {
        setUserData(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                setUser,
                removeUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
