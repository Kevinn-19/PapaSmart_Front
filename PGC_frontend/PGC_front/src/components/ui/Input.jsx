function Input({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    name,      // 👈 Faltaba esta prop
    icon,      // 👈 Faltaba esta prop para los iconos de Lucide
    className, // 👈 Faltaba para recibir el estilo personalizado
    required,
    readOnly
}) {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="block mb-1">
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {/* Si pasamos un icono, lo renderizamos aquí */}
                {icon && (
                    <div className="absolute left-4 text-slate-400">
                        {icon}
                    </div>
                )}

                <input
                    name={name} // 👈 Crucial para que handleChange funcione
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    readOnly={readOnly}
                    className={`
                        w-full outline-none transition-all
                        ${icon ? 'pl-12' : 'pl-4'} 
                        ${className} 
                    `}
                />
            </div>
        </div>
    );
}

export default Input;