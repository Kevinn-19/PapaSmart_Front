import { useState, useEffect } from "react";
import { Lock, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import potato1 from "../../../assets/icons/potato1.svg";
import { encryptPassword } from "../../../utils/crypto";

function ConfirmReset() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const tokenURL = searchParams.get("token") || "";

    const [formData, setFormData] = useState({ token: tokenURL, nueva_password: "" });
    const [showPassword, setShowPassword] = useState(false); // Estado para ver password
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (tokenURL) setFormData(prev => ({ ...prev, token: tokenURL }));
    }, [tokenURL]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            // 2. ENCRIPTA LA CONTRASEÑA ANTES DE ENVIAR
            const passwordEncriptada = await encryptPassword(formData.nueva_password);

            // Creamos el cuerpo con la contraseña ya cifrada
            const payload = {
                token: formData.token,
                nueva_password: passwordEncriptada
            };

            const response = await fetch("http://localhost:8000/usuarios/confirmar-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), // Enviamos el payload con la clave cifrada
            });

            if (response.ok) {
                setMessage({ type: "success", text: "¡Contraseña actualizada! Redirigiendo..." });
                setTimeout(() => navigate("/login"), 3000);
            } else {
                const data = await response.json();
                const errorMsg = Array.isArray(data.detail) ? data.detail[0]?.msg : data.detail;
                setMessage({ type: "error", text: errorMsg || "Enlace inválido o expirado" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error de conexión" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans">
            <img
                src="https://eos.com/wp-content/uploads/2023/12/growing-potatoes-main.jpg.webp"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Campo"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/70 to-black/90"></div>

            <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center gap-16">

                {/* Branding Lateral */}
                <div className="hidden md:block w-1/2 text-white">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-4 mb-6">
                            <h1 className="text-5xl font-black tracking-tighter text-white">PapaSmart</h1>
                            <img src={potato1} className="w-12 h-12" alt="papa" />
                        </div>
                        <h2 className="text-2xl text-green-300 font-light mb-8">
                            Seguridad garantizada. <span className="text-white font-bold">Crea una contraseña fuerte</span> para proteger tu información.
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
                        <h3 className="text-3xl font-bold text-white mb-2 text-center">Nueva Clave</h3>
                        <p className="text-white/50 text-center mb-8 text-sm">Define tu nueva contraseña de acceso</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Contraseña</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-400 transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:ring-2 focus:ring-green-500/20 outline-none transition-all placeholder:text-white/20"
                                        placeholder="Mínimo 8 caracteres"
                                        value={formData.nueva_password}
                                        onChange={(e) => setFormData({ ...formData, nueva_password: e.target.value })}
                                    />
                                    {/* Botón Ojo */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {message && (
                                <div className={`p-4 rounded-xl text-xs font-bold text-center border ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}`}>
                                    {message.text}
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading || !tokenURL}
                                className="w-full bg-green-600 text-white py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-green-500 shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? "Guardando..." : "Cambiar Contraseña"}
                                <ArrowRight size={18} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmReset;
