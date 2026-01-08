import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Check, Stethoscope, Leaf, Laptop, AlertTriangle } from 'lucide-react';

const DiagnosisPage = () => {
    const [step, setStep] = useState('select-category'); // select-category, diagnosing, result
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    // Knowledge Base
    const [knowledge, setKnowledge] = useState(null); // Full knowledge base
    const [checklistSymptoms, setChecklistSymptoms] = useState([]); // Currently VISIBLE symptoms
    const [allSymptoms, setAllSymptoms] = useState([]); // All symptoms for the category

    // User Input
    const [checklistAnswers, setChecklistAnswers] = useState(new Set()); // Selected symptom IDs
    const [result, setResult] = useState(null);

    const navigate = useNavigate();

    // Load Knowledge Base when starting diagnosis
    useEffect(() => {
        if (step === 'diagnosing' && category) {
            setLoading(true);
            api.get(`/diagnosis/knowledge/${category}`)
                .then(res => {
                    if (res.data.success) {
                        setKnowledge(res.data.data);
                        setAllSymptoms(res.data.data.symptoms);
                        setChecklistSymptoms(res.data.data.symptoms); // Initially show all
                        setChecklistAnswers(new Set()); // Reset answers
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [step, category]);

    // DYNAMIC FILTERING LOGIC (Narrowing down symptoms)
    useEffect(() => {
        if (!knowledge || !allSymptoms.length) return;

        // If no symptoms selected, show all
        if (checklistAnswers.size === 0) {
            setChecklistSymptoms(allSymptoms);
            return;
        }

        // 1. Find CANIDATE DISEASES that match ALL currently selected symptoms
        const candidateDiseases = knowledge.rules.filter(rule => {
            const ruleSymptomIds = rule.symptoms.map(s => s.symptom);
            // Check if rule contains EVERY selected symptom
            return Array.from(checklistAnswers).every(selectedId => ruleSymptomIds.includes(selectedId));
        });

        // 2. Collect ALL symptoms from these candidate diseases
        const relevantSymptomIds = new Set();
        candidateDiseases.forEach(rule => {
            rule.symptoms.forEach(s => relevantSymptomIds.add(s.symptom));
        });

        // 3. Always include currently selected symptoms (so they don't disappear)
        checklistAnswers.forEach(id => relevantSymptomIds.add(id));

        // 4. Update UI to show only relevant symptoms
        const filteredSymptoms = allSymptoms.filter(s => relevantSymptomIds.has(s._id));
        setChecklistSymptoms(filteredSymptoms);

    }, [checklistAnswers, knowledge, allSymptoms]);


    const submitDiagnosis = async () => {
        setLoading(true);
        const selectedSymptomIds = Array.from(checklistAnswers);

        try {
            const res = await api.post('/diagnosis/submit', {
                category,
                selectedSymptomIds
            });
            if (res.data.success) {
                setResult(res.data);
                setStep('result');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleChecklistSymptom = (symptomId) => {
        const newSet = new Set(checklistAnswers);
        if (newSet.has(symptomId)) {
            newSet.delete(symptomId);
        } else {
            newSet.add(symptomId);
        }
        setChecklistAnswers(newSet);
    };

    if (step === 'select-category') {
        return (
            <div className="max-w-4xl mx-auto py-12">
                <h2 className="text-3xl font-bold text-center mb-10">Pilih Mode Diagnosis</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <CategoryCard
                        icon={<Stethoscope size={40} className="text-red-500" />}
                        title="Penyakit Manusia"
                        onClick={() => { setCategory('human'); setStep('diagnosing'); }}
                    />
                    <CategoryCard
                        icon={<Leaf size={40} className="text-green-500" />}
                        title="Hewan & Tanaman"
                        onClick={() => { setCategory('animal'); setStep('diagnosing'); }}
                    />
                    <CategoryCard
                        icon={<Laptop size={40} className="text-purple-500" />}
                        title="Kerusakan Hardware"
                        onClick={() => { setCategory('hardware'); setStep('diagnosing'); }}
                    />
                </div>
            </div>
        );
    }

    if (step === 'result' && result) {
        return (
            <div className="max-w-2xl mx-auto py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl">
                    {!result.result ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-700">Tidak ada penyakit yang cocok.</h2>
                            <p className="text-gray-500 mt-2">Gejala yang Anda pilih tidak mengerucut pada satu diagnosis pasti di database kami.</p>
                            <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-primary text-white rounded-lg">Coba Lagi</button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-sm uppercase tracking-wide text-gray-400 mb-2">Hasil Diagnosis Utama</h2>
                            <h1 className="text-4xl font-bold text-primary mb-4">{result.result.disease.name}</h1>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-4 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.result.cf * 100}%` }}
                                        className="h-full bg-blue-500"
                                    />
                                </div>
                                <span className="font-bold text-blue-600 text-xl">{result.result.cf_percentage}</span>
                            </div>

                            <div className="prose max-w-none text-gray-600 mb-8">
                                <p>{result.result.disease.description}</p>
                            </div>

                            {/* Recommendations */}
                            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                                <h3 className="font-bold text-gray-800 text-lg">Rekomendasi Tindakan</h3>

                                {result.result.disease.recommendation?.initialAction?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-primary mb-1">Tindakan Awal</h4>
                                        <ul className="list-disc ml-5 space-y-1">
                                            {result.result.disease.recommendation.initialAction.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {result.result.disease.recommendation?.prevention?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-green-600 mb-1">Pencegahan</h4>
                                        <ul className="list-disc ml-5 space-y-1">
                                            {result.result.disease.recommendation.prevention.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {result.result.disease.recommendation?.treatment?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-blue-500 mb-1">Pengobatan / Solusi</h4>
                                        <ul className="list-disc ml-5 space-y-1">
                                            {result.result.disease.recommendation.treatment.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                                <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-sm text-yellow-800">
                                    <strong>Disclaimer:</strong> Hasil diagnosis ini disusun untuk tujuan informasi dan edukasi.
                                    Sistem ini tidak menggantikan konsultasi, diagnosis, atau perawatan medis profesional.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 mt-8">
                                <button
                                    onClick={() => {
                                        setResult(null);
                                        setStep('diagnosing');
                                        setChecklistAnswers(new Set());
                                        setChecklistSymptoms(allSymptoms); // Reset filtered list
                                    }}
                                    className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors font-semibold"
                                >
                                    Diagnosa Kembali (Pilih Gejala)
                                </button>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Kembali ke Menu Utama
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        );
    }

    // UNIFIED CHECKLIST RENDER (For ALL Categories)
    return (
        <div className="max-w-4xl mx-auto py-12 flex flex-col items-center">
            {loading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ loop: Infinity, ease: "linear", duration: 1 }}
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full bg-white p-8 rounded-2xl shadow-xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Gejala apa yang ditemukan?</h2>
                        <button
                            onClick={() => {
                                setStep('select-category');
                                setCategory('');
                            }}
                            className="text-sm text-gray-500 hover:text-primary underline"
                        >
                            Ganti Mode
                        </button>
                    </div>
                    <p className="text-center text-gray-500 mb-8">
                        Pilih gejala di bawah ini. Daftar akan otomatis menyusut sesuai gejala yang dipilih.
                    </p>

                    <AnimatePresence>
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {checklistSymptoms.map(symptom => (
                                <motion.div
                                    key={symptom._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => toggleChecklistSymptom(symptom._id)}
                                    className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between select-none ${checklistAnswers.has(symptom._id)
                                        ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500'
                                        : 'bg-white hover:bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <span className={checklistAnswers.has(symptom._id) ? 'font-bold text-blue-900' : 'text-gray-700'}>
                                        {symptom.name}
                                    </span>
                                    {checklistAnswers.has(symptom._id) && <Check size={20} className="text-blue-500" />}
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>

                    {checklistSymptoms.length === 0 && (
                        <div className="text-center text-gray-400 py-10">
                            Tidak ada gejala lain yang cocok dengan kombinasi saat ini.
                        </div>
                    )}

                    <button
                        onClick={submitDiagnosis}
                        disabled={checklistAnswers.size === 0}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
                    >
                        Analisis Sekarang ({checklistAnswers.size} Gejala)
                    </button>
                </motion.div>
            )}
        </div>
    );
};

const CategoryCard = ({ icon, title, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center gap-4 hover:border-primary transition-colors"
    >
        <div className="p-4 bg-gray-50 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </motion.button>
);

export default DiagnosisPage;
