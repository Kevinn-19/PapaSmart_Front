import { useState } from "react";
import { Calendar, ArrowRight, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../services/authService";
import EditProjectModal from "./EditProjectModal";
import Swal from "sweetalert2";

function ProjectCard({ proyecto, onRefresh }) {
    const [showMenu, setShowMenu] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const navigate = useNavigate();
    const user = getUser();

    const projectId = proyecto.id_proyecto || proyecto.id;
    const canManage = Number(user?.rol) === 1 || Number(user?.estado) === 1;

    // Límite de 25 caracteres para el título
    const formatName = (name) => {
        return name?.length > 25 ? name.substring(0, 25) + "..." : name;
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        setShowMenu(false);
        const result = await Swal.fire({
            title: '<span class="font-black">¿Eliminar proyecto?</span>',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Sí, eliminar',
            customClass: { popup: 'rounded-[2.5rem]' }
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8000/proyectos/eliminar/${projectId}`, { method: 'DELETE' });
                if (response.ok) {
                    await Swal.fire({ title: 'Eliminado', icon: 'success', showConfirmButton: false, timer: 1000, customClass: { popup: 'rounded-[2.5rem]' } });
                    if (typeof onRefresh === "function") onRefresh();
                }
            } catch (error) { console.error(error); }
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative flex flex-col h-full">

            {canManage && (
                <div className="absolute top-6 right-6 z-30">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 active:scale-90"
                    >
                        <MoreVertical size={20} />
                    </button>

                    {showMenu && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>
                            <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-slate-50 z-20 py-2 animate-in fade-in zoom-in-95">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsEditOpen(true); setShowMenu(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    <Edit2 size={16} className="text-blue-500" /> Editar Proyecto
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={16} /> Eliminar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Cabecera: Título */}
            <div className="mb-2 pr-10">
                <h3 className="text-xl font-black text-slate-800 leading-tight truncate" title={proyecto.nombre_proyecto}>
                    {formatName(proyecto.nombre_proyecto)}
                </h3>
            </div>

            {/* Cuerpo: Descripción con altura fija para 3 líneas */}
            {/* Cuerpo: Descripción con altura fija y ruptura de palabras */}
            <div className="mb-6">
                <p
                    className={`text-slate-500 text-sm font-medium leading-relaxed overflow-hidden break-words ${!proyecto.descripcion ? 'italic text-slate-300' : ''}`}
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical',
                        minHeight: '4.5rem', // Altura fija para 3 líneas
                        maxHeight: '4.5rem',
                        wordBreak: 'break-word' // Fuerza la ruptura de palabras gigantes
                    }}
                >
                    {proyecto.descripcion || "Sin descripción disponible para este proyecti. Agregue detalles para una mejor gestión de sus cultivos."}
                </p>
            </div>

            {/* Pie: Fecha y Botón */}
            <div className="mt-auto space-y-5">
                <div className="flex items-center gap-1.5 bg-slate-50 w-fit px-3 py-1.5 rounded-full border border-slate-100">
                    <Calendar size={13} className="text-slate-400" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">
                        {proyecto.fecha
                            ? new Date(proyecto.fecha).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })
                            : 'S/F'}
                    </span>
                </div>

                <button
                    onClick={() => navigate(`/proyecto/${projectId}`)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
                >
                    Detalles del Proyecto
                    <ArrowRight size={16} />
                </button>
            </div>

            {isEditOpen && (
                <EditProjectModal
                    project={proyecto}
                    onClose={() => setIsEditOpen(false)}
                    onRefresh={() => {
                        setIsEditOpen(false);
                        if (typeof onRefresh === "function") onRefresh();
                    }}
                />
            )}
        </div>
    );
}

export default ProjectCard;