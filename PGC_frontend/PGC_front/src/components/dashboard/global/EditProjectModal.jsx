import { useState } from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";

// Cambiamos 'proyecto' por 'project' y 'onSuccess' por 'onRefresh' para que coincida con el padre
function EditProjectModal({ project, onClose, onRefresh }) {
    // Validación de seguridad: Si no hay proyecto, no renderizamos nada
    if (!project) return null;

    const [nombre, setNombre] = useState(project.nombre_proyecto || "");
    const [desc, setDesc] = useState(project.descripcion || "");
    const [loading, setLoading] = useState(false);

    const projectId = project.id_proyecto || project.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/proyectos/editar/${projectId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre_proyecto: nombre,
                    descripcion: desc
                }),
            });

            if (response.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: '¡Proyecto Actualizado!',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: { popup: 'rounded-[2.5rem]' }
                });

                onRefresh(); // Llama a fetchUserProjects en el padre
                onClose();   // Cierra el modal después de guardar
            } else {
                const errorData = await response.json().catch(() => ({}));
                Swal.fire('Error', errorData.message || 'No se pudo actualizar', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error de conexión con el servidor', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-slate-800">Editar Proyecto</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-widest">Nombre del Proyecto</label>
                        <input
                            required
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-widest">Descripción</label>
                        <textarea
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 h-32 outline-none transition-all resize-none"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-lg hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Guardando..." : "Actualizar Proyecto"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProjectModal;