import { motion } from "framer-motion";
import { ShieldCheck, Globe, Wheat, HeartPulse } from "lucide-react";

const reasons = [
    {
        icon: <Globe className="w-9 h-9 text-green-600" />,
        title: "Seguridad Alimentaria",
        desc: "La papa es el tercer cultivo más consumido a nivel mundial. Es fundamental para combatir el hambre."
    },
    {
        icon: <Wheat className="w-9 h-9 text-green-600" />,
        title: "Economía Local",
        desc: "Millones de pequeños agricultores dependen de la cosecha de papa para su sustento diario."
    },
    {
        icon: <HeartPulse className="w-9 h-9 text-green-600" />,
        title: "Valor Nutricional",
        desc: "Son una fuente rica en carbohidratos, potasio y vitamina C, esencial en la dieta humana."
    },
    {
        icon: <ShieldCheck className="w-9 h-9 text-green-600" />,
        title: "Resiliencia Agrícola",
        desc: "Cuidar los cultivos evita el uso excesivo de químicos y protege la biodiversidad del suelo."
    }
];

function Importance() {
    return (
        <section className="py-20 px-6 bg-white w-full">
            <div className="max-w-6xl mx-auto">

                {/* Encabezado */}
                <div className="text-center mb-16">
                    <span className="text-green-600 font-bold uppercase tracking-[0.2em] text-xs">
                        Más que un cultivo
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 mt-2">
                        ¿Por qué es vital proteger la Papa?
                    </h2>
                    <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Grid - Sin bordes, todo centrado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {reasons.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            // 🎯 Centrado total aquí: flex-col e items-center
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Contenedor del Icono - Sin bordes rígidos, solo un aire limpio */}
                            <div className="mb-6 p-4 rounded-full bg-green-50 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-500">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 leading-relaxed text-sm max-w-[250px]">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Importance;