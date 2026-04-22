import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, FolderOpen, Calendar,
    Trash2, ArrowRight, Loader2, Settings, Info, Pencil, Clock, AlignLeft
} from "lucide-react";
import Swal from "sweetalert2";
import EditProjectModal from "../global/EditProjectModal";

const UserProjects = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuAbierto, setMenuAbierto] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

    const showInfo = (proyecto) => {
        Swal.fire({
            title: `
                <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FolderOpen size={20} />
                    </div>
                    <span class="font-black text-xl uppercase text-slate-800 tracking-tight">${proyecto.nombre_proyecto}</span>
                </div>
            `,
            html: `
                <div class="text-left mt-6 space-y-6">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="p-1 bg-slate-100 text-slate-500 rounded-md"><AlignLeft size={14}/></span>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Descripción del Proyecto</p>
                        </div>
                        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p class="text-slate-700 font-medium leading-relaxed">${proyecto.descripcion || 'Sin descripción disponible'}</p>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                            <div class="flex items-center gap-2 mb-1">
                                <Calendar size={14} className="text-blue-500" />
                                <p class="text-[10px] font-black text-blue-600 uppercase">Fecha</p>
                            </div>
                            <p class="text-slate-800 font-bold">${new Date(proyecto.fecha).toLocaleDateString()}</p>
                        </div>
                        <div class="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                            <div class="flex items-center gap-2 mb-1">
                                <Clock size={14} className="text-indigo-500" />
                                <p class="text-[10px] font-black text-indigo-600 uppercase">Hora</p>
                            </div>
                            <p class="text-slate-800 font-bold">${new Date(proyecto.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>
                </div>
            `,
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0f172a',
            customClass: {
                popup: 'rounded-[2.5rem] p-8',
                confirmButton: 'rounded-xl px-8 py-3 font-bold uppercase text-xs tracking-widest'
            }
        });
    };

    const handleDelete = async (e, projectId) => {
        e.stopPropagation();
        setMenuAbierto(null);
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
                    fetchUserProjects();
                }
            } catch (error) { console.error(error); }
        }
    };

    const handleOpenEdit = (proyecto) => {
        setSelectedProject(proyecto);
        setIsEditModalOpen(true);
        setMenuAbierto(null);
    };

    return (
        /* Se eliminó h-full y overflow-hidden para permitir que el contenido dicte la altura */
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans" onClick={() => setMenuAbierto(null)}>
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

                    <div className="flex flex-col mb-8 gap-4 border-b border-slate-200 pb-6">
                        <div>
                            <button
                                onClick={() => navigate('/admin-dashboard/list-users')}
                                className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-black text-[10px] uppercase tracking-[0.2em] mb-4 group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Regresar a Listado de Usuarios
                            </button>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight italic">Proyectos del Usuario</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">ID #{userId}</span>
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs font-black">
                                    {proyectos.length} {proyectos.length === 1 ? 'Proyecto' : 'Proyectos'}
                                </span>
                            </div>
                        </div>
                    </div>

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
                                        <h3 className="text-lg font-black text-slate-800 uppercase truncate mb-1">{proyecto.nombre_proyecto}</h3>
                                        <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                                            <Calendar size={12} className="text-blue-500" />
                                            {proyecto.fecha ? new Date(proyecto.fecha).toLocaleDateString() : 'S/F'}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {/* 1. Información */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); showInfo(proyecto); }}
                                            className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all active:scale-95"
                                            title="Información"
                                        >
                                            <Info size={18} strokeWidth={2.5} />
                                        </button>

                                        {/* 2. Detalles */}
                                        <button
                                            onClick={() => navigate(`/admin-dashboard/project-details/${proyecto.id}`)} // <-- Verifica esta ruta
                                            className="p-3 bg-slate-50 text-slate-900 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
                                            title="Ver detalles"
                                        >
                                            <ArrowRight size={18} strokeWidth={2.5} />
                                        </button>

                                        {/* 3. Configuración */}
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

            {/* Modal de Edición - Ahora se renderiza condicionalmente de forma correcta */}
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