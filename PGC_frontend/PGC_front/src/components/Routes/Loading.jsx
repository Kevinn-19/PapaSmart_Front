import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import potato2 from "../../assets/icons/potato2.svg";

function Loading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden relative">

            {/* Fondo con gradientes vibrantes (Mismo estilo que NotFound) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-100 rounded-full blur-[120px] opacity-70"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[150px] opacity-80"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-50 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 text-center">

                {/* Contenedor del Icono y Spinner */}
                <div className="relative inline-block mb-12">

                    {/* Spinner exterior animado con Framer Motion */}
                    <motion.div
                        className="absolute inset-[-20px] rounded-full border-t-4 border-l-4 border-green-600/30 border-t-green-600"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Icono de la Patata con efecto de flotación y latido */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [0.9, 1.05, 0.9],
                            opacity: 1,
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        <img
                            src={potato2}
                            alt="Cargando..."
                            className="w-32 h-32 mx-auto drop-shadow-2xl brightness-95 contrast-110"
                        />
                    </motion.div>
                </div>

                {/* Textos de carga */}
                <div className="max-w-md mx-auto">
                    <motion.h2
                        className="text-3xl font-black text-gray-900 mb-2 tracking-tight"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Analizando cultivos
                    </motion.h2>

                    <motion.div
                        className="flex items-center justify-center gap-2 text-gray-500 text-lg font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Loader2 size={20} className="animate-spin text-green-600" />
                        <span>Espera un momento...</span>
                    </motion.div>

                    {/* Barra de progreso sutil */}
                    <div className="mt-8 w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loading;