/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { createContext } from 'react'
import axios from 'axios';
import { API } from '../tools/constants';
import { useTranslation } from 'react-i18next';
import { ToastAndroid } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { t } = useTranslation();

    const register = (firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password) => {
        axios.post(`${API.url}/user`, {
            firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password

        })
        .then(res => {
            let message = res.message;

            ToastAndroid.show(message, ToastAndroid.LONG);
            console.log(message);
        })
        .catch(e => {
            ToastAndroid.show(`${t.error}${e}`, ToastAndroid.LONG);
            console.log(`${t.error}${e}`);
        });
    };

    return (
        <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
    );
}