import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, FolderOpen, Calendar,
    Trash2, ArrowRight, Loader2, Settings, Info, Pencil
} from "lucide-react";
import Swal from "sweetalert2";
import EditProjectModal from "../global/EditProjectModal";
import ProjectInfoModal from "../global/ProjectInfoModal"; // <-- Nuevo Import

const UserProjects = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuAbierto, setMenuAbierto] = useState(null);

    // Estados de Modales
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchUserProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/proyectos/usuario/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setProyectos(data.proyectos || []);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProjects();
    }, [userId]);

    const handleOpenInfo = (proyecto) => {
        setSelectedProject(proyecto);
        setIsInfoModalOpen(true);
    };

    const handleOpenEdit = (proyecto) => {
        setSelectedProject(proyecto);
        setIsEditModalOpen(true);
        setMenuAbierto(null);
    };

    const handleDelete = async (e, projectId) => {
        e.stopPropagation();
        setMenuAbierto(null);
        const result = await Swal.fire({
            title: '<span class="font-black italic">¿ELIMINAR PROYECTO?</span>',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'SÍ, ELIMINAR',
            cancelButtonText: 'CANCELAR',
            customClass: {
                popup: 'rounded-[2.5rem]',
                confirmButton: 'rounded-xl font-black text-xs px-6 py-3',
                cancelButton: 'rounded-xl font-black text-xs px-6 py-3'
            }
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8000/proyectos/eliminar/${projectId}`, { method: 'DELETE' });
                if (response.ok) {
                    await Swal.fire({
                        title: 'ELIMINADO',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                        customClass: { popup: 'rounded-[2.5rem]' }
                    });
                    fetchUserProjects();
                }
            } catch (error) { console.error(error); }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans" onClick={() => setMenuAbierto(null)}>
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Header de la Página */}
                    <div className="flex flex-col mb-8 gap-4 border-b border-slate-200 pb-6">
                        <div>
                            <button
                                onClick={() => navigate('/admin-dashboard/list-users')}
                                className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-black text-[10px] uppercase tracking-[0.2em] mb-4 group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Regresar a Usuarios
                            </button>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight italic uppercase">Proyectos del Usuario</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">ID #{userId}</span>
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs font-black">
                                    {proyectos.length} {proyectos.length === 1 ? 'Proyecto' : 'Proyectos'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Proyectos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                        {loading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="animate-spin text-blue-600" size={40} />
                                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Sincronizando...</p>
                            </div>
                        ) : proyectos.length > 0 ? (
                            proyectos.map((proyecto) => (
                                <div key={proyecto.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group flex items-center gap-6 relative">

                                    <div className="flex-shrink-0 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-slate-200">
                                        <FolderOpen size={24} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-black text-slate-800 uppercase truncate mb-1 italic">{proyecto.nombre_proyecto}</h3>
                                        <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                                            <Calendar size={12} className="text-blue-500" />
                                            {proyecto.fecha ? new Date(proyecto.fecha).toLocaleDateString() : 'S/F'}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleOpenInfo(proyecto); }}
                                            className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all active:scale-95"
                                            title="Ver Info"
                                        >
                                            <Info size={18} strokeWidth={2.5} />
                                        </button>

                                        <button
                                            onClick={() => navigate(`/admin-dashboard/project-details/${proyecto.id}`)}
                                            className="p-3 bg-slate-50 text-slate-900 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
                                            title="Ver Reporte"
                                        >
                                            <ArrowRight size={18} strokeWidth={2.5} />
                                        </button>

                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setMenuAbierto(menuAbierto === proyecto.id ? null : proyecto.id);
                                                }}
                                                className={`p-3 rounded-xl transition-all active:scale-95 ${menuAbierto === proyecto.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-200'}`}
                                            >
                                                <Settings size={18} strokeWidth={2.5} className={menuAbierto === proyecto.id ? 'rotate-90 duration-300' : ''} />
                                            </button>

                                            {menuAbierto === proyecto.id && (
                                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 p-1.5 animate-in fade-in zoom-in-95">
                                                    <button
                                                        onClick={() => handleOpenEdit(proyecto)}
                                                        className="w-full flex items-center gap-3 p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                                                    >
                                                        <Pencil size={16} className="text-emerald-500" /> Editar
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDelete(e, proyecto.id)}
                                                        className="w-full flex items-center gap-3 p-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                    >
                                                        <Trash2 size={16} /> Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                No hay proyectos registrados para este usuario.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal de Información */}
            <ProjectInfoModal
                isOpen={isInfoModalOpen}
                onClose={() => {
                    setIsInfoModalOpen(false);
                    setSelectedProject(null);
                }}
                proyecto={selectedProject}
            />

            {/* Modal de Edición */}
            {isEditModalOpen && selectedProject && (
                <EditProjectModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedProject(null);
                    }}
                    project={selectedProject}
                    onRefresh={fetchUserProjects}
                />
            )}
        </div>
    );
};

export default UserProjects;