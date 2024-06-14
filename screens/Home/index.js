/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import homeStyles from './style';

const HomeScreen = () => {
  return (
    <View style={homeStyles.view}>
      <Text style={homeStyles.heading}>Home</Text>
      <TouchableOpacity style={homeStyles.button} onPress={() => this.props.navigation.navigate('Account', { name: 'Xanders' })}>
        <Text style={homeStyles.text}>View account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;