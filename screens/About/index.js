/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ICON_SIZE, WEB } from '../../tools/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import WebView from 'react-native-webview';
import homeStyles from '../Home/style';
import TermsScreen from '../About/terms';
import ContactScreen from './contact';

const Tab = createMaterialBottomTabNavigator();

const AboutScreenContent = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      {/* Custom header */}
      <View style={homeStyles.headerBanner}>
        <TouchableOpacity style={homeStyles.headerButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 style={homeStyles.headerButtonIcon} name='angle-left' />
        </TouchableOpacity>
        <Text style={homeStyles.headerTitle}>{t('navigation.about')}</Text>
      </View>

      {/* Content */}
      <WebView source={{ uri: WEB.url + '/about?app_id=1a' }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
};

const AboutScreen = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName='AboutContent'
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
      barStyle={{ backgroundColor: '#ccccee' }}
    >
      <Tab.Screen
        name='AboutContent' component={AboutScreenContent}
        options={{
          title: t('navigation.about'),
          tabBarLabel: t('navigation.about'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='help-circle-outline' color={color} size={ICON_SIZE.s1} />
          )
        }}
      />
      <Tab.Screen
        name='Terms' component={TermsScreen}
        options={{
          title: t('navigation.terms'),
          tabBarLabel: t('navigation.terms'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='handshake-outline' color={color} size={ICON_SIZE.s1} />
          )
        }}
      />
      <Tab.Screen
        name='Contact' component={ContactScreen}
        options={{
          title: t('navigation.contact'),
          tabBarLabel: t('navigation.contact'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='phone-outline' color={color} size={ICON_SIZE.s1} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AboutScreen;