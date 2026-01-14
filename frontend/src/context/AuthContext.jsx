import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    if (data.success) {
                        setUser(data.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (username, password) => {
        try {
            const { data } = await api.post('/auth/login', { username, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return { success: true };
            }
        } catch (error) {
            const msg = error.response?.data?.error || error.message;
            console.error('Login failed', msg);
            return { success: false, error: msg };
        }
        return { success: false, error: 'Unexpected login error' };
    };

    const register = async (username, password) => {
        try {
            const { data } = await api.post('/auth/register', { username, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return { success: true };
            }
        } catch (error) {
            const msg = error.response?.data?.error || error.message;
            console.error('Registration failed', msg);
            return { success: false, error: msg };
        }
        return { success: false, error: 'Unexpected registration error' };
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
