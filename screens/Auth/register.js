/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Linking } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import homeStyles from '../Home/style';
import moment from 'moment';
import RNTextArea from '@freakycoder/react-native-text-area';
import { COLORS } from '../../tools/constants';

const DatePickerField = ({ formik, name, title }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const { t } = useTranslation();

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          numberOfLines={1}
          editable={false}
          placeholder={t('auth.birthdate')}
          value={birthdate ? moment(birthdate).format('YYYY-MMMM-DD') : ''}
          style={homeStyles.authInput} />
        <Text style={homeStyles.buttonText}>{title}</Text>

        <DatePicker modal open={isDatePickerVisible}
          date={birthdate ? new Date(birthdate) : new Date()}
          onConfirm={(date) => {
            setDatePickerVisibility(false);
            formik.setFieldValue(name, date);
            setBirthdate(date);
          }}
          onCancel={hideDatePicker}
          mode='date'
          maximumDate={new Date(moment().subtract(1, 'days'))}
        />
      </TouchableOpacity>
    </View>
  );
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

      {/* Gender  */}
      <TextInput
        style={homeStyles.authInput}
        value={gender}
        placeholder={t('auth.gender')}
        onChangeText={text => setGender(text)} />

      {/* Birth date */}
      <DatePickerField formik={text => setBirthdate(text)} name={birthdate} />

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
      <RNTextArea
        maxCharLimit={100}
        placeholderTextColor={COLORS.black}
        exceedCharCountColor={COLORS.danger}
        value={address_1}
        placeholder={t('auth.address_1')}
        onChangeText={text => setAddress1(text)} />

      {/* Address 2  */}
      <RNTextArea
        maxCharLimit={100}
        placeholderTextColor={COLORS.black}
        exceedCharCountColor={COLORS.danger}
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