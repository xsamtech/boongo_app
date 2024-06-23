/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import homeStyles from '../Home/style';
import { API } from '../../tools/constants';

const PasswordResetScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const countriesList = () => {
    fetch(`${API.url}/country`)
      .then((res) => {
        return res.json(); // Convert result into readable format / parsed
      })
      .then((countries) => {
        ToastAndroid.show(JSON.stringify(countries.data), ToastAndroid.LONG);
      });
  };

  return (
    <View style={homeStyles.view}>
      <Text style={homeStyles.heading}>{t('auth.password.reset')}</Text>
      <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={homeStyles.buttonText}>{t('register')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={homeStyles.buttonText}>{t('login')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.authCancel} onPress={countriesList}>
        <Text style={homeStyles.authCancelText}>{t('show')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordResetScreen;