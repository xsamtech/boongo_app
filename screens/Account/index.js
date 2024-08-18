/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { COLORS, ICON_SIZE, WEB } from '../../tools/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import homeStyles from '../Home/style';
import UpdateAccountScreen from './update_account';
import MyWorkScreen from './my_work';

const Tab = createMaterialBottomTabNavigator();

const AccountScreenContent = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

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
      <View style={{ flexGrow: 1 }}>
        <Text>{t('navigation.account')}</Text>
      </View>
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