import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Asegúrate de tener instalado react-router-dom
import potato2 from "../../assets/icons/potato2.svg";

function Hero() {
    return (
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 text-white overflow-hidden">

            {/* Decoración de fondo */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Lado Izquierdo: Texto y Botón único */}
                <div className="flex-1 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center md:justify-start gap-3 mb-6"
                    >
                        <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
                            PapaSmart
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Monitorea la salud de tu <br />
                        <span className="text-green-300">Cultivo de Papa</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-green-50 font-light max-w-xl mb-10 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Detección inteligente de enfermedades mediante IA, reportes detallados y gestión de proyectos en tiempo real.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex justify-center md:justify-start"
                    >
                        {/* Botón único hacia Login */}
                        <Link to="/login">
                            <button className="group relative px-10 py-4 bg-white text-green-700 font-bold rounded-2xl shadow-2xl hover:bg-green-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                                Comenzar ahora
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Lado Derecho: Logo animado */}
                <motion.div
                    className="flex-shrink-0 relative"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.3
                    }}
                >
                    <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>
                    <img
                        src={potato2}
                        alt="PapaSmart Logo"
                        className="relative w-40 h-40 md:w-64 md:h-64 drop-shadow-2xl"
                    />
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;