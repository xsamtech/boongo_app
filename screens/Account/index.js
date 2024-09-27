/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext, useState } from 'react';
import { Dimensions, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
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

const Tab = createMaterialBottomTabNavigator();

const AccountScreenContent = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Navigation ===============
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Custom header */}
      <View style={homeStyles.headerBanner}>
        <TouchableOpacity style={[homeStyles.headerButton, { paddingVertical: 10 }]} onPress={() => navigation.goBack()}>
          <FontAwesome6 style={[homeStyles.headerButtonIcon, { fontSize: 20 }]} name='arrow-left' />
        </TouchableOpacity>
        <Text style={[homeStyles.headerTitle, { width: Dimensions.get('window').width - 140, textAlign: 'left' }]}>{t('navigation.account')}</Text>
      </View>

      {/* Content */}
      <ScrollView style={{ flexGrow: 1, paddingHorizontal: 30, backgroundColor: COLORS.dark_light }}>
        <Spinner visible={isLoading} />

        {/* Profil photo */}
        <View style={[homeStyles.cardEmpty, { alignItems: 'center', paddingTop: 30 }]}>
          <Text style={[homeStyles.cardEmptyTitle, { width: Dimensions.get('window').width - 90, fontSize: 17, fontWeight: 500, textAlign: 'center', color: COLORS.dark_danger }]}>
            {t('personal_infos')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AccountScreen = () => {
  // =============== Language ===============
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