import LoginForm from "./LoginForm";
import { motion } from "framer-motion";
import potato1 from "../../../assets/icons/potato1.svg";
import { ArrowLeft, CheckCircle2 } from "lucide-react"; // Importamos el icono
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            <img
                src="https://eos.com/wp-content/uploads/2023/12/growing-potatoes-main.jpg.webp"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Campo"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/70 to-black/90"></div>

            <Link to="/" className="absolute top-8 left-8 z-20 text-white/70 hover:text-white flex items-center gap-2 transition-all group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Volver</span>
            </Link>

            <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center gap-16">
                {/* Texto Branding */}
                <div className="hidden md:block w-1/2 text-white">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-4 mb-6">
                            <h1 className="text-5xl font-black tracking-tighter">PapaSmart</h1>
                            <img src={potato1} className="w-12 h-12" alt="papa" />

                        </div>
                        <h2 className="text-2xl text-green-300 font-light mb-8">
                            Inteligencia Artificial para el <span className="text-white font-bold">éxito de tu cosecha.</span>
                        </h2>
                        <ul className="space-y-4 text-white/70">
                            {/* Reemplazamos emojis por iconos de Lucide */}
                            <li className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-green-400" /> Diagnóstico preciso en segundos
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-green-400" /> Gestión masiva por lotes
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-green-400" /> Reportes técnicos exportables
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Card de Login */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <motion.div
                        className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-2 text-center">Bienvenido</h3>
                        <p className="text-white/50 text-center mb-8 text-sm">Ingresa para gestionar tus cultivos</p>

                        <LoginForm />


                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Login;