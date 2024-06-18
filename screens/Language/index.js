/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import i18next, { languageResources } from '../../services/i18next';
import languagesList from '../../services/languagesList.json'
import homeStyles from '../Home/style';
import { useNavigation } from '@react-navigation/native';

const LanguageScreen = () => {
  const navigation = useNavigation();

  const selectLanguage = (lang) => {
    i18next.changeLanguage(lang);
    navigation.navigate('Home_');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={homeStyles.langView}>
        <FlatList data={Object.keys(languageResources)} renderItem={({ item }) => (
          <TouchableOpacity style={homeStyles.langButton} onPress={() => selectLanguage(item)}>
            <Text style={homeStyles.langText}>{languagesList[item].nativeName}</Text>
          </TouchableOpacity>
        )} />
      </View>
    </View>
  );
};

export default LanguageScreen;