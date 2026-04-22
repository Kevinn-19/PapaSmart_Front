import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ShieldAlert, Lock } from "lucide-react";
import { getUser } from "../../services/authService";
import potato2 from "../../assets/icons/potato2.svg";

function AccessDenied() {
    const user = getUser();
    const roleId = Number(user?.rol_id);

    // Definir a dónde enviar al usuario según su rol
    const getRedirectPath = () => {
        if (roleId === 1) return "/admin-dashboard";
        if (roleId === 2) return "/dashboard";
        return "/";
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden relative">
            {/* Fondo con Gradientes */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-100 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-100 rounded-full blur-[150px] opacity-70"></div>
            </div>

            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block mb-6"
                >
                    <div className="relative">
                        <img
                            src={potato2}
                            alt="403"
                            className="w-28 h-28 mx-auto drop-shadow-2xl grayscale opacity-80"
                        />
                        <motion.div
                            className="absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-full shadow-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        >
                            <Lock size={20} />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-[10rem] md:text-[14rem] font-black leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-400 to-gray-800 opacity-20 select-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    403
                </motion.h1>

                <div className="max-w-md mx-auto -mt-12 md:-mt-20">
                    <motion.h2
                        className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Acceso Restringido
                    </motion.h2>

                    <motion.p
                        className="text-gray-500 text-lg mb-10 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        No tienes los permisos necesarios para cultivar en esta zona.
                        Tu nivel de acceso no permite entrar aquí.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link to={getRedirectPath()}>
                            <button className="group flex items-center gap-3 px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all hover:scale-105 active:scale-95 mx-auto">
                                <Home size={22} />
                                <span>Volver a mi Panel</span>
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default AccessDenied;