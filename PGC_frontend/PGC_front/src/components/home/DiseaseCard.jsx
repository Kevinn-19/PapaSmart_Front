import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DiseaseCard({ disease, onClick }) {
    const [imgIndex, setImgIndex] = useState(0);

    // Carrusel global de la carta
    useEffect(() => {
        const interval = setInterval(() => {
            setImgIndex((prev) => (prev + 1) % disease.images.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [disease.images.length]);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => onClick(disease, imgIndex)}
            className="cursor-pointer relative h-80 rounded-2xl shadow-xl overflow-hidden bg-black group"
        >
            <div className="absolute inset-0 w-full h-full bg-gray-900">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={imgIndex}
                        src={disease.images[imgIndex]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full object-cover blur-[2px] group-hover:blur-0 group-hover:opacity-100 transition-all duration-1000"
                    />
                </AnimatePresence>
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-lg">
                    {disease.name}
                </h3>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {disease.images.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-700 ${i === imgIndex ? 'bg-green-500 w-8' : 'bg-white/30 w-2'
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default DiseaseCard;