/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FakeCategories } from '../../fakeData/fakeCategories';
import homeStyles from '../Home/style';
import CategoryItem from '../../components/categoryItem';

const BookScreen = () => {
  return (
    <ScrollView>
      {/* Categories start */}
      <FlatList
        data={FakeCategories}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={homeStyles.scrollableBadges}
        renderItem={({ item }) => {
          return (<CategoryItem item={item} />);
        }} />
      {/* Categories end */}

      <View>
        <Text>Book</Text>
      </View>
    </ScrollView>
  );
};

export default BookScreen;