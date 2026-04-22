import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Upload, Loader2, ArrowLeft, FileImage, X, Maximize2,
    Activity, Trash2, PieChart as PieIcon, Crown, Info, CheckCircle2, AlertTriangle
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Swal from "sweetalert2";
import { getUser } from "../../../services/authService";
import Loading from "../../Routes/Loading";

// --- DICCIONARIO EXTENDIDO DE ENFERMEDADES (DATA PREMIUM) ---
const diseaseInfo = [
    {
        key: "Early_blight (Tizón Temprano)",
        name: "Tizón Temprano",
        images: [
            "../../../src/assets/InfoDiseaseProject/eb1.jpg",
            "../../../src/assets/InfoDiseaseProject/eb2.jpg",
            "../../../src/assets/InfoDiseaseProject/eb3.webp"
        ],
        desc: "Provocada por el hongo Alternaria solani. Se manifiesta como manchas pequeñas, circulares y oscuras con anillos concéntricos (parecidos a un blanco de tiro). Ataca principalmente hojas viejas cerca del suelo.",
        causas: "Altas temperaturas (24-29°C), alternancia de periodos secos y húmedos, y plantas debilitadas por falta de fertilización nitrogenada.",
        trata: "Aplicación de fungicidas específicos (mancozeb o clorotalonil), eliminación de restos de cosecha y evitar el riego por aspersión que humedezca demasiado el follaje."
    },
    {
        key: "Late_blight (Tizón Tardío)",
        name: "Tizón Tardío",
        images: [
            "../../../src/assets/InfoDiseaseProject/lb1.jpg",
            "../../../src/assets/InfoDiseaseProject/lb2.jpg",
            "../../../src/assets/InfoDiseaseProject/lb3.png"
        ],
        desc: "Causada por Phytophthora infestans, es la enfermedad más devastadora. Aparecen manchas necróticas de aspecto aceitoso o húmedo que se expanden rápidamente. En el envés de la hoja suele aparecer un moho blanquecino.",
        causas: "Humedad relativa superior al 90% y temperaturas frescas (10-20°C). Se propaga rápidamente por el viento y el agua.",
        trata: "Uso de variedades resistentes, control estricto de la humedad y aplicación de fungicidas sistémicos ante los primeros síntomas. Es vital actuar rápido."
    },
    {
        key: "Bacteria",
        name: "Bacteriosis / Marchitez",
        images: [
            "../../../src/assets/InfoDiseaseProject/b1.jpg",
            "../../../src/assets/InfoDiseaseProject/b2.jpg",
            "../../../src/assets/InfoDiseaseProject/b3.jpg"
        ],
        desc: "Generalmente asociada a la Marchitez Bacteriana (Ralstonia solanacearum). Causa amarillamiento progresivo, marchitez repentina y pudrición en los vasos conductores.",
        causas: "Suelos contaminados, agua de riego infectada, uso de herramientas no desinfectadas y heridas en las raíces.",
        trata: "No existe cura química efectiva. Se recomienda rotación de cultivos (3-5 años), uso de semilla certificada y eliminación inmediata de plantas enfermas."
    },
    {
        key: "Fungi (Hongos)",
        name: "Hongos Foliares",
        images: [
            "../../../src/assets/InfoDiseaseProject/h1.webp",
            "../../../src/assets/InfoDiseaseProject/h2.jpg",
            "../../../src/assets/InfoDiseaseProject/h3.jpg"
        ],
        desc: "Engloba diversas micosis que afectan el tejido foliar, obstruyendo la fotosíntesis y debilitando la estructura de la planta.",
        causas: "Exceso de sombra, falta de drenaje en el suelo y alta densidad de siembra que impide el flujo de aire.",
        trata: "Mejorar la ventilación, aplicar fungicidas de amplio espectro de forma preventiva y equilibrar el aporte de nitrógeno."
    },
    {
        key: "Pest (Plagas)",
        name: "Plagas e Insectos",
        images: [
            "../../../src/assets/InfoDiseaseProject/p1.jpg",
            "../../../src/assets/InfoDiseaseProject/p2.jpg",
            "../../../src/assets/InfoDiseaseProject/p3.jpg"
        ],
        desc: "Daños causados por insectos como la Polilla de la Papa o Minadores. Se observa defoliación, perforaciones o galerías en las hojas.",
        causas: "Climas secos que favorecen la reproducción de insectos y falta de depredadores naturales en el ecosistema.",
        trata: "Control biológico, uso de trampas cromáticas y aplicación de extractos orgánicos como aceite de Neem o jabón potásico."
    },
    {
        key: "Healthy (Sana)",
        name: "Hoja Saludable",
        images: [
            "../../../src/assets/InfoDiseaseProject/s1.jpg",
            "../../../src/assets/InfoDiseaseProject/s2.jpg",
            "../../../src/assets/InfoDiseaseProject/s3.jpg"
        ],
        desc: "La hoja presenta un color verde intenso y uniforme. No hay presencia de manchas ni decoloraciones, indicando un metabolismo óptimo.",
        causas: "Correcta nutrición, riego balanceado y manejo preventivo exitoso.",
        trata: "Continuar con el monitoreo constante y mantener el plan de fertilización rico en potasio para fortalecer las paredes celulares."
    }
];

// --- FUNCIÓN AUXILIAR PARA REDIMENSIONAR IMÁGENES A 640x640 ---
const resizeImage = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const SIZE = 640;
                canvas.width = SIZE;
                canvas.height = SIZE;
                const ctx = canvas.getContext("2d");

                // Lógica de "Aspect Ratio" para no estirar la imagen
                let srcWidth = img.width;
                let srcHeight = img.height;
                let srcX = 0;
                let srcY = 0;

                const aspectRatio = srcWidth / srcHeight;

                if (aspectRatio > 1) {
                    // Imagen ancha (Landscape)
                    srcWidth = img.height;
                    srcX = (img.width - srcWidth) / 2;
                } else if (aspectRatio < 1) {
                    // Imagen alta (Portrait)
                    srcHeight = img.width;
                    srcY = (img.height - srcHeight) / 2;
                }

                ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, SIZE, SIZE);

                canvas.toBlob((blob) => {
                    const resizedFile = new File([blob], file.name, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });
                    resolve(resizedFile);
                }, "image/jpeg", 0.9);
            };
        };
    });
};

function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = getUser();

    const [proyecto, setProyecto] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [premiumAnalysis, setPremiumAnalysis] = useState(null);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    const isPremium = Number(user?.estado) === 1;
    const isRestricted = !isPremium;
    const reachLimit = isRestricted && resultados.length >= 5;

    const traducciones = {
        "Healthy (Sana)": "Sana",
        "Early_blight (Tizón Temprano)": "Tizón Temprano",
        "Late_blight (Tizón Tardío)": "Tizón Tardío",
        "Bacteria": "Bacteriosis",
        "Pest (Plagas)": "Plagas / Insectos",
        "Fungi (Hongos)": "Hongos",
        "No Identificado": "Sin Identificar"
    };

    const fetchDetalle = async () => {
        try {
            const response = await fetch(`http://localhost:8000/proyectos/detalle-completo/${id}`);
            const data = await response.json();
            const userRol = Number(user?.rol_id || 0);
            const userId = Number(user?.id || 0);
            const proyectoOwnerId = Number(data.usuario_id || 0);

            if (userRol === 1 || proyectoOwnerId === userId) {
                setProyecto(data);
                if (data.analisis_detallado) setResultados(data.analisis_detallado);
            } else {
                Swal.fire('Error', 'No tienes permiso para ver este proyecto', 'error');
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error en el fetch:", error);
        }
    };

    useEffect(() => { fetchDetalle(); }, [id]);

    const handleBack = () => {
        user?.rol_id === 1 ? navigate("/admin-dashboard") : navigate("/dashboard");
    };

    const handleImageClick = (item) => {
        if (isPremium) {
            const info = diseaseInfo.find(d => d.key === item.clase_resultado) || diseaseInfo[5];
            setPremiumAnalysis({ ...item, info });
        } else {
            setSelectedImg(item.url_s3);
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) return;
        if (isRestricted && (resultados.length + files.length > 5)) {
            Swal.fire({ title: 'Límite alcanzado', text: 'Plan gratuito: máx 5 imágenes.', icon: 'info' });
            return;
        }

        setUploading(true);
        const formData = new FormData();

        try {
            // PROCESAMIENTO: Redimensionar cada archivo antes de subirlo
            const resizedFiles = await Promise.all(files.map(file => resizeImage(file)));
            resizedFiles.forEach(f => formData.append("files", f));

            const response = await fetch(`http://localhost:8000/analisis/procesar-lote/${id}/${user.id_usuario || user.id}`, {
                method: "POST", body: formData
            });

            if (response.ok) {
                setTimeout(async () => {
                    await fetchDetalle();
                    setUploading(false);
                    setFiles([]);
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Análisis listo', showConfirmButton: false, timer: 2000 });
                }, 2000);
            } else {
                setUploading(false);
                Swal.fire('Error', 'No se pudo procesar', 'error');
            }
        } catch (e) {
            setUploading(false);
            console.error(e);
            Swal.fire('Error', 'Error al redimensionar o subir imágenes', 'error');
        }
    };

    const handleDeleteImage = async (imagenId) => {
        const result = await Swal.fire({ title: '¿Eliminar?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' });
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8000/analisis/eliminar-imagen/${imagenId}`, { method: 'DELETE' });
                if (response.ok) fetchDetalle();
            } catch (error) { console.error(error); }
        }
    };

    const stats = proyecto?.resumen_estadistico?.conteo_por_categoria || {};
    const total = proyecto?.resumen_estadistico?.total_imagenes || 0;
    const sanas = stats["Healthy (Sana)"] || 0;
    const enfermedades = Object.entries(stats).reduce((acc, [k, v]) => k !== "Healthy (Sana)" ? acc + v : acc, 0);
    const eficacia = proyecto?.resumen_estadistico?.porcentaje_salud_lote?.replace('%', '') || "0.00";
    const chartData = Object.entries(stats).filter(([_, v]) => v > 0).map(([n, v]) => ({ name: traducciones[n] || n, value: v }));
    const COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#a855f7', '#ec4899'];

    if (!proyecto) return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
    );

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50 relative selection:bg-green-100 outline-none">

            {uploading && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/40 backdrop-blur-md">
                    <Loading />
                </div>
            )}

            {/* MODALES Y UI (Se mantiene igual a tu código original) */}
            {showPremiumModal && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setShowPremiumModal(false)}></div>
                    <div className="relative bg-slate-900 w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl border border-slate-800 animate-in zoom-in-95">
                        <button onClick={() => setShowPremiumModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24} /></button>
                        <div className="mb-6 text-center">
                            <Crown size={24} className="text-amber-400 mx-auto mb-2" />
                            <h3 className="text-2xl font-black text-white">Distribución del Lote</h3>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="h-56 w-56 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value" stroke="none">
                                            {chartData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-1 gap-2 w-full">
                                {chartData.map((item, idx) => (
                                    <div key={idx} className="flex justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                            {item.name}
                                        </span>
                                        <span className="text-sm font-black text-white">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {premiumAnalysis && (
                <PremiumDetailModal
                    analysis={premiumAnalysis}
                    onClose={() => setPremiumAnalysis(null)}
                />
            )}

            {selectedImg && (
                <div className="fixed inset-0 z-[400] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
                    <img src={selectedImg} className="max-w-full max-h-[90vh] rounded-xl shadow-2xl animate-in zoom-in-95" />
                </div>
            )}

            <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-black mb-8 hover:text-slate-800 transition-all uppercase text-[10px] tracking-widest">
                <ArrowLeft size={16} /> Volver al Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Diagnóstico IA</h2>
                        <p className="text-slate-400 text-sm mb-6">Sube fotos de tus hojas para analizar.</p>

                        {!reachLimit ? (
                            <div className="border-2 border-dashed border-slate-100 rounded-3xl p-10 text-center relative hover:bg-green-50/50 transition-all group cursor-pointer">
                                <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFiles([...e.target.files])} />
                                <Upload className="mx-auto text-slate-200 group-hover:text-green-500 mb-3" size={40} />
                                <p className="text-xs font-bold text-slate-500">{files.length > 0 ? `${files.length} seleccionadas` : 'Click para subir'}</p>
                            </div>
                        ) : (
                            <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-3xl p-10 text-center">
                                <Crown className="mx-auto text-amber-400 mb-2" size={32} />
                                <p className="text-xs font-black text-amber-700 uppercase">Límite alcanzado</p>
                            </div>
                        )}

                        {files.length > 0 && !reachLimit && (
                            <button onClick={handleUpload} className="w-full mt-6 bg-green-600 text-white py-4 rounded-2xl font-black flex justify-center items-center gap-2 hover:bg-green-700 shadow-xl transition-all active:scale-95">
                                <Activity size={18} /> ANALIZAR {files.length} FOTOS
                            </button>
                        )}
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                        <h3 className="text-[10px] font-black mb-8 opacity-40 uppercase tracking-widest">Resumen de Salud del Cultivo</h3>
                        <div className="space-y-4">
                            <StatItem label="Total de Muestras" value={total} />
                            <StatItem label="Hojas Sanas" value={sanas} color="text-green-400" />
                            <StatItem label="Hojas Enfermas" value={enfermedades} color="text-red-400" />
                            <div className="pt-8 border-t border-slate-800/50 mt-4">
                                <p className="text-[10px] font-black opacity-30 uppercase mb-1">Cultivo Sano</p>
                                <p className="text-5xl font-black text-green-400">{eficacia}%</p>
                                <div className="w-full h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${eficacia}%` }}></div>
                                </div>
                            </div>
                            {isPremium && (
                                <button onClick={() => setShowPremiumModal(true)} className="w-full mt-6 flex justify-between items-center p-4 bg-amber-500 rounded-2xl text-xs font-black uppercase hover:bg-amber-600 transition-all">
                                    Ver Gráficos <Crown size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200/60 shadow-sm min-h-[700px]">
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
                        <div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Reporte Detallado</h2>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Análisis individual por hoja</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resultados.length > 0 ? (
                            resultados.map((res) => (
                                <ResultCard
                                    key={res.id}
                                    data={res}
                                    onZoom={() => handleImageClick(res)}
                                    onDelete={() => handleDeleteImage(res.id_imagen || res.id)}
                                    isRestricted={isRestricted}
                                    traducciones={traducciones}
                                />
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-40">
                                <FileImage size={60} className="mx-auto text-slate-100 mb-4" />
                                <p className="font-black text-slate-300">Sin datos de análisis</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Se mantienen los componentes PremiumDetailModal, StatItem y ResultCard igual al original...
function PremiumDetailModal({ analysis, onClose }) {
    const [activeIdx, setActiveIdx] = useState(0);
    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-10">
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] animate-in slide-in-from-bottom-10 duration-500">
                <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><X size={24} /></button>
                <div className="md:w-1/2 bg-slate-50 p-6 md:p-10 overflow-y-auto custom-scrollbar">
                    <div className="space-y-8">
                        <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img src={analysis.url_s3} className="w-full aspect-video object-cover" alt="Analizada" />
                        </div>
                        <div className="space-y-4">
                            <img src={analysis.info.images[activeIdx]} className="w-full h-56 object-cover rounded-[2rem] shadow-lg animate-in fade-in duration-700" alt="Referencia" />
                            <div className="flex gap-3 justify-center">
                                {analysis.info.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIdx(i)}
                                        className={`w-14 h-14 rounded-2xl overflow-hidden border-4 transition-all ${activeIdx === i ? 'border-green-500 scale-110 shadow-lg' : 'border-white opacity-40'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full mb-6">
                        <Crown size={14} className="fill-amber-700" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Diagnóstico Detallado</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 mb-2 leading-tight">{analysis.info.name}</h2>
                    <p className="text-slate-400 font-bold mb-8 uppercase text-xs tracking-[0.3em]">Confianza del sistema: {analysis.confianza}%</p>
                    <div className="space-y-8">
                        <section>
                            <h4 className="text-slate-900 font-black text-sm uppercase mb-3 flex items-center gap-2"><Info size={18} className="text-blue-500" /> ¿Qué es esto?</h4>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">{analysis.info.desc}</p>
                        </section>
                        <div className="grid grid-cols-1 gap-4">
                            <section className="bg-red-50 border border-red-100 p-6 rounded-[2rem]">
                                <h4 className="text-red-700 font-black text-xs uppercase mb-2 flex items-center gap-2"><AlertTriangle size={16} /> Causas Principales</h4>
                                <p className="text-red-900/70 text-sm leading-relaxed">{analysis.info.causas}</p>
                            </section>
                            <section className="bg-green-50 border border-green-100 p-6 rounded-[2rem]">
                                <h4 className="text-green-700 font-black text-xs uppercase mb-2 flex items-center gap-2"><CheckCircle2 size={16} /> Tratamiento y Acción</h4>
                                <p className="text-green-900/70 text-sm leading-relaxed">{analysis.info.trata}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatItem({ label, value, color = "text-white" }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
            <span className={`text-xl font-black ${color}`}>{value}</span>
        </div>
    );
}

function ResultCard({ data, onZoom, onDelete, isRestricted, traducciones }) {
    const claseIA = data.clase_resultado || "No Identificado";
    const nombreMostrado = traducciones[claseIA] || claseIA;
    const isHealthy = claseIA.toLowerCase().includes("healthy") || claseIA.toLowerCase().includes("sana");
    return (
        <div className="group relative flex items-center gap-4 p-4 rounded-[2rem] border border-slate-100 bg-slate-50/40 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer" onClick={onZoom}>
            {!isRestricted && (
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10">
                    <Trash2 size={12} />
                </button>
            )}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                <img src={data.url_s3} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Res" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white" size={20} />
                </div>
            </div>
            <div className="flex-1">
                <div className={`inline-block text-[8px] font-black uppercase px-2 py-0.5 rounded-md mb-2 ${isHealthy ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {nombreMostrado}
                </div>
                {!isRestricted && (
                    <div>
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Certeza</p>
                        <p className="text-lg font-black text-slate-800 leading-none">{data.confianza}%</p>
                    </div>
                )}
            </div>
            {isRestricted && <Info size={16} className="text-slate-200" />}
        </div>
    );
}

export default ProjectDetail;