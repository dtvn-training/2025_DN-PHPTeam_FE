import { createContext, useEffect, useState } from 'react';
import { getUserFromToken } from '../services/UserService';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        if (localStorage.getItem('access_token')) {
            try {
                const response = await getUserFromToken();
                if (response.status === 200) {
                    setUser(response.data.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        setLoading(false);
    };

    const logout = async () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <AuthContext.Provider value={{ user, loading, setUser, fetchUser, logout }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
