/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const BookScreen = () => {
  const data = [];

  return (
    <ScrollView>
      <View>
        <Text>Book</Text>
      </View>
    </ScrollView>
  );
};

export default BookScreen;