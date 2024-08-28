/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import Logo from '../../assets/img/logo.svg';
import homeStyles from '../Home/style';
import { COLORS, ICON_SIZE } from '../../tools/constants';

const SearchScreen = () => {
  const dummies = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Search data ===============
  const [data, setData] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
      {/* Search container */}
      <View style={homeStyles.searchContainer}>
        <Logo width={60} height={60} />
        <View style={homeStyles.searchInput}>
          <TextInput style={homeStyles.searchInputText} value={data} placeholder={t('search')} onChangeText={text => setData(text)} />
          <TouchableOpacity style={homeStyles.searchInputSubmit}>
            <FontAwesome name='magnifying-glass' size={ICON_SIZE.s3} style={{ color: COLORS.white }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search results list */}
      <FlatList
        data={dummies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => 
          <View style={[homeStyles.cardEmpty, {width: Dimensions.get('window').width - 20, marginBottom: 2}]}>
            <Text style={homeStyles.cardEmptyText}>{item}</Text>
          </View>
        } />
    </SafeAreaView>
  );
}

export default SearchScreen;