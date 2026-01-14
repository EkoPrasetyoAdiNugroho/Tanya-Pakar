import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error

        try {
            console.log("Attempting registration for:", username);
            const result = await register(username, password);
            console.log("Registration Result:", result);

            if (result && result.success) {
                console.log("Registration success, navigating...");
                navigate('/diagnosis');
            } else {
                const errorMsg = result?.error || 'Registration failed (Unknown Error).';
                setError(errorMsg);
                // Fallback alert to ensure error is seen if React rendering fails
                if (!errorMsg) alert("Registration failed but no error message returned.");
            }
        } catch (err) {
            console.error("Critical Error in RegisterPage:", err);
            setError("A critical error occurred. Check console.");
            alert("A critical error occurred: " + err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-blue-200 transition-all"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-500">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
