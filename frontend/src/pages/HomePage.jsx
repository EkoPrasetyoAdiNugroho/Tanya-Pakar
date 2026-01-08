import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Stethoscope, Leaf, Laptop } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mb-16"
            >
                <h1 className="text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
                    Cerdas Mendiagnosis,<br />Tepat Mengambil Tindakan.
                </h1>
                <p className="text-xl text-gray-500 mb-8">
                    Sistem pakar modern dengan metode Forward Chaining dan Certainty Factor untuk hasil yang akurat.
                </p>
                <Link to="/diagnosis" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                    Mulai Diagnosis Sekarang
                </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
                <FeatureCard
                    icon={<Stethoscope size={40} className="text-red-500" />}
                    title="Manusia"
                    description="Deteksi dini penyakit pada manusia beserta saran pengobatan medis."
                    delay={0.1}
                />
                <FeatureCard
                    icon={<Leaf size={40} className="text-green-500" />}
                    title="Hewan & Tumbuhan"
                    description="Solusi kesehatan untuk hewan peliharaan dan tanaman kesayangan Anda."
                    delay={0.2}
                />
                <FeatureCard
                    icon={<Laptop size={40} className="text-purple-500" />}
                    title="Hardware"
                    description="Analisis kerusakan Laptop dan HP dengan panduan perbaikan."
                    delay={0.3}
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all group"
        >
            <div className="mb-4 p-4 bg-gray-50 rounded-xl inline-block group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-500">{description}</p>
        </motion.div>
    );
};

export default HomePage;
