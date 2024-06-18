/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import homeStyles from '../Home/style';

const PasswordResetScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={homeStyles.view}>
      <Text style={homeStyles.heading}>{t('auth.password.reset')}</Text>
      <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={homeStyles.buttonText}>{t('register')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={homeStyles.buttonText}>{t('login')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordResetScreen;