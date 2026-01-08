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
                return true;
            }
        } catch (error) {
            console.error('Login failed', error.response?.data?.error || error.message);
            return false;
        }
        return false;
    };

    const register = async (username, password) => {
        try {
            const { data } = await api.post('/auth/register', { username, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return true;
            }
        } catch (error) {
            console.error('Registration failed', error.response?.data?.error || error.message);
            return false;
        }
        return false;
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
