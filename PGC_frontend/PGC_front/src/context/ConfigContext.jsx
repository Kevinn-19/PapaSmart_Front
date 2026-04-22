import React, { createContext, useState, useEffect, useContext } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    // Estado de Modo Oscuro
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    // Estado de Idioma (Detecta zona: es, en, fr, etc.)
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('lang') || navigator.language.split('-')[0] || 'es';
    });

    // Diccionario de traducciones
    const translations = {
        es: {
            welcome: "Bienvenido",
            subtitle: "Gestiona y analiza la salud de tus lotes de papa.",
            newProject: "Nuevo Proyecto",
            logout: "Cerrar Sesión",
            dark: "Modo Oscuro",
            light: "Modo Claro",
            lang: "Idioma",
            samples: "Muestras",
            health: "Salud Lote",
            viewReport: "Ver Reporte IA"
        },
        en: {
            welcome: "Welcome",
            subtitle: "Manage and analyze the health of your potato lots.",
            newProject: "New Project",
            logout: "Sign Out",
            dark: "Dark Mode",
            light: "Light Mode",
            lang: "Language",
            samples: "Samples",
            health: "Lot Health",
            viewReport: "View AI Report"
        }
    };

    const t = translations[language] || translations.es;

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('lang', language);
    }, [language]);

    return (
        <ConfigContext.Provider value={{ darkMode, setDarkMode, language, setLanguage, t }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);