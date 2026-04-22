function Button({ text, type = "button" }) {
    return (
        <button
            type={type}
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
        >
            {text}
        </button>
    );
}

export default Button;