/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { API } from '../tools/constants';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const register = (firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password, role_id) => {
        setIsLoading(true);

        axios.post(`${API.url}/user`, {
            firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password, role_id
        }).then(res => {
            let message = res.data.message;
            let userData = res.data.data.user;

            setUserInfo(userData);

            AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            ToastAndroid.show(`${message}`, ToastAndroid.LONG);

            console.log(`${message}`);
            setIsLoading(false);

        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                ToastAndroid.show(`${error.response.data.message || error.response.data}`, ToastAndroid.LONG);
                console.log(`${error.response.status} -> ${error.response.data.message || error.response.data}`);

            } else if (error.request) {
                // The request was made but no response was received
                ToastAndroid.show(t('error') + ' ' + t('error_message.no_server_response'), ToastAndroid.LONG);

            } else {
                // An error occurred while configuring the query
                ToastAndroid.show(`${error}`, ToastAndroid.LONG);
            }

            setIsLoading(false);
        });
    };

    const update = (id, firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username) => {
        setIsLoading(true);

        axios.put(`${API.url}/user/${id}`, {
            id, firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username
        }, {
            headers: { 'Authorization': `Bearer ${userInfo.api_token}` }
        }).then(res => {
            let message = res.data.message;
            let userData = res.data.data;

            setUserInfo(userData);

            AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            ToastAndroid.show(`${message}`, ToastAndroid.LONG);

            console.log(`${message}`);
            setIsLoading(false);

        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                ToastAndroid.show(`${error.response.data.message || error.response.data}`, ToastAndroid.LONG);
                console.log(`${error.response.status} -> ${error.response.data.message || error.response.data}`);

            } else if (error.request) {
                // The request was made but no response was received
                ToastAndroid.show(t('error') + ' ' + t('error_message.no_server_response'), ToastAndroid.LONG);

            } else {
                // An error occurred while configuring the query
                ToastAndroid.show(`${error}`, ToastAndroid.LONG);
            }

            setIsLoading(false);
        });
    };

    const updateAvatar = (user_id, image_64) => {
        setIsLoading(true);

        axios.put(`${API.url}/user/update_avatar_picture/${user_id}`, {
            user_id, image_64
        }, {
            headers: { 'Authorization': `Bearer ${userInfo.api_token}` }
        }).then(res => {
            let message = res.data.message;
            let userData = res.data.data;

            setUserInfo(userData);

            AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            ToastAndroid.show(`${message}`, ToastAndroid.LONG);

            console.log(`${message}`);
            setIsLoading(false);

        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                ToastAndroid.show(`${error.response.data.message || error.response.data}`, ToastAndroid.LONG);
                console.log(`${error.response.status} -> ${error.response.data.message || error.response.data}`);

            } else if (error.request) {
                // The request was made but no response was received
                ToastAndroid.show(t('error') + ' ' + t('error_message.no_server_response'), ToastAndroid.LONG);

            } else {
                // An error occurred while configuring the query
                ToastAndroid.show(`${error}`, ToastAndroid.LONG);
            }

            setIsLoading(false);
        });
    };

    const changePassword = (id, former_password, new_password, confirm_new_password) => {
        setIsLoading(true);

        axios.put(`${API.url}/user/update_password/${id}`, {
            former_password, new_password, confirm_new_password
        }, {
            headers: { 'Authorization': `Bearer ${userInfo.api_token}` }
        }).then(res => {
            let message = res.data.message;

            ToastAndroid.show(`${message}`, ToastAndroid.LONG);

            console.log(`${message}`);
            setIsLoading(false);

        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                ToastAndroid.show(`${error.response.data.message || error.response.data}`, ToastAndroid.LONG);
                console.log(`${error.response.status} -> ${error.response.data.message || error.response.data}`);

            } else if (error.request) {
                // The request was made but no response was received
                ToastAndroid.show(t('error') + ' ' + t('error_message.no_server_response'), ToastAndroid.LONG);

            } else {
                // An error occurred while configuring the query
                ToastAndroid.show(`${error}`, ToastAndroid.LONG);
            }

            setIsLoading(false);
        });
    };

    const login = (username, password) => {
        setIsLoading(true);

        axios.post(`${API.url}/user/login`, {
            username, password
        }).then(res => {
            // let success = res.data.sucess;
            let message = res.data.message;
            let userData = res.data.data;

            setUserInfo(userData);

            AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            ToastAndroid.show(`${message}`, ToastAndroid.LONG);

            console.log(`${message}`);
            setIsLoading(false);
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                ToastAndroid.show(`${error.response.data.message || error.response.data}`, ToastAndroid.LONG);
                console.log(`${error.response.status} -> ${error.response.data.message || error.response.data}`);

            } else if (error.request) {
                // The request was made but no response was received
                ToastAndroid.show(t('error') + ' ' + t('error_message.no_server_response'), ToastAndroid.LONG);

            } else {
                // An error occurred while configuring the query
                ToastAndroid.show(`${error}`, ToastAndroid.LONG);
            }

            setIsLoading(false);
        });
    };

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                ToastAndroid.show(`${error.response.data.message || error.response.data}`, ToastAndroid.LONG);
                console.log(`${error.response.status} -> ${error.response.data.message || error.response.data}`);

            } else if (error.request) {
                // The request was made but no response was received
                ToastAndroid.show(t('error') + ' ' + t('error_message.no_server_response'), ToastAndroid.LONG);

            } else {
                // An error occurred while configuring the query
                ToastAndroid.show(`${error}`, ToastAndroid.LONG);
            }

            setSplashLoading(false);
        }
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
    };

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider
            value={{ isLoading, userInfo, splashLoading, register, update, updateAvatar, changePassword, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}