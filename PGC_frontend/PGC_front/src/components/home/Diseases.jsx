import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import DiseaseCard from "./DiseaseCard";
import DiseaseModal from "./DiseaseModal";

const diseases = [
    {
        name: "Tizón Temprano",
        images: [
            "https://static.wixstatic.com/media/1b8a25_07d1faab9e194437a6624405845382f3~mv2.jpg",
            "https://enfermedadespapa.inia.cl/imagenes/tizonTemprano/1.jpg",
            "https://preview.redd.it/early-potato-blight-v0-3x6d5pjiu19f1.jpg?width=640&crop=smart&auto=webp&s=5c85ff4883741bad02c5aa166fc25f477f5a2125"
        ],
        desc: "Provocada por el hongo Alternaria solani. Se manifiesta como manchas pequeñas, circulares y oscuras con anillos concéntricos (parecidos a un blanco de tiro). Ataca principalmente hojas viejas cerca del suelo.",
        trata: "Aplicación de fungicidas específicos (mancozeb o clorotalonil), eliminación de restos de cosecha y evitar el riego por aspersión que humedezca demasiado el follaje."
    },
    {
        name: "Tizón Tardío",
        images: [
            "https://agrobio.org/sites/default/files/inline-images/Tiz%C3%B3n%20tard%C3%ADo%20en%20la%20papa%20.jpg",
            "https://miro.medium.com/1*XQm8ydsK4eL7BzBrfGYdrg.jpeg",
            "https://cdn.portalfruticola.com/2022/09/atips09072022-5-1024x724.png"
        ],
        desc: "Causada por Phytophthora infestans, es la enfermedad más devastadora. Aparecen manchas necróticas de aspecto aceitoso o húmedo que se expanden rápidamente. En el envés de la hoja suele aparecer un moho blanquecino.",
        trata: "Uso de variedades resistentes, control estricto de la humedad y aplicación de fungicidas sistémicos ante los primeros síntomas. Es vital actuar rápido debido a su alta velocidad de propagación."
    },
    {
        name: "Enfermedad Por Bacteria",
        images: [
            "https://enfermedadespapa.inia.cl/imagenes/marchitezBacteriana/1.jpg",
            "https://panorama-agro.com/wp-content/uploads/2017/11/Ralstonia-solanacearum-S%C3%ADntomas-en-plantas-1920x1440.jpg",
            "https://inaturalist-open-data.s3.amazonaws.com/photos/147631853/original.jpg"
        ],
        desc: "Generalmente asociada a la Marchitez Bacteriana (Ralstonia solanacearum) o Pierna Negra. Causa amarillamiento progresivo, marchitez repentina y pudrición en la base del tallo o en los vasos conductores de la hoja.",
        trata: "No existe cura química efectiva una vez infectada. Se recomienda rotación de cultivos larga (3-5 años), uso de semilla certificada y desinfección total de herramientas agrícolas."
    },
    {
        name: "Enfermedad Por Hongo",
        images: [
            "https://www.koppert.es/content/_processed_/8/7/csm_basal_rot_fusarium_oxysporum_tomato_koppert_49887b21db.jpg",
            "https://profigen.com.br/content/workspaces/cmbs/pessoa/1/imgrep/600x750/doencas-fusarium-profigen-190211021111.jpg",
            "https://profigen.com.br/content/workspaces/cmbs/pessoa/1/imgrep/600x750/doencas-fusarium-profigen-190211021156.jpg"
        ],
        desc: "Engloba diversas micosis como la Fusariosis o Verticilosis. Los síntomas varían desde manchas necróticas irregulares hasta el amarillamiento de los bordes de las hojas y la obstrucción de los canales de nutrición.",
        trata: "Mejorar el drenaje del suelo, evitar el exceso de nitrógeno que debilita la pared celular y aplicar fungicidas de amplio espectro de forma preventiva."
    },
    {
        name: "Plaga en la Hoja",
        images: [
            "https://plantwiseplusknowledgebank.org/cms/10.1079/pwkb.20157800466/asset/87e6730c-9fc8-4155-afd8-0b72b0724bd8/assets/graphic/potato-moth-latin-am-2.jpg",
            "https://content.peat-cloud.com/w400/potato-tuber-moth-1.jpg",
            "https://assets.revistacultivar.com.br/a02b4-tra--a-da-batata.jpg"
        ],
        desc: "Daños causados por insectos como el Escarabajo de la Papa, Pulgones o la Polilla. Se observa defoliación (hojas comidas), perforaciones, enrollamiento o presencia de melaza pegajosa.",
        trata: "Control biológico (depredadores naturales), uso de trampas cromáticas (amarillas) y, en casos severos, aplicación de insecticidas orgánicos como aceite de Neem o jabón potásico."
    },
    {
        name: "Hoja Sana",
        images: [
            "https://agroavances.com/img/noticias/4207_2.jpg",
            "https://viaorganica.org/wp-content/uploads/planta-de-papa.-Por-Flickr-Badal-Sarker.jpg",
            "https://www.invesa.com/wp-content/uploads/2020/10/Papa-600x450.jpg"
        ],
        desc: "La hoja presenta un color verde intenso y uniforme, con bordes lisos y textura firme. No hay presencia de manchas, perforaciones ni decoloraciones. Esto indica una nutrición equilibrada y buen riego.",
        trata: "Mantener el monitoreo constante, asegurar un abonado rico en potasio y vigilar que no haya cambios bruscos de temperatura que estresen la planta."
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