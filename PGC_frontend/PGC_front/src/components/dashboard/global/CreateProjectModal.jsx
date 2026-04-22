import { useState } from "react";
import { getUser } from "../../../services/authService";
import { X } from "lucide-react";
import Swal from "sweetalert2";

function CreateProjectModal({ onClose, onSuccess, currentProjectsCount }) {
    const [nombre, setNombre] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const user = getUser();

    const isRestricted = Number(user?.estado) === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRestricted && currentProjectsCount >= 1) {
            Swal.fire({
                title: '<span class="font-black">Límite de Plan</span>',
                html: `<p class="text-slate-600">Tu cuenta actual solo permite gestionar <b>1 proyecto</b>.</p>`,
                icon: 'info',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#16a34a',
                customClass: { popup: 'rounded-[2.5rem]' }
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/proyectos/crear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre_proyecto: nombre,
                    descripcion: desc,
                    usuario_id: user.id_usuario || user.id
                }),
            });

            if (response.ok) {
                // CRÍTICO: Esperar a que SweetAlert cierre antes de llamar a onSuccess
                await Swal.fire({
                    icon: 'success',
                    title: '¡Lote Creado!',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: { popup: 'rounded-[2.5rem]' }
                });

                // Solo después del check verde, notificamos al padre
                onSuccess();
            } else {
                throw new Error("Error en el servidor");
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo procesar la solicitud', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800">Nuevo Lote</h2>
                        {isRestricted && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-black uppercase tracking-tighter">Plan Gratuito</span>}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-widest">Nombre</label>
                        <input
                            required
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                            placeholder="Ej: Lote Sabanera"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-widest">Descripción</label>
                        <textarea
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 h-32 outline-none transition-all resize-none"
                            placeholder="Detalles opcionales..."
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-green-600 text-white font-black rounded-2xl shadow-lg hover:bg-green-700 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Verificando..." : "Confirmar y Crear"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectModal;