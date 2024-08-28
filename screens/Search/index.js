/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, NativeModules, Platform, RefreshControl, SafeAreaView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Logo from '../../assets/img/logo.svg';
import homeStyles from '../Home/style';
import axios from 'axios';
import { API, COLORS, ICON_SIZE } from '../../tools/constants';

const SearchScreen = () => {
  const dummies = Array.from({ length: 0 }, (_, index) => `Item ${index + 1}`);
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Search data ===============
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // =============== Get device language ===============
  const getDeviceLang = () => {
    const appLanguage = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier;

    return appLanguage.search(/-|_/g) !== -1 ? appLanguage.slice(0, 2) : appLanguage;
  };

  // =============== Refresh control ===============
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 2000);
  }, []);

  // =============== Using the Effect Hook ===============
  useEffect(() => {
    searchData();
  }, [data]);

  // =============== Search work function ===============
  const searchData = () => {
    setIsLoading(true);

    const config = { method: 'GET', url: `${API.url}/work/search/${data}`, headers: { 'X-localization': getDeviceLang } };

    axios(config)
      .then(res => {
        const resultsData = res.data.data;

        setData(resultsData);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          ToastAndroid.show(`${error.response.status} -> ${error.response.data.message || error.response.data}`, ToastAndroid.LONG);
          console.log(`${error.response.status} -> ${error.response.data.message || error.response.data}`);

        } else if (error.request) {
          // The request was made but no response was received
          ToastAndroid.show(t('error') + ' ' + t('error_message.no_server_response'), ToastAndroid.LONG);

        } else {
          // An error occurred while configuring the query
          ToastAndroid.show(`${error}`, ToastAndroid.LONG);
        }
      });
  };

  // =============== Work Item ===============
  const WorkItem = ({ item }) => {
    return (
      <View style={homeStyles.searchResult}>
        <View style={homeStyles.searchResultImage}>
          <Image source={require('../../assets/img/ad.png')} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={homeStyles.searchResultTitle}>{item}</Text>
          <Text style={homeStyles.searchResultText}>{item}</Text>
          <TouchableOpacity style={homeStyles.linkIcon} onPress={() => navigation.navigate('WorkData', { itemId: item.id })}>
            <Text style={[homeStyles.link]}>{t('see_details')} </Text>
            <FontAwesome6 name='angle-right' size={ICON_SIZE.s6} />
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
      {/* Search container */}
      <View style={homeStyles.searchContainer}>
        <Logo width={60} height={60} />
        <View style={homeStyles.searchInput}>
          <TextInput style={homeStyles.searchInputText} value={data} placeholder={t('search')} onChangeText={text => setData(text)} />
          <TouchableOpacity style={homeStyles.searchInputSubmit} onPress={searchData}>
            <FontAwesome6 name='magnifying-glass' size={ICON_SIZE.s3} style={{ color: COLORS.white }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search results list */}
      <FlatList
        data={dummies}
        keyExtractor={(item) => item}
        ListEmptyComponent={() => {
          return (
            <View style={[homeStyles.cardEmpty, { width: Dimensions.get('window').width - 20, backgroundColor: 'rgba(255, 255, 255, 0)', elevation: 0 }]}>
              <Text style={[homeStyles.cardEmptyText, { textAlign: 'center', fontSize: 19, fontWeight: '300', letterSpacing: 0.3 }]}>{t('search_description')}</Text>
            </View>
          )
        }}
        renderItem={({ item }) => {
          return (<WorkItem item={item} />);
        }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />} />
    </SafeAreaView>
  );
}

export default SearchScreen;