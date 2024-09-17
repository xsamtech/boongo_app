/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, SafeAreaView, View, TextInput, ScrollView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { API, COLORS, PADDING } from '../../tools/constants';
import { AuthContext } from '../../contexts/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import homeStyles from '../Home/style';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const UpdateAccountScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Authentication context ===============
  const { userInfo, isLoading, update } = useContext(AuthContext);

  // =============== User data ===============
  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [lastname, setLastname] = useState(userInfo.lastname);
  const [surname, setSurname] = useState(userInfo.surname);
  const [city, setCity] = useState(userInfo.city);
  const [address_1, setAddress1] = useState(userInfo.address_1);
  const [address_2, setAddress2] = useState(userInfo.address_2);
  const [p_o_box, setPOBox] = useState(userInfo.p_o_box);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [username, setUsername] = useState(userInfo.username);
  // const [password, setPassword] = useState(null);
  // const [confirm_password, setConfirmPassword] = useState(null);
  // COUNTRY dropdown
  const [isFocus, setIsFocus] = useState(false);
  const [country, setCountry] = useState(userInfo.country);
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
  const [gender, setGender] = useState(userInfo.gender);
  const [genderItems, setGenderItems] = useState([
    { label: t('auth.gender.male'), value: 'M' },
    { label: t('auth.gender.female'), value: 'F' }
  ]);
  // BIRTH DATE date-picker
  const [birthdate, setBirthdate] = useState(userInfo.birthdate);
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
    <SafeAreaView style={{ flex: 1 }}>
      {/* Custom header */}
      <View style={homeStyles.headerBanner}>
        <TouchableOpacity style={[homeStyles.headerButton, { paddingVertical: 10 }]} onPress={() => navigation.goBack()}>
          <FontAwesome6 style={[homeStyles.headerButtonIcon, { fontSize: 20 }]} name='arrow-left' />
        </TouchableOpacity>
        <Text style={[homeStyles.headerTitle, { width: Dimensions.get('window').width - 140, textAlign: 'left' }]}>{t('navigation.update_account')}</Text>
      </View>

      {/* Content */}
      <View style={{ flexGrow: 1 }}>
        <Spinner visible={isLoading} />

        <ScrollView nestedScrollEnabled={true} style={{ padding: 30 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
          {/* First name */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.firstname')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={firstname}
            placeholder={t('auth.firstname')}
            onChangeText={text => setFirstname(text)} />

          {/* Last name */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.lastname')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={lastname}
            placeholder={t('auth.lastname')}
            onChangeText={text => setLastname(text)} />

          {/* Surname */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.surname')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={surname}
            placeholder={t('auth.surname')}
            onChangeText={text => setSurname(text)} />

          {/* Username */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.username')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={username}
            placeholder={t('auth.username')}
            onChangeText={text => setUsername(text)} />

          {/* Gender  */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.gender.label')}</Text>
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
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.birthdate')}</Text>
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
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.country.label')}</Text>
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
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.city')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={city}
            placeholder={t('auth.city')}
            onChangeText={text => setCity(text)} />

          {/* Address 1  */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.address_1')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={address_1}
            placeholder={t('auth.address_1')}
            onChangeText={text => setAddress1(text)} />

          {/* Address 2  */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.address_2')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={address_2}
            placeholder={t('auth.address_2')}
            onChangeText={text => setAddress2(text)} />

          {/* P.O. box */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.p_o_box')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={p_o_box}
            placeholder={t('auth.p_o_box')}
            onChangeText={text => setPOBox(text)} />

          {/* E-mail */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.email')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={email}
            placeholder={t('auth.email')}
            onChangeText={text => setEmail(text)} />

          {/* Phone number */}
          <Text style={{ paddingVertical: 5, paddingHorizontal: PADDING.horizontal }}>{t('auth.phone')}</Text>
          <TextInput
            style={homeStyles.authInput}
            value={phone}
            placeholder={t('auth.phone')}
            onChangeText={text => setPhone(text)} />

          {/* Submit */}
          <Button style={[homeStyles.authButton, { backgroundColor: COLORS.primary, marginTop: 14 }]} onPress={() => {
            update(userInfo.id, firstname, lastname, surname, gender, birthdate, city, country, address_1, address_2, p_o_box, email, phone, username);
            navigation.navigate('Account');
          }}>
            <Text style={homeStyles.authButtonText}>{t('update')}</Text>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAccountScreen;