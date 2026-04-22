import RegisterForm from "./RegisterForm";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import potato1 from "../../../assets/icons/potato1.svg";

function Register() {
    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden py-6">
            {/* Background */}
            <img
                src="https://eos.com/wp-content/uploads/2023/12/growing-potatoes-main.jpg.webp"
                className="fixed inset-0 w-full h-full object-cover"
                alt="Campo"
            />
            <div className="fixed inset-0 bg-gradient-to-br from-green-900/90 via-black/80 to-black/95"></div>

            <Link to="/login" className="absolute top-6 left-6 z-20 text-white/70 hover:text-white flex items-center gap-2 transition-all group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Volver</span>
            </Link>

            {/* Reducimos el gap de 8 a 6 */}
            <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center gap-6">

                {/* Texto Branding - Compactado */}
                <div className="hidden md:block w-2/5 text-white">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        {/* Eliminado el emoji, ajustado el margen */}
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-5xl font-black tracking-tighter text-green-400">Únete</h1>
                            <img src={potato1} className="w-12 h-12" alt="papa" />
                        </div>
                        <h2 className="text-2xl font-light mb-3 leading-tight max-w-xs">
                            Comienza a optimizar <span className="text-white font-bold italic">tus cultivos hoy mismo.</span>
                        </h2>
                        <p className="text-white/50 text-base max-w-sm">
                            Crea una cuenta gratuita y accede al análisis de salud por IA.
                        </p>
                    </motion.div>
                </div>

                {/* Card de Registro - Achicado a los lados */}
                <div className="w-full md:w-3/5 flex justify-center">
                    <motion.div
                        /* Cambiado max-w-2xl a max-w-xl para achicar a los lados */
                        className="bg-white/10 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] shadow-2xl w-full max-w-xl border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Icono de Usuario centrado */}


                        <h3 className="text-2xl font-bold text-white mb-1 text-center">Crear Cuenta</h3>

                        <RegisterForm />

                        <p className="mt-4 text-center text-white/50 text-xs">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login" className="text-green-400 font-bold hover:underline">Inicia sesión</Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Register;