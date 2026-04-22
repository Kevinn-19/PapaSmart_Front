import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
    Plus, LogOut, ChevronDown, Activity,
    Users, UserPlus, FolderKanban, Menu, X
} from "lucide-react";
import { getUser, logout } from "../../../services/authService";
import potato2 from "../../../assets/icons/potato2.svg";

function AdminDashboard() {
    const navigate = useNavigate();
    const user = getUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { path: "my-projects", label: "Mis Proyectos", icon: FolderKanban },
        { path: "train-metrics", label: "Métricas Entrenamiento", icon: Activity },
        { path: "list-users", label: "Listar Usuarios", icon: Users },
        { path: "register", label: "Registrar Administrador", icon: UserPlus },
    ];

    return (
        <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden relative">

            {/* NAVBAR */}
            <nav className="bg-slate-900 px-4 md:px-8 py-3 flex justify-between items-center z-[110] shadow-lg border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all active:scale-90 group"
                    >
                        <img
                            src={potato2}
                            alt="Logo"
                            className={`w-7 h-7 brightness-0 invert transition-all duration-500 ease-out ${isSidebarOpen ? "rotate-[360deg] scale-110" : "rotate-0 scale-100"
                                }`}
                        />
                    </button>

                    <div className="flex flex-col">
                        <h1 className="text-lg md:text-xl font-black text-white leading-none">
                            Papa<span className="text-blue-400">Smart</span>
                        </h1>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                            Admin Panel
                        </span>
                    </div>
                </div>

                {/* Perfil del Usuario */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-3 bg-white/5 p-1.5 pr-3 md:pr-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                    >
                        <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black uppercase text-sm shadow-inner">
                            {user?.nombres?.charAt(0)}
                        </div>
                        {/* Nombre siempre visible en desktop, oculto en mobile pero manejado en el dropdown */}
                        <div className="hidden md:flex flex-col text-left">
                            <span className="text-xs font-bold text-white leading-tight">
                                {user?.nombres?.split(' ')[0]} {user?.apellidos?.split(' ')[0]}
                            </span>
                            <span className="text-[10px] text-blue-400 font-medium uppercase tracking-tighter">
                                Administrador
                            </span>
                        </div>
                        <ChevronDown size={14} className={`text-white/40 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl p-2 z-[120] border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                            {/* Info de usuario para Móviles dentro del dropdown */}
                            <div className="md:hidden px-4 py-3 border-b border-slate-50 mb-2">
                                <p className="text-sm font-black text-slate-900 truncate">{user?.nombres}</p>
                                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">Administrador</p>
                            </div>

                            <button
                                onClick={() => { logout(); navigate("/login"); }}
                                className="w-full flex items-center gap-3 p-3 text-red-600 font-bold text-sm hover:bg-red-50 rounded-xl transition-colors"
                            >
                                <LogOut size={16} /> Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden relative">
                {/* BACKDROP BLUR */}
                <div
                    className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* SIDEBAR */}
                <aside className={`
                    absolute inset-y-0 left-0 z-[100] w-72
                    bg-slate-900 border-r border-white/5
                    transition-transform duration-300 ease-in-out transform
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}>
                    <div className="p-6 space-y-2">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-4">Menú Principal</p>
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${isActive
                                        ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40 translate-x-2"
                                        : "text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
                                    }`
                                }
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-10">
                    <div className="max-w-[1400px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;