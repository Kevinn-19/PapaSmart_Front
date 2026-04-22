import React from 'react';
import {
    X, Calendar, Clock,
    AlignLeft, ArrowRight
} from 'lucide-react';

const ProjectInfoModal = ({ isOpen, onClose, proyecto }) => {
    if (!isOpen || !proyecto) return null;

    return (
        /* Se aumentó el z-index a 9999 para que tape el Navbar y cualquier otro componente.
           Se añadió fixed inset-0 para asegurar que cubra toda la ventana.
        */
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">

            {/* Overlay para cerrar al hacer click fuera del contenedor blanco (opcional) */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Contenedor del Modal */}
            <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="relative bg-white p-8 pt-12 pb-6">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="text-left border-l-4 border-blue-600 pl-6">
                        <h2 className="text-3xl font-black text-slate-900 leading-tight uppercase italic tracking-tighter">
                            {proyecto.nombre_proyecto}
                        </h2>
                    </div>
                </div>

                {/* Cuerpo del Modal */}
                <div className="p-8 pt-2 space-y-6">

                    {/* Sección Descripción */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                            <AlignLeft size={14} strokeWidth={3} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Descripción del proyecto</span>
                        </div>
                        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 relative">
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                {proyecto.descripcion || "No se ha proporcionado una descripción detallada para este proyecto."}
                            </p>
                        </div>
                    </div>

                    {/* Grid de Datos */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                            <div className="text-indigo-500 mb-1">
                                <Calendar size={18} strokeWidth={2.5} />
                            </div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Fecha Registro</p>
                            <p className="text-slate-900 font-black text-sm">
                                {new Date(proyecto.fecha).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1 p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                            <div className="text-emerald-500 mb-1">
                                <Clock size={18} strokeWidth={2.5} />
                            </div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Hora Registro</p>
                            <p className="text-slate-900 font-black text-sm">
                                {new Date(proyecto.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4">
                        <button
                            onClick={onClose}
                            className="group relative w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-300 shadow-xl shadow-slate-200 overflow-hidden active:scale-[0.98]"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-3">
                                <span>Entendido y Cerrar</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                            {/* Efecto de brillo */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectInfoModal;