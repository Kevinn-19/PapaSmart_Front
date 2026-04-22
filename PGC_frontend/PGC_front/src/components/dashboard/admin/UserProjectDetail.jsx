import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft, Activity, Info, Loader2, X, FileImage,
    Trash2, Maximize2, Crown, PieChart as PieIcon
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Swal from "sweetalert2";
import { getUser } from "../../../services/authService";

// --- DICCIONARIO DE ENFERMEDADES (DATA PREMIUM) ---
const diseaseInfo = [
    {
        key: "Early_blight (Tizón Temprano)",
        name: "Tizón Temprano",
        images: [
            "https://static.wixstatic.com/media/1b8a25_07d1faab9e194437a6624405845382f3~mv2.jpg",
            "https://enfermedadespapa.inia.cl/imagenes/tizonTemprano/1.jpg",
            "https://preview.redd.it/early-potato-blight-v0-3x6d5pjiu19f1.jpg?width=640&crop=smart&auto=webp&s=5c85ff4883741bad02c5aa166fc25f477f5a2125"
        ],
        desc: "Provocada por el hongo Alternaria solani. Se manifiesta como manchas pequeñas y oscuras con anillos concéntricos.",
        causas: "Altas temperaturas (24-29°C) y alternancia de periodos secos y húmedos.",
        trata: "Aplicación de fungicidas (mancozeb), eliminación de restos y control de riego."
    },
    {
        key: "Late_blight (Tizón Tardío)",
        name: "Tizón Tardío",
        images: [
            "https://agrobio.org/sites/default/files/inline-images/Tiz%C3%B3n%20tard%C3%ADo%20en%20la%20papa%20.jpg",
            "https://miro.medium.com/1*XQm8ydsK4eL7BzBrfGYdrg.jpeg",
            "https://cdn.portalfruticola.com/2022/09/atips09072022-5-1024x724.png"
        ],
        desc: "Causada por Phytophthora infestans. Aparecen manchas necróticas de aspecto aceitoso que se expanden rápido.",
        causas: "Humedad superior al 90% y temperaturas frescas (10-20°C).",
        trata: "Uso de variedades resistentes y fungicidas sistémicos inmediatos."
    },
    {
        key: "Bacteria",
        name: "Bacteriosis / Marchitez",
        images: [
            "https://enfermedadespapa.inia.cl/imagenes/marchitezBacteriana/1.jpg",
            "https://panorama-agro.com/wp-content/uploads/2017/11/Ralstonia-solanacearum-S%C3%ADntomas-en-plantas-1920x1440.jpg",
            "https://inaturalist-open-data.s3.amazonaws.com/photos/147631853/original.jpg"
        ],
        desc: "Asociada a Marchitez Bacteriana. Causa amarillamiento y pudrición en los vasos conductores.",
        causas: "Suelos contaminados y agua de riego infectada.",
        trata: "Rotación de cultivos y eliminación inmediata de plantas enfermas."
    },
    {
        key: "Fungi (Hongos)",
        name: "Hongos Foliares",
        images: [
            "https://www.koppert.es/content/_processed_/8/7/csm_basal_rot_fusarium_oxysporum_tomato_koppert_49887b21db.jpg",
            "https://profigen.com.br/content/workspaces/cmbs/pessoa/1/imgrep/600x750/doencas-fusarium-profigen-190211021111.jpg",
            "https://profigen.com.br/content/workspaces/cmbs/pessoa/1/imgrep/600x750/doencas-fusarium-profigen-190211021156.jpg"
        ],
        desc: "Diversas micosis que afectan el tejido foliar obstruyendo la fotosíntesis.",
        causas: "Exceso de sombra y falta de drenaje.",
        trata: "Mejorar ventilación y aplicar fungicidas de amplio espectro."
    },
    {
        key: "Pest (Plagas)",
        name: "Plagas e Insectos",
        images: [
            "https://plantwiseplusknowledgebank.org/cms/10.1079/pwkb.20157800466/asset/87e6730c-9fc8-4155-afd8-0b72b0724bd8/assets/graphic/potato-moth-latin-am-2.jpg",
            "https://content.peat-cloud.com/w400/potato-tuber-moth-1.jpg",
            "https://assets.revistacultivar.com.br/a02b4-tra--a-da-batata.jpg"
        ],
        desc: "Daños causados por Polilla de la Papa o Minadores.",
        causas: "Climas secos y falta de depredadores naturales.",
        trata: "Control biológico y trampas cromáticas."
    },
    {
        key: "Healthy (Sana)",
        name: "Hoja Saludable",
        images: [
            "https://agroavances.com/img/noticias/4207_2.jpg",
            "https://viaorganica.org/wp-content/uploads/planta-de-papa.-Por-Flickr-Badal-Sarker.jpg",
            "https://www.invesa.com/wp-content/uploads/2020/10/Papa-600x450.jpg"
        ],
        desc: "Color verde intenso y uniforme. Metabolismo óptimo.",
        causas: "Correcta nutrición y riego balanceado.",
        trata: "Mantener monitoreo constante."
    }
];

const traducciones = {
    "Healthy (Sana)": "Sana",
    "Early_blight (Tizón Temprano)": "Tizón Temprano",
    "Late_blight (Tizón Tardío)": "Tizón Tardío",
    "Bacteria": "Bacteriosis",
    "Pest (Plagas)": "Plagas / Insectos",
    "Fungi (Hongos)": "Hongos Foliares",
    "No Identificado": "Sin Identificar"
};

const COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#a855f7', '#ec4899'];

function UserProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = getUser();

    const [proyecto, setProyecto] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [premiumAnalysis, setPremiumAnalysis] = useState(null);
    const [showStatsModal, setShowStatsModal] = useState(false);

    const fetchDetalle = async () => {
        try {
            const response = await fetch(`http://localhost:8000/proyectos/detalle-completo/${id}`);
            const data = await response.json();

            if (user && Number(user.rol_id) !== 1) {
                Swal.fire('Acceso Denegado', 'Solo administradores pueden acceder.', 'error');
                navigate("/dashboard");
                return;
            }

            setProyecto(data);
            if (data.analisis_detallado) setResultados(data.analisis_detallado);
        } catch (error) {
            console.error(error);
            setProyecto(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDetalle(); }, [id]);

    const handleBack = () => navigate("/admin-dashboard/list-users");

    const handleImageClick = (res) => {
        const info = diseaseInfo.find(d => d.key === res.clase_resultado) || diseaseInfo[diseaseInfo.length - 1];
        setPremiumAnalysis({ ...res, info });
    };

    const handleDeleteImage = async (imgId) => {
        const result = await Swal.fire({
            title: '¿Eliminar imagen?',
            text: "Esta acción quitará el análisis del proyecto permanentemente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            setResultados(prev => prev.filter(img => (img.id_imagen || img.id) !== imgId));
            Swal.fire('Eliminado', 'La imagen ha sido removida del listado.', 'success');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Cargando Datos...</p>
        </div>
    );

    const totalMuestras = proyecto?.resumen_estadistico?.total_imagenes || 0;

    if (!proyecto || totalMuestras === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-200 text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileImage size={40} className="text-slate-300" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase mb-2">Sin Información</h2>
                    <p className="text-slate-500 mb-8 font-medium">Este proyecto aún no tiene imágenes analizadas.</p>
                    <button onClick={handleBack} className="flex items-center gap-2 justify-center w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10">
                        <ArrowLeft size={16} /> Volver a Lista de Usuarios
                    </button>
                </div>
            </div>
        );
    }

    const stats = proyecto?.resumen_estadistico?.conteo_por_categoria || {};
    const sanas = stats["Healthy (Sana)"] || 0;
    const enfermedades = Object.entries(stats).reduce((acc, [k, v]) => k !== "Healthy (Sana)" ? acc + v : acc, 0);
    const eficacia = proyecto?.resumen_estadistico?.porcentaje_salud_lote?.replace('%', '') || "0.00";
    const chartData = Object.entries(stats).filter(([_, v]) => v > 0).map(([n, v]) => ({ name: traducciones[n] || n, value: v }));

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50 relative selection:bg-blue-100">

            {/* MODAL DETALLE DE IMAGEN */}
            {premiumAnalysis && (
                <PremiumDetailModal
                    analysis={premiumAnalysis}
                    onClose={() => setPremiumAnalysis(null)}
                />
            )}

            {/* MODAL ESTADÍSTICAS PREMIUM DARK - TAMAÑO GRANDE */}
            {showStatsModal && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setShowStatsModal(false)}></div>
                    <div className="relative bg-slate-900 w-full max-w-4xl rounded-[3rem] p-10 shadow-2xl border border-slate-800 animate-in zoom-in-95">
                        <button onClick={() => setShowStatsModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                            <X size={28} />
                        </button>
                        <div className="mb-10 text-center">
                            <Crown size={32} className="text-amber-400 mx-auto mb-3" />
                            <h3 className="text-3xl font-black text-white uppercase tracking-tight">Análisis General del Lote</h3>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Muestras Totales: {totalMuestras}</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                            {/* Gráfico más grande */}
                            <div className="h-72 w-72 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                                            {chartData.map((e, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                                            itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: '900' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            {/* Lista de datos en dos columnas si hay muchos */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                {chartData.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-[1.5rem] border border-white/5 hover:bg-white/10 transition-all group">
                                        <span className="text-xs font-black text-slate-300 flex items-center gap-3 uppercase tracking-wider">
                                            <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                            {item.name}
                                        </span>
                                        <span className="text-xl font-black text-white">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-black mb-8 hover:text-blue-600 transition-all uppercase text-[10px] tracking-widest group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver a Lista de Usuarios
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* PANEL IZQUIERDO */}
                <div className="space-y-6">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl border border-slate-800">
                        <h3 className="text-[10px] font-black mb-8 opacity-40 uppercase tracking-widest">Resumen de Salud (Lote)</h3>
                        <div className="space-y-4">
                            <StatItem label="Muestras Totales" value={totalMuestras} />
                            <StatItem label="Hojas Sanas" value={sanas} color="text-green-400" />
                            <StatItem label="Hojas Enfermas" value={enfermedades} color="text-red-400" />

                            <div className="pt-8 border-t border-slate-800/50 mt-4">
                                <p className="text-[10px] font-black opacity-30 uppercase mb-1">Índice de Salud</p>
                                <p className="text-5xl font-black text-blue-400">{eficacia}%</p>
                                <div className="w-full h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${eficacia}%` }}></div>
                                </div>
                            </div>

                            <button onClick={() => setShowStatsModal(true)} className="w-full mt-6 flex justify-between items-center p-4 bg-slate-800 rounded-2xl text-xs font-black uppercase hover:bg-slate-700 transition-all border border-slate-700">
                                Ver Gráfico Detallado <PieIcon size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* PANEL DERECHO */}
                <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200/60 shadow-sm min-h-[700px]">
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Diagnóstico Detallado</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resultados.map((res) => (
                            <ResultCard
                                key={res.id_imagen || res.id}
                                data={res}
                                onZoom={() => handleImageClick(res)}
                                onDelete={() => handleDeleteImage(res.id_imagen || res.id)}
                                traducciones={traducciones}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTES AUXILIARES ---

function StatItem({ label, value, color = "text-white" }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400">{label}</span>
            <span className={`text-xl font-black ${color}`}>{value}</span>
        </div>
    );
}

function ResultCard({ data, onZoom, onDelete, traducciones }) {
    const isSana = data.clase_resultado === "Healthy (Sana)";

    return (
        <div className="group relative bg-slate-50 rounded-[2rem] p-4 border border-transparent hover:border-blue-200 hover:bg-white transition-all duration-300">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <img src={data.url_s3} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Resultado" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button onClick={onZoom} className="p-3 bg-white rounded-full text-slate-900 hover:bg-blue-600 hover:text-white transition-all">
                        <Maximize2 size={20} />
                    </button>
                    <button onClick={onDelete} className="p-3 bg-white rounded-full text-red-500 hover:bg-red-600 hover:text-white transition-all">
                        <Trash2 size={20} />
                    </button>
                </div>
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase ${isSana ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {traducciones[data.clase_resultado] || data.clase_resultado}
                </div>
            </div>
            <div className="px-2">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Confianza</p>
                        <p className="text-lg font-black text-slate-800">{data.confianza}%</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase">ID Imagen</p>
                        <p className="text-xs font-bold text-slate-600">#{data.id_imagen || data.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PremiumDetailModal({ analysis, onClose }) {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-10">
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] animate-in slide-in-from-bottom-10 duration-500">
                <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><X size={24} /></button>

                <div className="md:w-1/2 bg-slate-50 p-6 md:p-10 overflow-y-auto">
                    <div className="space-y-8">
                        <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img src={analysis.url_s3} className="w-full aspect-video object-cover" alt="Analizada" />
                        </div>
                        <div className="space-y-4">
                            <img src={analysis.info.images[activeIdx]} className="w-full h-56 object-cover rounded-[2rem] shadow-lg animate-in fade-in" alt="Referencia" />
                            <div className="flex gap-3 justify-center">
                                {analysis.info.images.map((img, i) => (
                                    <button key={i} onClick={() => setActiveIdx(i)} className={`w-14 h-14 rounded-2xl overflow-hidden border-4 transition-all ${activeIdx === i ? 'border-blue-500 scale-110' : 'border-white opacity-40'}`}>
                                        <img src={img} className="w-full h-full object-cover" alt={`Ref ${i}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full mb-6">
                        <Activity size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Ficha Técnica Administrativa</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 mb-2 leading-tight">{analysis.info.name}</h2>
                    <p className="text-slate-400 font-bold mb-8 uppercase text-xs tracking-[0.3em]">IA Confidence: {analysis.confianza}%</p>
                    <div className="space-y-8">
                        <section>
                            <h4 className="text-slate-900 font-black text-sm uppercase mb-3 flex items-center gap-2"><Info size={18} className="text-blue-500" /> Descripción</h4>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">{analysis.info.desc}</p>
                        </section>
                        <section className="bg-red-50 border border-red-100 p-6 rounded-[2rem]">
                            <h4 className="text-red-700 font-black text-xs uppercase mb-2">Causas</h4>
                            <p className="text-red-900/70 text-sm">{analysis.info.causas}</p>
                        </section>
                        <section className="bg-green-50 border border-green-100 p-6 rounded-[2rem]">
                            <h4 className="text-green-700 font-black text-xs uppercase mb-2">Tratamiento Sugerido</h4>
                            <p className="text-green-900/70 text-sm">{analysis.info.trata}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProjectDetail;