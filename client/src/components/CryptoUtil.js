import CryptoJS from 'crypto-js';

// Encryption function
export const encryptData = (data, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
};

// Decryption function
export const decryptData = (encryptedData, secretKey) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
};
