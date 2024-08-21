/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext, useState } from 'react';
import { Dimensions, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Divider } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Moment from 'moment';
import { AuthContext } from '../../contexts/AuthContext';
import { COLORS, ICON_SIZE, PADDING } from '../../tools/constants';
import homeStyles from '../Home/style';
import UpdateAccountScreen from './update_account';
import MyWorkScreen from './my_work';
import AvatarF from '../../assets/img/avatar-F.svg';
import AvatarM from '../../assets/img/avatar-M.svg';

const Tab = createMaterialBottomTabNavigator();

const AccountScreenContent = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Moment ===============
  Moment.locale('fr');

  // =============== Authentication context ===============
  const { userInfo, isLoading, updateAvatar, changePassword } = useContext(AuthContext);

  // =============== User data ===============
  const [former_password, setFormerPassword] = useState(null);
  const [new_password, setNewPassword] = useState(null);
  const [confirm_new_password, setConfirmNewPassword] = useState(null);

  // =============== Image crop picker ===============
  const imagePick = () => {
    ImagePicker.openPicker({
      width: 700,
      height: 700,
      cropping: true,
      includeBase64: true
    }).then(image => {
      updateAvatar(userInfo.id, `data:${image.mime};base64,${image.data}`);
      // console.log(`data:${image.mime};base64,${image.data}`);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Custom header */}
      <View style={homeStyles.headerBanner}>
        <TouchableOpacity style={[homeStyles.headerButton, { paddingVertical: 10 }]} onPress={() => navigation.goBack()}>
          <FontAwesome6 style={[homeStyles.headerButtonIcon, { fontSize: 20 }]} name='arrow-left' />
        </TouchableOpacity>
        <Text style={[homeStyles.headerTitle, { width: Dimensions.get('window').width - 140, textAlign: 'left' }]}>{t('navigation.account')}</Text>
        <TouchableOpacity style={[homeStyles.headerButton, { marginLeft: 0 }]} onPress={() => navigation.navigate('Cart')}>
          <MaterialCommunityIcons name='cart-outline' color={COLORS.white} size={23} />
        </TouchableOpacity>
        <TouchableOpacity style={[homeStyles.headerButton, { marginLeft: 0 }]} onPress={() => navigation.navigate('Notification')}>
          <MaterialCommunityIcons name='bell-outline' color={COLORS.white} size={23} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={{ flexGrow: 1, paddingHorizontal: 30, backgroundColor: COLORS.dark_light }}>
        <Spinner visible={isLoading} />

        {/* Profil photo */}
        <View style={{ alignItems: 'center', paddingTop: 30 }}>
          {userInfo.avatar_url != null
            ?
            <Image style={{ width: 160, height: 160, borderRadius: 160 / 2 }} source={{ uri: userInfo.avatar_url }} />
            :
            (userInfo.gender == 'F' ? <AvatarF width={160} height={160} /> : <AvatarM width={160} height={160} />)
          }
          <TouchableOpacity style={[homeStyles.headerButton, { backgroundColor: COLORS.primary, marginTop: -30, marginLeft: 100, borderRadius: 40 / 2, paddingVertical: 10 }]}
            onPress={imagePick}>
            <FontAwesome6 style={[homeStyles.headerButtonIcon, { fontSize: 20 }]} name='pen' />
          </TouchableOpacity>
        </View>

        {/* Personal infos */}
        <View style={[homeStyles.cardEmpty, { backgroundColor: COLORS.light, marginBottom: PADDING.vertical, marginLeft: 0 }]}>
          <Text style={[homeStyles.cardEmptyTitle, { width: Dimensions.get('window').width - 90, fontSize: 17, fontWeight: 500, textAlign: 'center', color: COLORS.dark_danger }]}>
            {t('personal_infos')}
          </Text>

          <Divider style={[homeStyles.authDivider, { width: Dimensions.get('window').width - 90, marginTop: 0, marginBottom: 15 }]} />
          {/* First name */}
          <Text style={{ fontWeight: 300, color: COLORS.dark_secondary }}>{t('auth.firstname')}</Text>
          <Text style={{ marginBottom: 10, fontSize: 17, color: COLORS.black }}>{userInfo.firstname != null ? userInfo.firstname : '. . . . .'}</Text>
          {/* Last name */}
          <Text style={{ fontWeight: 300, color: COLORS.dark_secondary }}>{t('auth.lastname')}</Text>
          <Text style={{ marginBottom: 10, fontSize: 17, color: COLORS.black }}>{userInfo.lastname != null ? userInfo.lastname : '. . . . .'}</Text>
          {/* Last name */}
          <Text style={{ fontWeight: 300, color: COLORS.dark_secondary }}>{t('auth.surname')}</Text>
          <Text style={{ marginBottom: 10, fontSize: 17, color: COLORS.black }}>{userInfo.surname != null ? userInfo.surname : '. . . . .'}</Text>
          {/* Date of birth */}
          <Text style={{ fontWeight: 300, color: COLORS.dark_secondary }}>{t('auth.birthdate')}</Text>
          <Text style={{ marginBottom: 10, fontSize: 17, color: COLORS.black }}>{userInfo.birthdate != null ? Moment(userInfo.birthdate).format('LL') : '. . . . .'}</Text>
          {/* Phone */}
          <Text style={{ fontWeight: 300, color: COLORS.dark_secondary }}>{t('auth.phone')}</Text>
          <Text style={{ marginBottom: 10, fontSize: 17, color: COLORS.black }}>{userInfo.phone != null ? userInfo.phone : '. . . . .'}</Text>
          {/* E-mail */}
          <Text style={{ fontWeight: 300, color: COLORS.dark_secondary }}>{t('auth.email')}</Text>
          <Text style={{ marginBottom: 10, fontSize: 17, color: COLORS.black }}>{userInfo.email != null ? userInfo.email : '. . . . .'}</Text>
        </View>

        {/* Change password */}
        <View style={[homeStyles.cardEmpty, { backgroundColor: COLORS.light, marginLeft: 0, marginBottom: 20 }]}>
          <Text style={[homeStyles.cardEmptyTitle, { width: Dimensions.get('window').width - 90, fontSize: 17, fontWeight: 500, textAlign: 'center', color: COLORS.dark_danger }]}>
            {t('change_password')}
          </Text>
          <Divider style={[homeStyles.authDivider, { width: Dimensions.get('window').width - 90, marginTop: 0, marginBottom: 15 }]} />

          {/* Former password */}
          <TextInput
            style={[homeStyles.authInput, { width: Dimensions.get('window').width - 90 }]}
            value={former_password}
            placeholder={t('auth.password.former')}
            onChangeText={text => setFormerPassword(text)} secureTextEntry />

          {/* New password */}
          <TextInput
            style={[homeStyles.authInput, { width: Dimensions.get('window').width - 90 }]}
            value={new_password}
            placeholder={t('auth.password.new')}
            onChangeText={text => setNewPassword(text)} secureTextEntry />

          {/* Confirm new password */}
          <TextInput
            style={[homeStyles.authInput, { width: Dimensions.get('window').width - 90 }]}
            value={confirm_new_password}
            placeholder={t('auth.confirm_password.new')}
            onChangeText={text => setConfirmNewPassword(text)} secureTextEntry />

          {/* Submit */}
          <Button style={[homeStyles.authButton, { width: Dimensions.get('window').width - 90, backgroundColor: COLORS.success, marginBottom: 5 }]}
            onPress={() => {
              changePassword(userInfo.id, former_password, new_password, confirm_new_password);
              setFormerPassword(null); setNewPassword(null); setConfirmNewPassword(null);
            }}>
            <Text style={homeStyles.authButtonText}>{t('update')}</Text>
          </Button>
        </View>

        {/* Disable account */}
        <TouchableOpacity style={[homeStyles.authButton, { backgroundColor: COLORS.light_danger, marginBottom: 30, paddingVertical: PADDING.vertical }]}>
          <Text style={[homeStyles.authButtonText, { color: COLORS.black }]}>{t('auth.status.disable')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const AccountScreen = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName='AccountContent'
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
      barStyle={{ backgroundColor: '#ccccee' }}
    >
      <Tab.Screen
        name='AccountContent' component={AccountScreenContent}
        options={{
          title: t('navigation.account'),
          tabBarLabel: t('navigation.account'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account-outline' color={color} size={ICON_SIZE.s1} />
          )
        }}
      />
      <Tab.Screen
        name='UpdateAccount' component={UpdateAccountScreen}
        options={{
          title: t('navigation.update_account'),
          tabBarLabel: t('navigation.update_account'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='cog-outline' color={color} size={ICON_SIZE.s1} />
          )
        }}
      />
      <Tab.Screen
        name='MyWork' component={MyWorkScreen}
        options={{
          title: t('navigation.work'),
          tabBarLabel: t('navigation.work'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='book-multiple-outline' color={color} size={ICON_SIZE.s1} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AccountScreen;