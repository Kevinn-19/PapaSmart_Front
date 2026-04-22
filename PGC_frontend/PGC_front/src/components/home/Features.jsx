import { motion } from "framer-motion";
import { BrainCircuit, LibraryBig, LayoutDashboard, ClipboardCheck } from "lucide-react";

const features = [
    {
        icon: <BrainCircuit className="w-8 h-8 text-white" />,
        title: "Detección con IA",
        desc: "Análisis avanzado mediante redes neuronales para identificar patologías con alta precisión en segundos.",
        color: "bg-green-600 shadow-green-200"
    },
    {
        icon: <LibraryBig className="w-8 h-8 text-white" />,
        title: "Procesamiento por Lotes",
        desc: "Capacidad de analizar múltiples imágenes simultáneamente para diagnósticos masivos en cultivos extensos.",
        color: "bg-blue-600 shadow-blue-200"
    },
    {
        icon: <LayoutDashboard className="w-8 h-8 text-white" />,
        title: "Dashboard de Proyectos",
        desc: "Panel centralizado para organizar y visualizar el histórico de salud de cada uno de tus sectores de siembra.",
        color: "bg-indigo-600 shadow-indigo-200"
    },
    {
        icon: <ClipboardCheck className="w-8 h-8 text-white" />,
        title: "Reportes Detallados",
        desc: "Generación automática de informes técnicos por proyecto con estadísticas.",
        color: "bg-emerald-600 shadow-emerald-200"
    }
];

function Features() {
    return (
        <section className="py-24 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">

                {/* Cabecera de la sección */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-green-600 leading-tight"
                    >
                        Funciones Principales
                    </motion.h2>
                    <div className="w-24 h-1.5 bg-green-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Grid de Funcionalidades */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -12 }}
                            className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 flex flex-col items-center text-center group transition-all duration-300"
                        >
                            {/* Icono Flotante */}
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl transition-transform duration-500 group-hover:rotate-[10deg] ${f.color}`}>
                                {f.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-4 px-2 leading-snug">
                                {f.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                {f.desc}
                            </p>

                            {/* Detalle visual de flecha sutil */}
                            <motion.div
                                className="mt-auto pt-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;