/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text } from 'react-native';
import React from 'react';
import accountStyles from './style';

const NotificationScreen = () => {
  return (
    <View style={accountStyles.view}>
      <Text style={accountStyles.heading}>Notification</Text>
    </View>
  );
};

export default NotificationScreen;