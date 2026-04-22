import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { getUser } from "../../../services/authService";
import ProjectCard from "../global/ProjectCard";
import CreateProjectModal from "../global/CreateProjectModal";

function AdminProjects() {
    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = getUser();

    const fetchMisProyectos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/proyectos/usuario/${user?.id || user?.id_usuario}`);
            const data = await response.json();
            setProyectos(data.proyectos || []);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    useEffect(() => { fetchMisProyectos(); }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4">
            {/* Header adaptado a móviles */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Mis Proyectos</h2>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto bg-blue-600 text-white px-6 py-4 sm:py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all"
                >
                    <Plus size={20} strokeWidth={3} />
                    <span>Nuevo Proyecto</span>
                </button>
            </div>

            {/* Grid dinámico */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-bold">Cargando proyectos...</p>
                    </div>
                ) : proyectos.length > 0 ? (
                    proyectos.map(p => <ProjectCard key={p.id} proyecto={p} onRefresh={fetchMisProyectos} />)
                ) : (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold">No tienes proyectos creados.</p>
                    </div>
                )}
            </div>

            {/* MODAL CON OVERLAY Y BLUR */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop del Modal */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />
                    {/* Contenedor del Modal */}
                    <div className="relative z-[210] w-full max-w-lg transform animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <CreateProjectModal
                            onClose={() => setIsModalOpen(false)}
                            onSuccess={fetchMisProyectos}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProjects;