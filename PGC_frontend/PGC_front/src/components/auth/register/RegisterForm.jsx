import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { Mail, Lock, User, Phone, Fingerprint, Building2, Eye, EyeOff, ChevronDown } from "lucide-react";

import Input from "../../ui/Input";

import Alert from "../../ui/Alert";

import Swal from "sweetalert2";
import { encryptPassword } from "../../../utils/crypto";



function RegisterForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);



    const [formData, setFormData] = useState({

        nombres: "",

        apellidos: "",

        correo: "",

        password: "",

        telefono: "",

        tipo_persona: "Natural",

        tipo_identificacion: "CC",

        identificacion: ""

    });



    useEffect(() => {

        setFormData(prev => ({

            ...prev,

            tipo_identificacion: formData.tipo_persona === "Natural" ? "CC" : "NIT"

        }));

    }, [formData.tipo_persona]);



    const handleChange = (e) => {

        const { name, value } = e.target;



        if (name === "telefono") {

            const val = value.replace(/\D/g, "");

            if (val.length <= 10) {

                setFormData(prev => ({ ...prev, [name]: val }));

            }

            return;

        }



        setFormData(prev => ({ ...prev, [name]: value }));

    };



    const handleRegister = async (e) => {

        e.preventDefault();



        if (!/^3\d{9}$/.test(formData.telefono)) {

            setError("El teléfono debe empezar por 3 y tener 10 dígitos");

            return;

        }



        setLoading(true);

        setError("");

        try {
            const encrypted = await encryptPassword(formData.password);
            const payload = {
                ...formData,
                password: encrypted,
                rol_id: 2,
                estado: 0
            };

            const response = await fetch("http://localhost:8000/usuarios/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });



            const data = await response.json();



            if (response.ok) {

                Swal.fire({

                    icon: 'success',

                    title: '¡Registro Exitoso!',

                    text: 'Ahora puedes iniciar sesión',

                    confirmButtonColor: '#16a34a',

                    customClass: { popup: 'rounded-[2rem]' }

                });

                navigate("/login");

            } else {

                if (typeof data.detail === 'object') {

                    setError(data.detail[0]?.msg || "Error de validación");

                } else {

                    setError(data.detail || "Error al registrarse");

                }

            }

        } catch (err) {

            setError("No se pudo conectar con el servidor");

        } finally {

            setLoading(false);

        }

    };



    const inputStyle = "bg-white/10 backdrop-blur-md border border-white/10 rounded-xl py-2.5 focus:ring-2 focus:ring-green-500/30 text-sm text-white placeholder:text-white/20 transition-all outline-none";

    const labelStyle = "text-white/60 text-[9px] font-black uppercase tracking-[0.15em] ml-2 mb-0.5 block";

    const readOnlyStyle = "h-[46px] flex items-center pl-12 bg-white/5 backdrop-blur-sm rounded-xl text-green-400 font-black text-xs relative border border-white/5";



    return (

        <form onSubmit={handleRegister} className="flex flex-col space-y-3">

            {error && <Alert message={error} className="py-2 text-xs" />}



            <div className="space-y-3">

                {/* FILA 1: Nombres y Apellidos (2 columnas) */}

                <div className="grid grid-cols-2 gap-3">

                    <Input

                        label={<span className={labelStyle}>{formData.tipo_persona === "Natural" ? "Nombres" : "Nombre Rep. Legal"}</span>}

                        name="nombres"

                        placeholder="Nombres"

                        required

                        value={formData.nombres}

                        onChange={handleChange}

                        icon={<User className="text-white/40" size={16} />}

                        className={inputStyle}

                    />

                    <Input

                        label={<span className={labelStyle}>{formData.tipo_persona === "Natural" ? "Apellidos" : "Apellido Rep. Legal"}</span>}

                        name="apellidos"

                        placeholder="Apellidos"

                        required

                        value={formData.apellidos}

                        onChange={handleChange}

                        icon={<User className="text-white/40" size={16} />}

                        className={inputStyle}

                    />

                </div>



                {/* FILA 2: Email (1 columna - Línea sola) */}

                <div className="w-full">

                    <Input

                        label={<span className={labelStyle}>{formData.tipo_persona === "Natural" ? "Email" : "Email Corporativo"}</span>}

                        type="email"

                        name="correo"

                        placeholder="correo@ejemplo.com"

                        required

                        value={formData.correo}

                        onChange={handleChange}

                        icon={<Mail className="text-white/40" size={16} />}

                        className={inputStyle}

                    />

                </div>



                {/* FILA 3: Contraseña (1 columna - Línea sola) */}

                <div className="relative w-full">

                    <Input

                        label={<span className={labelStyle}>Contraseña</span>}

                        type={showPassword ? "text" : "password"}

                        name="password"

                        placeholder="••••••••"

                        required

                        value={formData.password}

                        onChange={handleChange}

                        icon={<Lock className="text-white/40" size={16} />}

                        className={`${inputStyle} pr-10`}

                    />

                    <button

                        type="button"

                        onClick={() => setShowPassword(!showPassword)}

                        className="absolute right-3 top-[32px] text-white/40 hover:text-green-400 transition-colors"

                    >

                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}

                    </button>

                </div>



                {/* FILA 4: Tipo Persona y Tipo Documento (2 columnas) */}

                <div className="grid grid-cols-2 gap-3">

                    <div className="space-y-1">

                        <label className={labelStyle}>Tipo Persona</label>

                        <div className="relative">

                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 z-10" size={16} />

                            <select

                                name="tipo_persona"

                                value={formData.tipo_persona}

                                onChange={handleChange}

                                className={`${inputStyle} w-full pl-11 pr-8 appearance-none cursor-pointer h-[46px] font-medium text-xs`}

                            >

                                <option value="Natural" className="text-slate-900">Natural</option>

                                <option value="Jurídica" className="text-slate-900">Jurídica</option>

                            </select>

                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={14} />

                        </div>

                    </div>



                    <div className="space-y-1">

                        <label className={labelStyle}>Tipo Documento</label>

                        <div className={readOnlyStyle}>

                            <Fingerprint className="absolute left-4 text-white/30" size={16} />

                            {formData.tipo_identificacion}

                        </div>

                    </div>

                </div>



                {/* FILA 5: Documento y Teléfono (2 columnas) */}

                <div className="grid grid-cols-2 gap-3">

                    <Input

                        label={<span className={labelStyle}>Número Documento</span>}

                        name="identificacion"

                        placeholder="Documento"

                        required

                        value={formData.identificacion}

                        onChange={handleChange}

                        icon={<Fingerprint className="text-white/40" size={16} />}

                        className={inputStyle}

                    />

                    <Input

                        label={<span className={labelStyle}>Teléfono</span>}

                        name="telefono"

                        placeholder="3001234567"

                        required

                        value={formData.telefono}

                        onChange={handleChange}

                        icon={<Phone className="text-white/40" size={16} />}

                        className={inputStyle}

                        maxLength={10}

                    />

                </div>

            </div>



            <motion.button

                whileHover={{ scale: 1.01 }}

                whileTap={{ scale: 0.98 }}

                disabled={loading}

                className="w-full bg-green-600 text-white py-3.5 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-green-500 transition-all flex items-center justify-center disabled:opacity-70 mt-1"

            >

                {loading ? "Registrando..." : "Crear cuenta"}

            </motion.button>

        </form>

    );

}



export default RegisterForm;