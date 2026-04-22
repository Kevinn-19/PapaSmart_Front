import { useState } from "react";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import potato1 from "../../../assets/icons/potato1.svg";

function RequestReset() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const response = await fetch("http://localhost:8000/usuarios/solicitar-recuperacion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: email.trim() }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: "success", text: "Enlace enviado. Revisa tu correo electrónico." });
            } else {
                const errorMsg = Array.isArray(data.detail) ? data.detail[0]?.msg : data.detail;
                setMessage({ type: "error", text: errorMsg || "Error al solicitar el enlace" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error de conexión con el servidor" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans">
            {/* Imagen de fondo y Overlay */}
            <img
                src="https://eos.com/wp-content/uploads/2023/12/growing-potatoes-main.jpg.webp"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Campo"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/70 to-black/90"></div>

            <Link to="/login" className="absolute top-8 left-8 z-20 text-white/70 hover:text-white flex items-center gap-2 transition-all group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium text-white">Volver al Login</span>
            </Link>

            <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center gap-16">

                {/* Branding Lateral */}
                <div className="hidden md:block w-1/2 text-white">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-4 mb-6">
                            <h1 className="text-5xl font-black tracking-tighter">PapaSmart</h1>
                            <img src={potato1} className="w-12 h-12" alt="papa" />

                        </div>
                        <h2 className="text-2xl text-green-300 font-light mb-8">
                            Recupera tu acceso para seguir <span className="text-white font-bold">protegiendo tus cultivos.</span>
                        </h2>

                    </motion.div>
                </div>

                {/* Card Glassmorphism */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <motion.div
                        className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-2 text-center text-white">Recuperar Cuenta</h3>
                        <p className="text-white/50 text-center mb-8 text-sm">Ingresa tu correo para recibir el enlace</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-400 transition-colors" size={18} />
                                    <input
                                        type="email" required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-green-500/20 outline-none transition-all placeholder:text-white/20"
                                        placeholder="usuario@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {message && (
                                <div className={`p-4 rounded-xl text-xs font-bold text-center border ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                className="w-full bg-white text-slate-900 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? "Enviando..." : "Enviar enlace"}
                                <ArrowRight size={18} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default RequestReset;