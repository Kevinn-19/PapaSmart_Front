import { useState, useEffect } from "react";
import {
    Activity, Database, Gauge, CheckCircle2,
    Clock, Zap, X, Info, ChevronRight, BarChart3, ExternalLink, Maximize2, Terminal, Layers
} from "lucide-react";

// Importación de imágenes
import curvasImg from "../../../assets/metrics/Curvas de Aprendizaje.png";
import matrizImg from "../../../assets/metrics/Matriz de confusion.jpeg";
import metricasClaseImg from "../../../assets/metrics/Metricas por Clase.png";

function Training() {
    const [showDatasetModal, setShowDatasetModal] = useState(false);
    const [showEpochsModal, setShowEpochsModal] = useState(false);
    const [showMetricsModal, setShowMetricsModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (showDatasetModal || showEpochsModal || showMetricsModal || selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showDatasetModal, showEpochsModal, showMetricsModal, selectedImage]);

    // Datos actualizados según Epocas.txt
    const stats = {
        accuracy: 90.17, // Accuracy final Época 50 [cite: 9]
        loss: 0.0293,    // Loss final Época 50 [cite: 9]
        datasetSize: "4,071",
        epochs: 50,
    };

    // Mapeo manual de las últimas épocas para la previsualización [cite: 8, 9]
    const recentEpochs = [
        { num: 50, acc: "0.9017", loss: "0.0293" },
        { num: 49, acc: "0.8845", loss: "0.0058" },
        { num: 48, acc: "0.8771", loss: "0.0086" }
    ];

    // Datos reales extraídos de Epocas.txt para el historial completo 
    const fullEpochHistory = [
        { num: 50, acc: "0.9017", loss: "0.0293" },
        { num: 49, acc: "0.8845", loss: "0.0058" },
        { num: 48, acc: "0.8771", loss: "0.0086" },
        { num: 47, acc: "0.8943", loss: "0.0025" },
        { num: 46, acc: "0.8919", loss: "0.0011" },
        { num: 45, acc: "0.8870", loss: "0.0017" },
        { num: 44, acc: "0.8919", loss: "0.0026" },
        { num: 43, acc: "0.9017", loss: "0.0124" },
        { num: 42, acc: "0.8673", loss: "0.0153" },
        { num: 41, acc: "0.8968", loss: "0.0073" },
        { num: 40, acc: "0.8722", loss: "0.0105" },
        { num: 39, acc: "0.8943", loss: "0.0099" },
        { num: 38, acc: "0.8919", loss: "0.0188" },
        { num: 37, acc: "0.8771", loss: "0.0137" },
        { num: 36, acc: "0.8649", loss: "0.0075" },
        { num: 35, acc: "0.8821", loss: "0.0104" },
        { num: 34, acc: "0.8600", loss: "0.0226" },
        { num: 33, acc: "0.8845", loss: "0.0171" },
        { num: 32, acc: "0.8993", loss: "0.0113" },
        { num: 31, acc: "0.8993", loss: "0.0175" },
        { num: 30, acc: "0.8624", loss: "0.0285" },
        { num: 29, acc: "0.8747", loss: "0.0107" },
        { num: 28, acc: "0.8943", loss: "0.0123" },
        { num: 27, acc: "0.8624", loss: "0.0326" },
        { num: 26, acc: "0.9017", loss: "0.0365" },
        { num: 25, acc: "0.8919", loss: "0.0179" },
        { num: 24, acc: "0.8943", loss: "0.0265" },
        { num: 23, acc: "0.8796", loss: "0.0293" },
        { num: 22, acc: "0.8649", loss: "0.0273" },
        { num: 21, acc: "0.8575", loss: "0.0085" },
        { num: 20, acc: "0.9042", loss: "0.0184" },
        { num: 19, acc: "0.8821", loss: "0.0203" },
        { num: 18, acc: "0.9017", loss: "0.0238" },
        { num: 17, acc: "0.9017", loss: "0.0384" },
        { num: 16, acc: "0.8870", loss: "0.0396" },
        { num: 15, acc: "0.8649", loss: "0.0347" },
        { num: 14, acc: "0.8894", loss: "0.0318" },
        { num: 13, acc: "0.8698", loss: "0.0568" },
        { num: 12, acc: "0.8845", loss: "0.0527" },
        { num: 11, acc: "0.8943", loss: "0.0489" },
        { num: 10, acc: "0.8747", loss: "0.0439" },
        { num: 9, acc: "0.8968", loss: "0.0599" },
        { num: 8, acc: "0.8943", loss: "0.0582" },
        { num: 7, acc: "0.8698", loss: "0.0857" },
        { num: 6, acc: "0.8747", loss: "0.1089" },
        { num: 5, acc: "0.8821", loss: "0.1390" },
        { num: 4, acc: "0.8993", loss: "0.1688" },
        { num: 3, acc: "0.8821", loss: "0.2462" },
        { num: 2, acc: "0.8550", loss: "0.3263" },
        { num: 1, acc: "0.8157", loss: "0.8116" }
    ];

    const datasetSplit = [
        { label: "Train (70%)", count: 2849, color: "bg-emerald-500" },
        { label: "Valid (20%)", count: 815, color: "bg-blue-500" },
        { label: "Test (10%)", count: 407, color: "bg-orange-500" }
    ];

    const metrics = [
        { label: "Precisión (Accuracy)", value: `${stats.accuracy}%`, icon: Gauge, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Pérdida (Loss)", value: stats.loss, icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Dataset Total", value: stats.datasetSize, icon: Database, color: "text-purple-500", bg: "bg-purple-50", clickable: true, action: () => setShowDatasetModal(true) },
        { label: "Épocas", value: `${stats.epochs}/50`, icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    const datasetInfo = [
        { clase: "Tizón Temprano", train: 712, valid: 199, test: 89, total: 1000 },
        { clase: "Tizón Tardío", train: 709, valid: 182, test: 109, total: 1000 },
        { clase: "Hongos", train: 509, valid: 159, test: 75, total: 743 },
        { clase: "Plagas", train: 420, valid: 123, test: 64, total: 607 },
        { clase: "Bacterias", train: 400, valid: 115, test: 54, total: 569 },
        { clase: "Sana", train: 99, valid: 37, test: 16, total: 152 },
    ];

    const detailedMetrics = [
        { name: "Bacteria", prec: 0.96, recall: 0.96, f1: 0.96 },
        { name: "Early Blight", prec: 1.00, recall: 0.99, f1: 0.99 },
        { name: "Fungi", prec: 0.78, recall: 0.84, f1: 0.81 },
        { name: "Late Blight", prec: 0.94, recall: 0.99, f1: 0.96 },
        { name: "Pest", prec: 0.79, recall: 0.72, f1: 0.75 },
        { name: "Healthy", prec: 0.91, recall: 0.62, f1: 0.74 },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">PapaSmart</h2>
                    <p className="text-slate-500 font-medium">Métricas del Entrenamiento del Modelo</p>
                </div>
            </div>

            {/* Grid de Métricas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {metrics.map((m, idx) => (
                    <div key={idx} onClick={m.action} className={`bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm transition-all ${m.clickable ? 'cursor-pointer hover:border-purple-300 hover:shadow-md active:scale-95' : ''}`}>
                        <div className={`${m.bg} ${m.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-5`}>
                            <m.icon size={28} />
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                                <p className="text-3xl font-black text-slate-900">{m.value}</p>
                            </div>
                            {m.clickable && <Info size={16} className="text-slate-300 mb-1" />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {[
                        { title: "Curvas de Aprendizaje", img: curvasImg, icon: BarChart3, color: "text-green-600" },
                        { title: "Matriz de Confusión", img: matrizImg, icon: CheckCircle2, color: "text-blue-600" }
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm group">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 italic">
                                    <card.icon className={card.color} /> {card.title}
                                </h3>
                                <button onClick={() => setSelectedImage(card.img)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                                    <Maximize2 size={18} />
                                </button>
                            </div>
                            <img
                                src={card.img}
                                alt={card.title}
                                className="w-full rounded-3xl cursor-zoom-in hover:opacity-95 transition-all"
                                onClick={() => setSelectedImage(card.img)}
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 text-white shadow-lg shadow-blue-200 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                            <Terminal size={120} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-xl font-bold mb-4 leading-tight italic">Notebook de Entrenamiento</p>
                            <p className="text-blue-100 text-sm mb-6 leading-relaxed">Accede al entorno de ejecución en Kaggle para ver el código fuente y el pre-procesamiento.</p>
                            <a
                                href="https://www.kaggle.com/code/skafind/enfermedades-papa"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20"
                            >
                                Abrir en Kaggle <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">Logs de Entrenamiento</h3>
                            <button onClick={() => setShowEpochsModal(true)} className="text-green-600 hover:text-green-700"><ChevronRight size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            {recentEpochs.map((epoch) => (
                                <div key={epoch.num} className="p-4 bg-slate-50 rounded-2xl border-l-4 border-green-500 font-mono text-[10px]">
                                    <p className="font-black text-slate-700 mb-1">ÉPOCA {epoch.num}/50</p>
                                    <p className="text-slate-500">Accuracy: {epoch.acc} | Loss: {epoch.loss}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowEpochsModal(true)} className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Ver historial</button>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <Zap className="absolute right-[-20px] top-[-20px] text-white/5 w-64 h-64 group-hover:scale-110 transition-transform" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-black italic">Reporte de Métricas</h3>
                                <div className="flex gap-2">
                                    <button onClick={() => setSelectedImage(metricasClaseImg)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                        <Maximize2 size={18} className="text-slate-300" />
                                    </button>
                                    <button onClick={() => setShowMetricsModal(true)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                        <ExternalLink size={18} className="text-slate-300" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Weighted F1-Score</span>
                                    <span className="font-black text-emerald-400">0.90</span>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10 cursor-zoom-in" onClick={() => setSelectedImage(metricasClaseImg)}>
                                    <img src={metricasClaseImg} alt="Metrics Overview" className="w-full rounded-xl hover:opacity-80 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Imagen Fullscreen */}
            {selectedImage && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-8 right-8 text-white/50 hover:text-white"><X size={40} /></button>
                    <img src={selectedImage} className="max-w-full max-h-full object-contain rounded-lg" alt="Zoom" />
                </div>
            )}

            {/* Modal de Dataset */}
            {showDatasetModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 isolate">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowDatasetModal(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 my-auto flex flex-col max-h-[90vh]">
                        <div className="bg-emerald-600 p-8 text-white shrink-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-2xl font-black italic">Información del Dataset</h4>
                                    <p className="text-emerald-100 text-xs opacity-80">Distribución de imágenes por clases y conjuntos</p>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href="https://universe.roboflow.com/potato-wrgge/potato-d7rlm"
                                        target="_blank" rel="noreferrer"
                                        className="bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all"
                                    >
                                        Roboflow <ExternalLink size={14} />
                                    </a>
                                    <button onClick={() => setShowDatasetModal(false)} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
                            <div className="mb-8">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                                    <Layers size={14} /> Dataset Split
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    {datasetSplit.map((item, i) => (
                                        <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <p className="text-[10px] font-black text-slate-500 uppercase">{item.label}</p>
                                            <p className="text-xl font-black text-slate-900">{item.count}</p>
                                            <div className={`h-1 w-full mt-2 rounded-full ${item.color} opacity-60`}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Distribución por Clase</p>
                            <div className="overflow-x-auto mb-8">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-4">
                                            <th className="pb-4">Clase</th>
                                            <th className="pb-4 text-center">Train</th>
                                            <th className="pb-4 text-center">Valid</th>
                                            <th className="pb-4 text-center">Test</th>
                                            <th className="pb-4 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {datasetInfo.map((row, i) => (
                                            <tr key={i} className="border-b border-slate-50 group hover:bg-slate-50 transition-colors">
                                                <td className="py-4 font-bold text-slate-800">{row.clase}</td>
                                                <td className="py-4 text-center text-slate-500 font-mono">{row.train}</td>
                                                <td className="py-4 text-center text-slate-500 font-mono">{row.valid}</td>
                                                <td className="py-4 text-center text-slate-500 font-mono">{row.test}</td>
                                                <td className="py-4 text-right font-black text-emerald-600">{row.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-6 bg-slate-900 rounded-[2.2rem] text-white flex justify-between items-center shrink-0">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Total Imágenes</p>
                                    <p className="text-3xl font-black text-emerald-400 tracking-tighter">4,071</p>
                                </div>
                                <Database className="text-slate-700" size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Métricas */}
            {showMetricsModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden isolate">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowMetricsModal(false)}></div>
                    <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                            <h4 className="text-2xl font-black italic">Classification Report</h4>
                            <button onClick={() => setShowMetricsModal(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><X size={24} /></button>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-4 gap-4 mb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-4">
                                <span>Clase</span>
                                <span className="text-center">Prec.</span>
                                <span className="text-center">Recall</span>
                                <span className="text-center">F1</span>
                            </div>
                            {detailedMetrics.map((m, i) => (
                                <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b border-slate-50 items-center text-sm">
                                    <span className="font-bold text-slate-900">{m.name}</span>
                                    <span className="text-center font-mono">{m.prec.toFixed(2)}</span>
                                    <span className="text-center font-mono">{m.recall.toFixed(2)}</span>
                                    <span className="text-center font-mono font-black text-green-600">{m.f1.toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="mt-8 p-4 bg-green-50 rounded-2xl flex justify-between items-center">
                                <span className="text-xs font-black text-green-800 uppercase">Weighted Average</span>
                                <span className="text-2xl font-black text-green-600">0.90</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Historial de Épocas - ACTUALIZADO CON DATOS REALES */}
            {showEpochsModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden isolate">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowEpochsModal(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-right-10 flex flex-col max-h-[85vh]">
                        <div className="bg-slate-900 p-8 text-white flex justify-between items-center shrink-0">
                            <h4 className="text-2xl font-black italic">Historial Completo</h4>
                            <button onClick={() => setShowEpochsModal(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><X size={24} /></button>
                        </div>
                        <div className="p-6 overflow-y-auto bg-white custom-scrollbar">
                            <div className="space-y-2">
                                {fullEpochHistory.map((epoch) => (
                                    <div key={epoch.num} className="flex justify-between items-center p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all font-mono">
                                        <span className="font-black text-slate-900 text-sm">ÉPOCA {epoch.num}</span>
                                        <div className="flex gap-6 text-sm text-right">
                                            <span className="text-slate-600 font-bold uppercase text-[10px]">Accuracy: <span className="text-slate-900 text-sm">{epoch.acc}</span></span>
                                            <span className="text-slate-600 font-bold uppercase text-[10px]">Loss: <span className="text-slate-900 text-sm">{epoch.loss}</span></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Training;