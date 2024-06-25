/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Linking, Platform, NativeModules, Pressable, ToastAndroid } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';
import homeStyles from '../Home/style';
import { AuthContext } from '../../contexts/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import { API, COLORS } from '../../tools/constants';
import axios from 'axios';

const RegisterScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Authentication context ===============
  const { isLoading, register } = useContext(AuthContext);

  // =============== User data ===============
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [surname, setSurname] = useState(null);
  const [city, setCity] = useState(null);
  const [address_1, setAddress1] = useState(null);
  const [address_2, setAddress2] = useState(null);
  const [p_o_box, setPOBox] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setConfirmPassword] = useState(null);
  // COUNTRY dropdown
  const [isFocus, setIsFocus] = useState(false);
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const config = {
      method: 'GET',
      url: `${API.url}/country`,
      headers: {
        'X-localization': 'fr'
      }
    };

    axios(config)
      .then(function (response) {
        const count = Object.keys(response.data.data).length;
        let countryArray = [];

        for (let i = 0; i < count; i++) {
          countryArray.push({
            value: response.data.data[i].id,
            label: response.data.data[i].country_name
          })
        }

        setCountries(countryArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // GENDER dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: t('auth.gender.male'), value: 'M' },
    { label: t('auth.gender.female'), value: 'F' }
  ]);
  // BIRTH DATE date-picker
  const [birthdate, setBirthdate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Show/Hide Datepicker
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  // On change, update date value
  const mOnChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate;

      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setBirthdate(formatDate(currentDate));
      }

    } else {
      toggleDatePicker();
    }
  };

  // If Platform is iOS, customize cofirmation button
  const confirmIOSDate = () => {
    setBirthdate(formatDate(date));
    toggleDatePicker();
  };

  // Format Date according to MySQL
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={isLoading} />

      <ScrollView nestedScrollEnabled={true}
        style={{ paddingVertical: 50, paddingHorizontal: 30 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
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
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGender}
          setItems={setGenderItems}
          listMode="SCROLLVIEW" />

        {/* Birth date */}
        {showPicker && (
          <DateTimePicker
            mode='date'
            display='spinner'
            value={date}
            onChange={mOnChange}
            maximumDate={new Date('2018-1-1')} />
        )}
        {showPicker && Platform.OS === 'ios' && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={homeStyles.authCancel} onPress={toggleDatePicker}>
              <Text style={homeStyles.authCancelText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.authButton} onPress={confirmIOSDate}>
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

        {/* Country  */}
        <Dropdown
          style={[homeStyles.authInput, { height: 50 }]}
          data={countries}
          search
          labelField='label'
          valueField='value'
          placeholder={!isFocus ? t('auth.country.label') : '...'}
          searchPlaceholder={t('search')}
          maxHeight={300}
          value={country}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCountry(item.value);
            setIsFocus(false);
          }} />

        {/* City  */}
        <TextInput
          style={homeStyles.authInput}
          value={city}
          placeholder={t('auth.city')}
          onChangeText={text => setCity(text)} />

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
        <Button style={[homeStyles.authButton, { backgroundColor: COLORS.success }]} onPress={() => {
          register(firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username, password, confirm_password, 4);
          navigation.navigate('Login');
        }}>
          <Text style={homeStyles.authButtonText}>{t('register')}</Text>
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
    </View>
  );
};

export default RegisterScreen;