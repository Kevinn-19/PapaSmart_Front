// utils/crypto.js
const SECRET_KEY = "8z2pX9vL!mQ5rT&wY1hJ#kS4nB7fG6uV";

export const encryptPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Llave de 32 bytes
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", encoder.encode(SECRET_KEY.padEnd(32, '0').slice(0, 32)),
        { name: "AES-GCM" }, false, ["encrypt"]
    );

    // IV FIJO (Esto es lo que permite que el Login funcione)
    // Usamos una secuencia fija de 12 bytes en lugar de random
    const iv = new Uint8Array([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);

    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        keyMaterial,
        data
    );

    const encryptedArray = new Uint8Array(encrypted);
    return btoa(String.fromCharCode(...encryptedArray));
};