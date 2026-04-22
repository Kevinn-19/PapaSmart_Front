function Alert({ message }) {
    if (!message) return null;

    return (
        <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
            {message}
        </div>
    );
}

export default Alert;