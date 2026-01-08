import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                        Tanya Pakar
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>

                        {user ? (
                            <>
                                <Link to="/diagnosis" className="hover:text-primary transition-colors">Diagnosis</Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
                                )}
                                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                                    <span className="flex items-center gap-2 font-medium">
                                        <UserIcon size={18} />
                                        {user.username}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="p-2 rounded-full hover:bg-gray-100 text-red-500 transition-colors"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-md shadow-lg shadow-primary/30 hover:bg-green-500 hover:scale-105 transition-all">
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="py-6 text-center text-gray-400 text-sm">
                © 2026 Tanya Pakar. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;
