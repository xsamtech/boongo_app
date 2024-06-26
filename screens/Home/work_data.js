/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, Button } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const WorkDataScreen = ({ route, navigation }) => {
  // =============== Get ID parameters ===============
  const {itemId} = route.params;

  // =============== Navigation ===============
  // const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
      <View>
        <Text>{itemId}</Text>
        <Button title='Go back' onPress={() => navigation.goBack()}/>
      </View>
    </ScrollView>
  );
};

export default WorkDataScreen;