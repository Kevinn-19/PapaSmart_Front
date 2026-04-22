import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, Crown, RefreshCw, FolderOpen, Loader2, Search, Filter, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importación corregida

// Importamos el logo
import logo from "../../../assets/icons/potato2.svg";

const UserTable = ({ usuarios: propUsuarios, loading: propLoading, onRefresh }) => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState(propUsuarios || []);
    const [loading, setLoading] = useState(propLoading || false);

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPremium, setFilterPremium] = useState("all");

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/usuarios/listar-productores`);
            const data = await response.json();
            setUsuarios(data.usuarios || []);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!propUsuarios) {
            fetchUsuarios();
        } else {
            setUsuarios(propUsuarios);
            setLoading(propLoading);
        }
    }, [propUsuarios, propLoading]);

    const formatName = (nombres, apellidos) => {
        const primerNombre = nombres?.split(' ')[0] || "";
        const primerApellido = apellidos?.split(' ')[0] || "";
        return `${primerNombre} ${primerApellido}`.trim();
    };

    const filteredUsers = usuarios.filter(user => {
        const fullName = `${user.nombres} ${user.apellidos}`.toLowerCase();
        const email = user.correo.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());

        if (filterPremium === "premium") return matchesSearch && user.estado === 1;
        if (filterPremium === "free") return matchesSearch && user.estado !== 1;
        return matchesSearch;
    });

    // FUNCIÓN PDF CORREGIDA
    const generatePDF = () => {
        const doc = new jsPDF();
        const img = new Image();
        img.src = logo;

        // Esperar a que la imagen cargue para evitar PDF en blanco o error de codificación
        img.onload = () => {
            // Crear un canvas para convertir el SVG/Image a Base64 compatible
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/png');

            // 1. Agregar Logo y Título
            doc.addImage(imgData, 'PNG', 15, 10, 15, 15);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("PapaSmart", 35, 22);

            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("Reporte General de Usuarios", 15, 35);
            doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 15, 42);

            // 2. Preparar datos
            const tableColumn = ["ID", "Nombre Completo", "Correo Electrónico", "Plan"];
            const tableRows = filteredUsers.map(user => [
                `#${user.id}`,
                `${user.nombres} ${user.apellidos}`,
                user.correo,
                user.estado === 1 ? "Premium" : "Free"

            ]);

            // 3. Generar tabla con autoTable corregido
            autoTable(doc, {
                startY: 50,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
                headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold' },
                styles: { fontSize: 9 },
            });

            doc.save(`Reporte_Usuarios_PapaSmart_${Date.now()}.pdf`);
        };

        // Manejo de error si la imagen no carga
        img.onerror = () => {
            console.error("No se pudo cargar el logo para el PDF");
            // Generar PDF sin logo si falla
            const tableColumn = ["ID", "Nombre Completo", "Correo Electrónico", "Plan"];
            const tableRows = filteredUsers.map(user => [
                `#${user.id}`,
                `${user.nombres} ${user.apellidos}`,
                user.correo,
                user.estado === 1 ? "Premium" : "Free",
                "Activo"
            ]);
            autoTable(doc, {
                startY: 20,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
                headStyles: { fillColor: [15, 23, 42] }
            });
            doc.save(`Reporte_Usuarios_PapaSmart_${Date.now()}.pdf`);
        };
    };

    const handleSeeProjects = (userId) => {
        navigate(`/admin-dashboard/user-projects/${userId}`);
    };

    const handleToggleSubscription = async (user) => {
        const nombreCorto = formatName(user.nombres, user.apellidos);
        if (user.estado === 1) {
            return Swal.fire({
                title: 'Usuario Premium',
                text: 'Este usuario ya cuenta con los beneficios Premium.',
                icon: 'info',
                confirmButtonColor: '#2563eb',
                customClass: { popup: 'rounded-[1.5rem]', title: 'font-black' }
            });
        }

        const result = await Swal.fire({
            title: '¿Mejorar a Premium?',
            text: `¿Estás seguro de otorgar plan PREMIUM a ${nombreCorto}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, activar',
            cancelButtonText: 'Cancelar',
            customClass: { popup: 'rounded-[1.5rem]', title: 'font-black' }
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({ title: 'Procesando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
                const response = await fetch(`http://localhost:8000/usuarios/activar/${user.id}`, { method: 'PATCH' });
                if (response.ok) {
                    if (onRefresh) onRefresh(); else fetchUsuarios();
                    Swal.fire({
                        title: '¡Activado!',
                        text: `${nombreCorto} ahora es Premium.`,
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        customClass: { popup: 'rounded-[1.5rem]' }
                    });
                }
            } catch (error) {
                Swal.fire({ title: 'Error', text: 'No se pudo completar la activación.', icon: 'error', confirmButtonColor: '#2563eb' });
            }
        }
    };

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="animate-spin" size={40} />
            <p className="font-bold text-sm uppercase tracking-widest">Cargando productores...</p>
        </div>
    );

    return (
        <section className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Header y Filtros */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Lista de Usuarios</h2>
                    <p className="text-slate-500 font-medium">Gestión de suscripciones y monitoreo de proyectos.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Buscador */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar nombre o correo..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filtro Plan */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select
                            className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer font-bold text-slate-600"
                            value={filterPremium}
                            onChange={(e) => setFilterPremium(e.target.value)}
                        >
                            <option value="all">Todos los planes</option>
                            <option value="premium">Solo Premium</option>
                            <option value="free">Solo Free</option>
                        </select>
                    </div>

                    {/* Botón PDF */}
                    <button
                        onClick={generatePDF}
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                        <FileText size={16} />
                        Exportar PDF
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden">
                <div className="overflow-x-auto flex-1 scrollbar-hide">
                    <table className="w-full min-w-[950px] text-left border-separate border-spacing-0">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-slate-900 text-white">
                                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest rounded-tl-[2rem] text-center">ID</th>
                                <th className="px-4 py-6 text-[10px] font-black uppercase tracking-widest">Usuario</th>
                                <th className="px-4 py-6 text-[10px] font-black uppercase tracking-widest">Correo Electrónico</th>
                                <th className="px-4 py-6 text-[10px] font-black uppercase tracking-widest text-center">Plan</th>
                                <th className="px-4 py-6 text-[10px] font-black uppercase tracking-widest text-center">Rol</th>
                                <th className="px-4 py-6 text-[10px] font-black uppercase tracking-widest text-center">Proyectos</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-center rounded-tr-[2rem]">Gestionar Plan</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-5 text-center">
                                            <span className="text-[11px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                                #{user.id}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm border border-blue-200">
                                                    {user.nombres.charAt(0)}
                                                </div>
                                                <span className="text-sm font-black text-slate-700">
                                                    {formatName(user.nombres, user.apellidos)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Mail size={14} className="text-slate-300" />
                                                <span className="text-sm font-medium italic">{user.correo}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${user.estado === 1
                                                ? "bg-amber-50 text-amber-600 border-amber-200"
                                                : "bg-slate-50 text-slate-400 border-slate-200"
                                                }`}>
                                                {user.estado === 1 && <Crown size={10} strokeWidth={3} />}
                                                {user.estado === 1 ? "Premium" : "Free"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase inline-flex items-center gap-1 border border-blue-100">
                                                <ShieldCheck size={10} /> Usuario
                                            </span>
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            <button
                                                onClick={() => handleSeeProjects(user.id)}
                                                className="group inline-flex flex-col items-center"
                                            >
                                                <div className="p-2.5 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-xl transition-all border border-slate-200/60 shadow-sm">
                                                    <FolderOpen size={18} strokeWidth={2.5} />
                                                </div>
                                                <span className="text-[8px] font-black text-slate-400 group-hover:text-blue-600 uppercase mt-1">Explorar</span>
                                            </button>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <button
                                                onClick={() => handleToggleSubscription(user)}
                                                className={`p-2.5 rounded-xl transition-all shadow-sm active:scale-95 ${user.estado === 1
                                                    ? "bg-amber-100 text-amber-500 cursor-not-allowed opacity-60"
                                                    : "bg-slate-100 text-slate-500 hover:bg-emerald-500 hover:text-white hover:shadow-emerald-200"
                                                    }`}
                                            >
                                                <RefreshCw size={16} strokeWidth={2.5} className={user.estado !== 1 ? "hover:rotate-180 transition-transform duration-500" : ""} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-20 text-center text-slate-400 font-bold italic">
                                        No se encontraron usuarios con los filtros aplicados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default UserTable;