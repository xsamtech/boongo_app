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

    // const register = (firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password) => {
    //     axios.post(`${API.url}/user`, {
    //         firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password

    //     })
    //     .then(res => {
    //         let message = res.message;

    //         console.log(message);
    //     })
    //     .catch(e => {
    //         console.log(`${t.error}${e}`);
    //     });
    // };

    const register = (firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password) => {
        fetch(`${API.url}/user`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'access-control-allow-origin': '*'
            },
            body: JSON.stringify({
              'firstname': firstname,
              'lastname': lastname,
              'surname': surname,
              'gender': gender,
              'birthdate': birthdate,
              'city': city,
              'country': country,
              'address_1': address_1,
              'address_2': address_2,
              'p_o_box': p_o_box,
              'email': email,
              'phone': phone,
              'username': username,
              'password': password,
              'confirm_password': confirm_password
            }),
        })
        .then(data => {
            return data.message;
        })
        .catch(e => {
            console.log(`${e} ${API.url}/user`);
            ToastAndroid.show(`${e}`, ToastAndroid.LONG);
        });
    };

    return (
        <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
    );
}