import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DiseaseModal({ disease, onClose, initialIndex = 0 }) {
    const [imgIndex, setImgIndex] = useState(initialIndex);

    useEffect(() => {
        setImgIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        if (!disease) return;
        const interval = setInterval(() => {
            setImgIndex((prev) => (prev + 1) % disease.images.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [disease]);

    if (!disease) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                // max-w-6xl para que sea más ancho y h-[80vh] para que no sature la pantalla
                className="relative bg-white rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] z-50"
            >
                <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black text-white rounded-full transition-all">✕</button>

                {/* Sección de Imagen */}
                <div className="w-full md:w-3/5 h-64 md:h-auto relative bg-gray-900">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={imgIndex}
                            src={disease.images[imgIndex]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {disease.images.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-700 ${i === imgIndex ? 'bg-green-500 w-8' : 'bg-white/40 w-2'}`} />
                        ))}
                    </div>
                </div>

                {/* Sección de Texto (Ajuste de tamaños) */}
                <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col bg-gray-50">
                    {/* Título reducido de 4xl a 3xl */}
                    <h2 className="text-3xl font-black text-green-800 mb-6 border-b-2 border-green-100 pb-4 leading-tight">
                        {disease.name}
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">Descripción</h4>
                            {/* Texto reducido de lg a base */}
                            <p className="text-gray-700 text-base leading-relaxed">{disease.desc}</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-green-600">
                            <h4 className="text-xs font-bold text-green-700 uppercase mb-2">Tratamiento sugerido</h4>
                            {/* Texto reducido a sm para que quepa todo sin scroll excesivo */}
                            <p className="text-gray-600 text-sm leading-relaxed">{disease.trata}</p>
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default DiseaseModal;