import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "https://solofruver.com/wp-content/uploads/2020/05/agrotendencia-papatransgenica.jpg",
    "https://agriculture.basf.com/api/imaging/focalarea/16x9/3872x/dam/jcr%3A90c36d47-47f9-3cac-89e2-df4a6c8a7298/CO-cultivo-de-papa.jpg",
    "https://blog.cambiagro.com/wp-content/uploads/2024/07/cover-guia-cutlivo-papa.jpg",
    "https://cdn0.ecologiaverde.com/es/posts/6/0/1/cuando_cosechar_papas_o_patatas_2106_3_600.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/073/978/305/small/potatoes-growing-in-a-sunny-farm-field-fresh-potatoes-grow-in-rich-soil-surrounded-by-green-leaves-under-a-bright-sky-highlighting-agricultural-growth-photo.jpg",
    "https://agriculture.basf.com/api/imaging/focalarea/16x9/4096x/dam/jcr%3Af98d1f4c-1f02-3a61-b6f1-53308e2bf956/CL-cultivo-de-papa.jpg",
    "https://i.pinimg.com/736x/e1/4e/76/e14e768850746d79f660590ae2dbaad2.jpg"
];

function Carousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getIndex = (offset) => {
        return (index + offset + images.length) % images.length;
    };

    return (
        <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden py-10 bg-gray-50">
            <div className="relative flex items-center justify-center w-full max-w-7xl h-full">

                <AnimatePresence initial={false} mode="popLayout">
                    {[-1, 0, 1].map((offset) => {
                        const imgIdx = getIndex(offset);
                        const isCenter = offset === 0;

                        return (
                            <motion.div
                                key={`${images[imgIdx]}-${offset}`}
                                // 🌟 Animación de entrada: Suave desde el fondo
                                initial={{
                                    opacity: 0,
                                    scale: 0.5,
                                    x: offset * 400,
                                    filter: "blur(10px)"
                                }}
                                animate={{
                                    opacity: isCenter ? 1 : 0.4,
                                    scale: isCenter ? 1 : 0.75,
                                    x: offset * (window.innerWidth < 768 ? 220 : 480),
                                    zIndex: isCenter ? 30 : 10,
                                    filter: isCenter ? "blur(0px)" : "blur(2px)",
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.5,
                                    x: offset * -400,
                                    filter: "blur(10px)"
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120, // Rigidez menor = más suavidad
                                    damping: 20,    // Amortiguación para evitar rebotes bruscos
                                    mass: 1,
                                    opacity: { duration: 0.6 }
                                }}
                                className="absolute w-[80%] md:w-[650px] h-[280px] md:h-[420px] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white"
                            >
                                <img
                                    src={images[imgIdx]}
                                    alt={`Slide ${imgIdx}`}
                                    className="w-full h-full object-cover select-none"
                                />
                                {/* Capa oscura para los laterales para dar profundidad */}
                                {!isCenter && (
                                    <div className="absolute inset-0 bg-green-950/20" />
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

            </div>

            {/* Indicadores suaves */}
            <div className="absolute bottom-8 flex gap-3">
                {images.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            width: i === index ? 32 : 8,
                            backgroundColor: i === index ? "#16a34a" : "#d1d5db"
                        }}
                        className="h-2 rounded-full cursor-pointer"
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Carousel;