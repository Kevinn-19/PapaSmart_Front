import { useState, useEffect } from "react";
import Hero from "./Hero";
import Carousel from "./Carousel";
import Importance from "./Importance";
import Features from "./Features";
import Diseases from "./Diseases";

function Home() {
    // Estado compartido para sincronizar las imágenes de las cartas en Diseases
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % 3); // Cambia cada 5s entre las 3 imágenes disponibles
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col">

            {/* 1. Header/Hero: Componente aparte con toda la lógica visual de bienvenida */}
            <Hero />

            {/* Contenedor del contenido principal */}
            <main className="flex flex-col">

                <div className="bg-gray-50 -mt-4">
                    <Carousel />
                </div>

                <Importance />

                <Features />

                {/* Pasamos el currentIndex para que las cartas cambien solas */}
                <Diseases currentIndex={currentIndex} />

            </main>

            {/* Footer sencillo para cerrar el diseño */}
            <footer className="py-8 text-center text-gray-400 text-sm bg-white border-t border-gray-100">
                &copy; {new Date().getFullYear()} PapaSmart - IA aplicada al campo.
            </footer>

        </div>
    );
}

export default Home;