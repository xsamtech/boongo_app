/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text } from 'react-native';
import React from 'react';
import homeStyles from '../Home/style';

const NotificationScreen = () => {
  return (
    <View style={[homeStyles.cardEmpty, {flex: 1}]}>
      <Text style={homeStyles.homeTitleOne}>Notification</Text>
    </View>
  );
};

export default NotificationScreen;