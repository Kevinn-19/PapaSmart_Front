import { useState, useEffect } from "react";
import {
    Activity, Cpu, Database, Gauge,
    RefreshCcw, CheckCircle2, Clock, Zap
} from "lucide-react";

function Training() {
    const [stats, setStats] = useState({
        accuracy: 94.2,
        loss: 0.08,
        epochs: 150,
        datasetSize: "12,400",
        status: "Finalizado",
        lastUpdate: "Hace 2 horas"
    });

    const metrics = [
        { label: "Precisión (Accuracy)", value: `${stats.accuracy}%`, icon: Gauge, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Pérdida (Loss)", value: stats.loss, icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Dataset Total", value: stats.datasetSize, icon: Database, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Tiempo de Ejecución", value: "4h 12m", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h2 className="text-3xl font-black text-slate-900">Métricas de Entrenamiento</h2>
                    <p className="text-slate-500 font-medium">Estado actual del modelo de detección de enfermedades.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    <RefreshCcw size={14} /> Actualizar Datos
                </button>
            </div>

            {/* Grid de Métricas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {metrics.map((m, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className={`${m.bg} ${m.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                            <m.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                        <p className="text-2xl font-black text-slate-900">{m.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Estado del Modelo */}
                <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <Zap className="absolute right-[-20px] top-[-20px] text-white/5 w-64 h-64" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-black uppercase tracking-tighter text-emerald-500">Sistema Activo</span>
                        </div>

                        <h3 className="text-2xl font-black mb-2">Modelo ResNet-50 v2</h3>
                        <p className="text-slate-400 text-sm mb-8 max-w-md">El modelo está operando bajo parámetros óptimos. Se recomienda una nueva fase de entrenamiento si el dataset aumenta en un 20%.</p>

                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <p className="text-[9px] font-bold text-slate-400 uppercase">GPU Usage</p>
                                <p className="font-black text-xl">78%</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <p className="text-[9px] font-bold text-slate-400 uppercase">VRAM</p>
                                <p className="font-black text-xl">6.2 GB</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registro de Actividad */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <h3 className="font-black text-slate-900 mb-6">Últimos Logs</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-800">Entrenamiento completado</p>
                                    <p className="text-[10px] text-slate-400">Epoch 150/150 - Val_Acc: 0.94</p>
                                    <p className="text-[9px] text-slate-300 mt-1">12 Oct, 2023 - 14:30</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Training;