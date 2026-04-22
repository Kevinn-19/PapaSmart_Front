import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, HelpCircle, Eye, EyeOff } from "lucide-react";
import Input from "../../ui/Input";
import Alert from "../../ui/Alert";
import { loginUser } from "../../../services/authService";
import { encryptPassword } from "../../../utils/crypto";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // IMPORTANTE: usar await
            const encrypted = await encryptPassword(password);
            const data = await loginUser(email, encrypted);

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.usuario));

            const role = Number(data.usuario.id_rol || data.usuario.rol_id);
            navigate(role === 1 ? "/admin-dashboard" : "/dashboard", { replace: true });
        } catch (err) {
            setError("Correo o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    // ESTILOS GLASSMORPHISM (Consistentes con el Register)
    const inputStyle = "bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl py-4 focus:ring-2 focus:ring-green-500/30 text-white placeholder:text-white/20 transition-all outline-none w-full";
    const labelStyle = "text-white/60 text-[10px] font-black uppercase tracking-[0.2em] ml-2 mb-1 block";

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            {error && <Alert message={error} />}

            {/* Input de Email */}
            <div className="space-y-2">
                <Input
                    label={<span className={labelStyle}>Email</span>}
                    type="email"
                    required
                    placeholder="usuario@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="text-white/40" size={18} />}
                    className={inputStyle}
                />
            </div>

            {/* Input de Contraseña con Ojo */}
            <div className="space-y-2 relative">
                <Input
                    label={<span className={labelStyle}>Contraseña</span>}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="text-white/40" size={18} />}
                    className={`${inputStyle} pr-12`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[42px] text-white/40 hover:text-green-400 transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {/* Botón de Ingreso */}
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-green-600 text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-green-900/20 hover:bg-green-500 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
                {loading ? "Verificando..." : "Ingresar al sistema"}
                {!loading && <ArrowRight size={18} />}
            </motion.button>

            {/* Links de navegación */}
            <div className="pt-2 space-y-4">
                <div className="flex justify-center">
                    <Link
                        to="/register"
                        className="flex items-center gap-2 text-white/50 hover:text-green-400 transition-all font-bold text-sm group"
                    >
                        <HelpCircle size={14} className="group-hover:rotate-12 transition-transform" />
                        ¿No tienes cuenta? Regístrate
                    </Link>
                </div>

                <div className="flex justify-center">
                    <Link
                        to="/forgot-password"
                        className="flex items-center gap-2 text-white/50 hover:text-green-400 transition-all font-bold text-sm group"
                    >
                        <HelpCircle size={14} className="group-hover:rotate-12 transition-transform" />
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;