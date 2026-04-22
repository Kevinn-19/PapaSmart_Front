import React, { useEffect } from 'react'; // Importamos useEffect para el log
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import { isAuthenticated, getUser } from "../../services/authService";
import potato2 from "../../assets/icons/potato2.svg";

function NotFound() {
    const isAuth = isAuthenticated();
    const user = getUser();

    // Convertimos a número por si acaso viene como string "1"
    const rol = user ? Number(user.rol_id) : null;

    // --- BLOQUE DE DEPURACIÓN ---
    useEffect(() => {
        console.log("--- DEBUG NOT FOUND ---");
        console.log("¿Está autenticado?:", isAuth);
        console.log("Objeto User completo:", user);
        console.log("Valor de id_rol:", user?.id_rol);
        console.log("Tipo de dato id_rol:", typeof user?.id_rol);
        console.log("Valor procesado de rol:", rol);
        console.log("Ruta destino:", rol === 1 ? "/admin/dashboard" : "/dashboard");
    }, [isAuth, user, rol]);
    // ----------------------------

    const getDashboardPath = () => {
        if (rol === 1) return "/admin-dashboard";
        return "/dashboard";
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden relative">
            {/* Fondo gradientes */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-100 rounded-full blur-[120px] opacity-70"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[150px] opacity-80"></div>
            </div>

            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block mb-6"
                >
                    <div className="relative">
                        <img src={potato2} alt="404" className="w-28 h-28 mx-auto drop-shadow-2xl" />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-[10rem] md:text-[14rem] font-black leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-b from-green-600 to-emerald-900 opacity-20 select-none">
                    404
                </h1>

                <div className="max-w-md mx-auto -mt-12 md:-mt-20">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                        Página no encontrada
                    </h2>

                    <div className="mb-10">
                        <Link to={isAuth ? getDashboardPath() : "/"}>
                            <button className="group flex items-center gap-3 px-10 py-4 bg-green-600 text-white font-bold rounded-2xl shadow-lg hover:bg-green-700 transition-all hover:scale-105 active:scale-95 mx-auto">
                                {isAuth ? <Home size={22} /> : <ArrowLeft size={22} />}
                                <span>
                                    {!isAuth
                                        ? "Volver al Inicio"
                                        : rol === 1
                                            ? "Volver al Dashboard"
                                            : "Volver al Dashboard"
                                    }
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;