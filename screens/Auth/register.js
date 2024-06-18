/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Linking } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import homeStyles from '../Home/style';

const RegisterScreen = () => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [surname, setSurname] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [city, setCity] = useState(null);
  const [address_1, setAddress1] = useState(null);
  const [address_2, setAddress2] = useState(null);
  const [p_o_box, setPOBox] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setConfirmPassword] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <ScrollView style={{ flex: 1, paddingVertical: 50, paddingHorizontal: 30 }}>
      {/* Brand / Title */}
      <View style={homeStyles.authlogo}>
        <Image source={require('../../assets/img/brand.png')} />
      </View>
      <Text style={homeStyles.authTitle}>{t('register')}</Text>

      {/* First name */}
      <TextInput
        style={homeStyles.authInput}
        value={firstname}
        placeholder={t('auth.firstname')}
        onChangeText={text => setFirstname(text)} />

      {/* Last name */}
      <TextInput
        style={homeStyles.authInput}
        value={lastname}
        placeholder={t('auth.lastname')}
        onChangeText={text => setLastname(text)} />

      {/* Surname */}
      <TextInput
        style={homeStyles.authInput}
        value={surname}
        placeholder={t('auth.surname')}
        onChangeText={text => setSurname(text)} />

      {/* Surname */}
      <TextInput
        style={homeStyles.authInput}
        value={surname}
        placeholder={t('auth.surname')}
        onChangeText={text => setSurname(text)} />

      {/* Gender  */}
      <TextInput
        style={homeStyles.authInput}
        value={username}
        placeholder={t('auth.login_username')}
        onChangeText={text => setUsername(text)} />

      {/* Password */}
      <TextInput
        style={homeStyles.authInput}
        value={password}
        placeholder={t('auth.password.label')}
        onChangeText={text => setPassword(text)} secureTextEntry />

      {/* Submit */}
      <Button style={homeStyles.authButton}>
        <Text style={homeStyles.authButtonText}>{t('login')}</Text>
      </Button>

      {/* Register link */}
      <View>
        <Text style={homeStyles.authText}>{t('no_account')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={homeStyles.authLink}>{t('register')}</Text>
        </TouchableOpacity>
      </View>

      {/* Copyright */}
      <Divider style={homeStyles.authDivider} />
      <Text style={homeStyles.authBottomText}>{t('copyright')} | {t('all_rights_reserved')}</Text>
      <Text style={homeStyles.authBottomText}>
        Designed by <Text style={homeStyles.authBottomLink} onPress={() => Linking.openURL('https://xsamtech.com')}> Xsam Technologies</Text>
      </Text>
    </ScrollView>
  );
};

export default RegisterScreen;