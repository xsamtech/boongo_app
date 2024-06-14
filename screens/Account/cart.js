/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text } from 'react-native';
import React from 'react';
import accountStyles from './style';

const CartScreen = () => {
  return (
    <View style={accountStyles.view}>
      <Text style={accountStyles.heading}>My orders</Text>
    </View>
  );
};

export default CartScreen;