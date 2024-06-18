/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTranslation } from 'react-i18next';
import AboutScreen from '../About';
import TermsScreen from '../About/terms';
import PrivacyScreen from '../About/privacy';

const Tab = createMaterialBottomTabNavigator();

const AboutBottomTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name='About'
        component={AboutScreen}
        options={{
          tabBarLabel: t('navigation.about'),
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name='' color={color} size={ICON_SIZE.s1} />
          // ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Terms'
        component={TermsScreen}
        options={{
          tabBarLabel: t('navigation.terms'),
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name='chat-outline' color={color} size={ICON_SIZE.s1} />
          // )
        }}
      />
      <Tab.Screen
        name='Privacy'
        component={PrivacyScreen}
        options={{
          tabBarLabel: t('navigation.privacy'),
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name='handshake-outline' color={color} size={ICON_SIZE.s1} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AboutBottomTabs;