// User_Context.js

import React, { createContext, useState, useEffect } from 'react';
import { enc, AES } from 'crypto-js';

const SECRET_KEY = 'D7F4E9A2C5B8A1F3E6D9B2C5A8F1E4B7';

export const UserContext = createContext({
    username: '',
    role: '',
    setUser: () => { },
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const decryptedUser = AES.decrypt(storedUser, SECRET_KEY).toString(enc.Utf8);
            return JSON.parse(decryptedUser);
        } else {
            return { username: '', role: '' };
        }
    });

    useEffect(() => {
        const encryptedUser = AES.encrypt(JSON.stringify(user), SECRET_KEY).toString();
        sessionStorage.setItem('user', encryptedUser);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
