/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text } from 'react-native';
import React from 'react';
import accountStyles from './style';

const AccountScreen = (props) => {
  return (
    <View style={accountStyles.view}>
      <Text style={accountStyles.heading}>Account</Text>
      <TouchableOpacity style={homeStyles.button} onPress={() => props.navigation.navigate('Cart', { name: 'My orders' })}>
        <Text style={homeStyles.text}>My orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.button} onPress={() => props.navigation.navigate('MyWork', { name: 'My works' })}>
        <Text style={homeStyles.text}>My works</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;