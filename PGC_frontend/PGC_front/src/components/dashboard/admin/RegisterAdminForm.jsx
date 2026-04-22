import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Loader2, Phone, Fingerprint, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import Input from "../../ui/Input";
import { encryptPassword } from "../../../utils/crypto";

function RegisterAdminForm() {
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        password: "",
        telefono: "",
        identificacion: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "telefono") {
            const val = value.replace(/\D/g, "");
            if (val.length <= 10) {
                setFormData(prev => ({ ...prev, [name]: val }));
            }
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const encrypted = await encryptPassword(formData.password);
            const payload = {
                ...formData,
                password: encrypted,
                tipo_persona: "Natural",
                tipo_identificacion: "CC",
                rol_id: 1,
                estado: 1
            };

            const response = await fetch("http://localhost:8000/usuarios/registro_ADMIN", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Administrador registrado',
                    background: '#0f172a',
                    color: '#fff',
                    confirmButtonColor: '#16a34a'
                });
                setFormData({ nombres: "", apellidos: "", correo: "", password: "", telefono: "", identificacion: "" });
            } else {
                throw new Error(data.detail || "Error al registrar");
            }
        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: error.message, background: '#1e293b', color: '#fff' });
        } finally {
            setLoading(false);
        }
    };

    // Estilos forzados para que NO se vea blanco
    const inputStyle = "bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500/40 text-white placeholder:text-slate-500 transition-all outline-none w-full block text-sm";
    const labelStyle = "text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1 mb-1 block";

    return (
        <div className="flex items-center justify-center py-0 px-4">
            <div className="max-w-lg w-full">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Fila: Nombres y Apellidos */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className={labelStyle}>Nombres</label>
                                <Input
                                    name="nombres"
                                    required
                                    placeholder="Nombre"
                                    value={formData.nombres}
                                    onChange={handleChange}
                                    icon={<User className="text-green-500" size={18} />}
                                    className={inputStyle}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className={labelStyle}>Apellidos</label>
                                <Input
                                    name="apellidos"
                                    required
                                    placeholder="Apellido"
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                    icon={<User className="text-green-500" size={18} />}
                                    className={inputStyle}
                                />
                            </div>
                        </div>

                        {/* Correo Electrónico */}
                        <div className="space-y-1">
                            <label className={labelStyle}>Email Institucional</label>
                            <Input
                                type="email"
                                name="correo"
                                required
                                placeholder="admin@correo.com"
                                value={formData.correo}
                                onChange={handleChange}
                                icon={<Mail className="text-green-500" size={18} />}
                                className={inputStyle}
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="space-y-1">
                            <label className={labelStyle}>Contraseña</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    icon={<Lock className="text-green-500" size={18} />}
                                    className={`${inputStyle} pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-green-400 transition-colors z-20"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Fila: Identificación y Teléfono */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className={labelStyle}>Identificación</label>
                                <Input
                                    name="identificacion"
                                    required
                                    placeholder="CC..."
                                    value={formData.identificacion}
                                    onChange={handleChange}
                                    icon={<Fingerprint className="text-green-500" size={18} />}
                                    className={inputStyle}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className={labelStyle}>Teléfono</label>
                                <Input
                                    name="telefono"
                                    required
                                    placeholder="300..."
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    icon={<Phone className="text-green-500" size={18} />}
                                    className={inputStyle}
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-green-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}
                            {loading ? "Registrando..." : "Crear Administrador"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default RegisterAdminForm;