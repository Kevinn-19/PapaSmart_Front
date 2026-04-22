import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import DiseaseCard from "./DiseaseCard";
import DiseaseModal from "./DiseaseModal";

const diseases = [
    {
        name: "Tizón Temprano",
        images: [
            "../../../src/assets/InfoDiseaseProject/eb1.jpg",
            "../../../src/assets/InfoDiseaseProject/eb2.jpg",
            "../../../src/assets/InfoDiseaseProject/eb3.webp"
        ],
        desc: "Provocada por el hongo Alternaria solani. Se manifiesta como manchas pequeñas, circulares y oscuras con anillos concéntricos (parecidos a un blanco de tiro). Ataca principalmente hojas viejas cerca del suelo.",
    },
    {
        name: "Tizón Tardío",
        images: [
            "../../../src/assets/InfoDiseaseProject/lb1.jpg",
            "../../../src/assets/InfoDiseaseProject/lb2.jpg",
            "../../../src/assets/InfoDiseaseProject/lb3.png"
        ],
        desc: "Causada por Phytophthora infestans, es la enfermedad más devastadora. Aparecen manchas necróticas de aspecto aceitoso o húmedo que se expanden rápidamente. En el envés de la hoja suele aparecer un moho blanquecino.",
    },
    {
        name: "Enfermedad Por Bacteria",
        images: [
            "../../../src/assets/InfoDiseaseProject/b1.jpg",
            "../../../src/assets/InfoDiseaseProject/b2.jpg",
            "../../../src/assets/InfoDiseaseProject/b3.jpg"
        ],
        desc: "Generalmente asociada a la Marchitez Bacteriana (Ralstonia solanacearum) o Pierna Negra. Causa amarillamiento progresivo, marchitez repentina y pudrición en la base del tallo o en los vasos conductores de la hoja.",
    },
    {
        name: "Enfermedad Por Hongo",
        images: [
            "../../../src/assets/InfoDiseaseProject/h1.webp",
            "../../../src/assets/InfoDiseaseProject/h2.jpg",
            "../../../src/assets/InfoDiseaseProject/h3.jpg"
        ],
        desc: "Engloba diversas micosis como la Fusariosis o Verticilosis. Los síntomas varían desde manchas necróticas irregulares hasta el amarillamiento de los bordes de las hojas y la obstrucción de los canales de nutrición.",
    },
    {
        name: "Plaga en la Hoja",
        images: [
            "../../../src/assets/InfoDiseaseProject/p1.jpg",
            "../../../src/assets/InfoDiseaseProject/p2.jpg",
            "../../../src/assets/InfoDiseaseProject/p3.jpg"
        ],
        desc: "Daños causados por insectos como el Escarabajo de la Papa, Pulgones o la Polilla. Se observa defoliación (hojas comidas), perforaciones, enrollamiento o presencia de melaza pegajosa.",
    },
    {
        name: "Hoja Sana",
        images: [
            "../../../src/assets/InfoDiseaseProject/s1.jpg",
            "../../../src/assets/InfoDiseaseProject/s2.jpg",
            "../../../src/assets/InfoDiseaseProject/s3.jpg"
        ],
        desc: "La hoja presenta un color verde intenso y uniforme, con bordes lisos y textura firme. No hay presencia de manchas, perforaciones ni decoloraciones. Esto indica una nutrición equilibrada y buen riego.",
    }
];

function Diseases() {
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const handleOpenModal = (disease, index) => {
        setSelectedDisease(disease);
        setCurrentImgIndex(index);
    };

    return (
        // Aumentado py-20 a py-32 para más espacio vertical
        <section className="py-32 px-6 max-w-7xl mx-auto bg-gray-50">
            <div className="text-center mb-24">
                <h2 className="text-4xl font-black text-green-900 uppercase tracking-tighter sm:text-6xl">
                    Enfermedades en la Hoja de la Papa
                </h2>
                <p className="mt-6 text-gray-600 text-xl">Enfermedades más comunes que afectan a la hoja de la papa</p>
            </div>

            {/* Aumentado gap-10 a gap-16 para separar bien las cartas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {diseases.map((item, idx) => (
                    <DiseaseCard
                        key={idx}
                        disease={item}
                        onClick={handleOpenModal}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedDisease && (
                    <DiseaseModal
                        disease={selectedDisease}
                        initialIndex={currentImgIndex}
                        onClose={() => setSelectedDisease(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

export default Diseases;