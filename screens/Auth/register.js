/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Linking, Platform, NativeModules } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { useTranslation } from 'react-i18next';
import homeStyles from '../Home/style';
import { AuthContext } from '../../contexts/AuthContext';

const getDeviceLang = () => {
  const appLanguage = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

  return appLanguage.search(/-|_/g) !== -1 ? appLanguage.slice(0, 2) : appLanguage;
};

const RegisterScreen = () => {
  // User data
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [surname, setSurname] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [address_1, setAddress1] = useState(null);
  const [address_2, setAddress2] = useState(null);
  const [p_o_box, setPOBox] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setConfirmPassword] = useState(null);
  // Navigation
  const navigation = useNavigation();
  // Language
  const { t } = useTranslation();
  // Authentication context
  const { register } = useContext(AuthContext);

  return (
    <ScrollView style={{ flex: 1, paddingVertical: 50, paddingHorizontal: 30 }}>
      {/* Brand / Title */}
      <View style={homeStyles.authlogo}>
        <Image source={require('../../assets/img/brand.png')} />
      </View>
      {/* <Text style={homeStyles.authTitle}>{t('register')}</Text> */}

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

      {/* Gender  */}
      <TextInput
        style={homeStyles.authInput}
        value={gender}
        placeholder={t('auth.gender')}
        onChangeText={text => setGender(text)} />

      {/* Birth date */}
      {/* <DatePickerField formik={text => setBirthdate(text)} name={birthdate} /> */}
      <DatePickerInput
        style={homeStyles.authInput}
        locale={getDeviceLang()}
        value={birthdate}
        label={t('auth.birthdate')}
        onChangeText={text => setBirthdate(text)}
        inputMode='start' />

      {/* City  */}
      <TextInput
        style={homeStyles.authInput}
        value={city}
        placeholder={t('auth.city')}
        onChangeText={text => setCity(text)} />

      {/* Country  */}
      <TextInput
        style={homeStyles.authInput}
        value={country}
        placeholder={t('auth.country')}
        onChangeText={text => setCountry(text)} />

      {/* Address 1  */}
      <TextInput
        style={homeStyles.authInput}
        value={address_1}
        placeholder={t('auth.address_1')}
        onChangeText={text => setAddress1(text)} />

      {/* Address 2  */}
      <TextInput
        style={homeStyles.authInput}
        value={address_2}
        placeholder={t('auth.address_2')}
        onChangeText={text => setAddress2(text)} />

      {/* P.O. box */}
      <TextInput
        style={homeStyles.authInput}
        value={p_o_box}
        placeholder={t('auth.p_o_box')}
        onChangeText={text => setPOBox(text)} />

      {/* E-mail */}
      <TextInput
        style={homeStyles.authInput}
        value={email}
        placeholder={t('auth.email')}
        onChangeText={text => setEmail(text)} />

      {/* Phone number */}
      <TextInput
        style={homeStyles.authInput}
        value={phone}
        placeholder={t('auth.phone')}
        onChangeText={text => setPhone(text)} />

      {/* Username */}
      <TextInput
        style={homeStyles.authInput}
        value={username}
        placeholder={t('auth.username')}
        onChangeText={text => setUsername(text)} />

      {/* Password */}
      <TextInput
        style={homeStyles.authInput}
        value={password}
        placeholder={t('auth.password.label')}
        onChangeText={text => setPassword(text)} secureTextEntry />

      {/* Confirm password */}
      <TextInput
        style={homeStyles.authInput}
        value={confirm_password}
        placeholder={t('auth.confirm_password.label')}
        onChangeText={text => setConfirmPassword(text)} secureTextEntry />

      {/* Submit */}
      <Button style={homeStyles.authButton} onPress={() => {
        register(firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password);
      }}>
        <Text style={homeStyles.authButtonText}>{t('login')}</Text>
      </Button>

      {/* Register link */}
      <View>
        <Text style={homeStyles.authText}>{t('have_account')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={homeStyles.authLink}>{t('login')}</Text>
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