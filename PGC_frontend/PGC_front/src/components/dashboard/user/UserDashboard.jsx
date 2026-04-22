import { useState, useEffect } from "react";
import { Plus, LogOut, ChevronDown, LayoutGrid, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../../../services/authService";
import ProjectCard from "../global/ProjectCard";
import CreateProjectModal from "../global/CreateProjectModal";
import potato2 from "../../../assets/icons/potato2.svg";

function UserDashboard() {
    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();
    const user = getUser();

    const isPremium = Number(user?.estado) === 1;

    // Función que recarga la data desde el servidor
    const fetchProyectos = async () => {
        try {
            const userId = user?.id || user?.id_usuario;
            if (!userId) return;
            const response = await fetch(`http://localhost:8000/proyectos/usuario/${userId}`);
            const data = await response.json();
            setProyectos(data.proyectos || []);
        } catch (error) {
            console.error("Error cargando proyectos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProyectos();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 outline-none">
            {/* --- NAVBAR --- */}
            <nav className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 px-8 py-3 flex justify-between items-center sticky top-0 z-50 shadow-lg shadow-green-900/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                        <img src={potato2} alt="Logo" className="w-7 h-7 object-contain brightness-0 invert" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tighter">
                        Papa<span className="text-green-200">Smart</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-1.5 pr-4 rounded-2xl transition-all duration-300 outline-none"
                        >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black uppercase text-sm shadow-sm transition-colors ${isPremium
                                ? "bg-amber-400 text-amber-900 shadow-amber-500/20"
                                : "bg-white text-green-700"
                                }`}>
                                {user?.nombres?.charAt(0) || "U"}
                            </div>

                            <div className="text-left hidden sm:block leading-tight">
                                <p className="text-sm font-black text-white whitespace-nowrap">
                                    {user?.nombres?.trim().split(' ')[0]} {user?.apellidos?.trim().split(' ')[0] || ""}
                                </p>
                                <div className="flex items-center gap-1">
                                    {isPremium ? (
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <span className="text-[9px] font-black text-amber-300 uppercase tracking-[0.1em] drop-shadow-md">Premium</span>
                                            <Crown size={10} className="text-amber-300 fill-amber-300 animate-pulse" />
                                        </div>
                                    ) : (
                                        <span className="text-[9px] font-black text-green-100/70 uppercase tracking-[0.1em]">Plan Free</span>
                                    )}
                                </div>
                            </div>
                            <ChevronDown size={18} className={`text-white/70 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-3 w-60 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2.5 z-50 animate-in fade-in zoom-in-95">
                                <button
                                    onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}
                                    className="w-full flex items-center gap-3.5 p-3.5 text-slate-700 hover:bg-green-50 rounded-2xl transition-all font-bold text-sm"
                                >
                                    <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                                        <Plus size={18} strokeWidth={3} />
                                    </div>
                                    Nuevo Proyecto
                                </button>
                                <div className="h-px bg-slate-100 my-2.5"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3.5 p-3.5 text-red-600 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm"
                                >
                                    <div className="bg-red-100 text-red-700 p-2 rounded-lg">
                                        <LogOut size={18} strokeWidth={3} />
                                    </div>
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <main className="p-8 md:p-12 max-w-7xl mx-auto">
                <header className="mb-12 border-b border-slate-200/50 pb-10">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
                        Bienvenido, <span className={`bg-gradient-to-r bg-clip-text text-transparent ${isPremium ? "from-amber-500 to-amber-700" : "from-green-600 to-green-800"
                            }`}>
                            {user?.nombres?.trim().split(' ')[0] || "Usuario"}
                        </span>! {isPremium ? "👑" : "🌱"}
                    </h2>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="h-72 bg-white rounded-[3rem] animate-pulse shadow-sm border border-slate-100"></div>)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {proyectos.length > 0 ? (
                            proyectos.map((p) => (
                                <ProjectCard
                                    key={p.id_proyecto || p.id}
                                    proyecto={p}
                                    onRefresh={fetchProyectos} // IMPORTANTE: Pasamos la función
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-28 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 px-10 shadow-inner">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isPremium ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-700"
                                    }`}>
                                    <LayoutGrid size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800">¡Crea tu primer análisis!</h3>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className={`mt-8 px-8 py-4 rounded-2xl font-black uppercase text-sm shadow-xl transition-all active:scale-95 text-white ${isPremium ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200" : "bg-green-600 hover:bg-green-700 shadow-green-200"
                                        }`}
                                >
                                    <Plus size={18} strokeWidth={3} className="inline mr-2" /> Nuevo Lote
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {isModalOpen && (
                <CreateProjectModal
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={() => { fetchProyectos(); setIsModalOpen(false); }}
                    currentProjectsCount={proyectos.length}
                />
            )}
        </div>
    );
}

export default UserDashboard;