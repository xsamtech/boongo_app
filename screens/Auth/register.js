/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Linking, Platform, NativeModules, Pressable } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';
import homeStyles from '../Home/style';
import { AuthContext } from '../../contexts/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Authentication context ===============
  const { register } = useContext(AuthContext);

  // =============== User data ===============
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [surname, setSurname] = useState(null);
  // GENDER dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [items, setItems] = useState([
    { label: t('auth.gender.male'), value: 'M' },
    { label: t('auth.gender.female'), value: 'F' }
  ]);
  // BIRTH DATE date-picker
  const [birthdate, setBirthdate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const mOnChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate;

      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setBirthdate(currentDate.toDateString());
      }

    } else {
      toggleDatePicker();
    }
  };

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

  return (
    <ScrollView nestedScrollEnabled={true} style={{ flex: 1, paddingVertical: 50, paddingHorizontal: 30 }}>
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
      <DropDownPicker
        style={homeStyles.authInput}
        open={genderOpen}
        value={gender}
        placeholder={t('auth.gender.label')}
        items={items}
        setOpen={setGenderOpen}
        setValue={setGender}
        setItems={setItems}
        listMode="SCROLLVIEW" />

      {/* Birth date */}
      {showPicker && (
        <DateTimePicker
          mode='date'
          display='spinner'
          value={date}
          onChange={mOnChange} />
      )}
      {showPicker && Platform.OS === 'ios' && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={homeStyles.authCancel} onPress={toggleDatePicker}>
            <Text style={homeStyles.authCancelText}>{t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={homeStyles.authButton} onPress={toggleDatePicker}>
            <Text style={homeStyles.authButtonText}>{t('confirm')}</Text>
          </TouchableOpacity>
        </View>
      )}
      {!showPicker && (
        <TextInput
          style={homeStyles.authInput}
          value={birthdate}
          placeholder={t('auth.birthdate')}
          onChangeText={setBirthdate}
          onPressIn={toggleDatePicker} />
      )}

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
        register(firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password, 4);
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