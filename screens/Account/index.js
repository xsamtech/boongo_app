/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import accountStyles from './style';

const AccountScreen = (props) => {
  const { t } = useTranslation();

  return (
    <View style={accountStyles.view}>
      <Text style={accountStyles.heading}>{t('navigation.account')}</Text>
      <TouchableOpacity style={accountStyles.button} onPress={() => props.navigation.navigate('Cart', { name: 'My orders' })}>
        <Text style={accountStyles.text}>{t('navigation.cart')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={accountStyles.button} onPress={() => props.navigation.navigate('MyWork', { name: 'My works' })}>
        <Text style={accountStyles.text}>{t('navigation.work')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;