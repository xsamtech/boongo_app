/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, RefreshControl, Dimensions, Image, ToastAndroid, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Carousel from 'pinar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import homeStyles from './style';
import { API, COLORS, ICON_SIZE, PHONE } from '../../tools/constants';

const sendWhatsAppMessage = async () => {
  const phoneNumber = PHONE.admin;
  // const text = encodeURIComponent(message);
  const url = `whatsapp://send?phone=${phoneNumber}&text=`;

  try {
    await Linking.openURL(url);

  } catch (error) {
      // An error occurred while configuring the query
      ToastAndroid.show(`${error.message}`, ToastAndroid.LONG);
  }
};

const HomeScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Get data ===============
  const [popular, setPopular] = useState([]);
  const [books, setBooks] = useState([]);
  const [mags, setMags] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // =============== Refresh control ===============
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 2000);
  }, []);

  // =============== Using the Effect Hook ===============
  // MOST POPULAR
  useEffect(() => {
    getPopular();
  }, []);

  // BOOKS
  useEffect(() => {
    getBooks();
  }, []);

  // MAGAZINES
  useEffect(() => {
    getMags();
  }, []);

  // SPONSORS
  useEffect(() => {
    getSponsors();
  }, []);

  // =============== Some work functions ===============
  // MOST POPULAR
  const getPopular = () => {
    let date = new Date();
    const year = date.getFullYear();
    const config = { method: 'GET', url: `${API.url}/work/trends/${year}`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const popularData = res.data.data;

        setPopular(popularData);
        setIsLoading(false);

        return popularData;
      })
      .catch(error => {
        console.log(error);
      });
  };

  // BOOKS
  const getBooks = () => {
    const config = { method: 'GET', url: `${API.url}/work/find_all_by_type_status/fr/Ouvrage/Pertinente`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const booksData = res.data.data;

        setBooks(booksData);
        setIsLoading(false);

        return booksData;
      })
      .catch(error => {
        console.log(error);
      });
  };

  // MAGAZINES
  const getMags = () => {
    const config = { method: 'GET', url: `${API.url}/work/find_all_by_type_status/fr/Article/Pertinente`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const magsData = res.data.data;

        setMags(magsData);
        setIsLoading(false);

        return magsData;
      })
      .catch(error => {
        console.log(error);
      });
  };

  // SPONSORS
  const getSponsors = () => {
    const config = { method: 'GET', url: `${API.url}/partner/find_by_active/1`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const sponsorsData = res.data.data;

        setSponsors(sponsorsData);
        setIsLoading(false);

        return sponsorsData;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const WorkItem = ({ item }) => {
    // =============== Navigation ===============
    const navigation = useNavigation();

    return (
      <TouchableOpacity style={homeStyles.homeScrollableListItem} onPress={() => navigation.navigate('WorkData', { itemId: item.id })}>
        <Image source={{ uri: item.image_url ? item.image_url : `${WEB.url}/assets/img/cover.png` }} style={homeStyles.homeThumbnail} />
        <Text style={homeStyles.homeTitleOne}>
          {((item.work_title).length > 25) ? (((item.work_title).substring(0, 25 - 3)) + '...') : item.work_title}
        </Text>
        <Text style={homeStyles.homeParagraph}>
          {((item.work_content).length > 33) ? (((item.work_content).substring(0, 33 - 3)) + '...') : item.work_content}
        </Text>
      </TouchableOpacity>
    )
  };

  return (
    <>
      <TouchableOpacity style={[homeStyles.floatingButton, { backgroundColor: COLORS.success, paddingTop: 9 }]} onPress={sendWhatsAppMessage}>
        <MaterialCommunityIcons name='whatsapp' size={ICON_SIZE.s0_4} style={{ color: COLORS.white }} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
        <View style={homeStyles.headingArea}>
          <Text style={homeStyles.heading}>{t('welcome_title')}</Text>
          <Text style={homeStyles.headingText}>{t('welcome_description')}</Text>
        </View>

        {isLoading
          ? <ActivityIndicator color={COLORS.primary} size='large' />
          :
          <>
            <View style={homeStyles.listTitleArea}>
              <Text style={homeStyles.listTitle}>{t('most_popular')}</Text>
            </View>
            {/* POPULAR */}
            <FlatList
              data={popular}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={homeStyles.scrollableList}
              ListEmptyComponent={() => {
                return (
                  <View style={homeStyles.cardEmpty}>
                    <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                    <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_popular')}</Text>
                  </View>
                )
              }}
              renderItem={({ item }) => {
                return (<WorkItem item={item} />);
              }} />

            {/* ADS */}
            {sponsors.length > 0 ? 
              <View style={[homeStyles.cardEmpty, { flexShrink: 0, width: Dimensions.get('window').width - 20, height: (Dimensions.get('window').width - 20) / 2, marginVertical: 50, padding: 10 }]}>
                <Carousel style={{ width: Dimensions.get('window').width - 50 }} autoplay={true} loop={true} showsControls={false} showsDots={false}>
                  {sponsors.map(item =>
                    <Image key={item.id} source={{ uri: item.image_url ? item.image_url : `${WEB.url}/assets/img/ad.png` }} style={{ width: '100%', height: '100%' }} onPress={() => Linking.openURL(item.website_url)}/>
                  )}
                </Carousel>
              </View>
            : ''}

            {/* BOOKS */}
            <View style={homeStyles.listTitleArea}>
              <Text style={homeStyles.listTitle}>{t('navigation.book')}</Text>
              <TouchableOpacity style={homeStyles.linkIcon} onPress={() => { navigation.navigate('Book') }}>
                <Text style={homeStyles.link}>{t('see_all')} </Text>
                <MaterialCommunityIcons name='chevron-double-right' size={ICON_SIZE.s3} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={books}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={homeStyles.scrollableList}
              ListEmptyComponent={() => {
                return (
                  <View style={homeStyles.cardEmpty}>
                    <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                    <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_books')}</Text>
                  </View>
                )
              }}
              renderItem={({ item }) => {
                return (<WorkItem item={item} />);
              }} />

            {/* MAGAZINES */}
            <View style={homeStyles.listTitleArea}>
              <Text style={homeStyles.listTitle}>{t('navigation.magazine')}</Text>
              <TouchableOpacity style={homeStyles.linkIcon} onPress={() => { navigation.navigate('Journal') }}>
                <Text style={homeStyles.link}>{t('see_all')} </Text>
                <MaterialCommunityIcons name='chevron-double-right' size={ICON_SIZE.s3} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={mags}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={homeStyles.scrollableList}
              ListEmptyComponent={() => {
                return (
                  <View style={homeStyles.cardEmpty}>
                    <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                    <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_mags')}</Text>
                  </View>
                )
              }}
              renderItem={({ item }) => {
                return (<WorkItem item={item} />);
              }} />
          </>
        }
      </ScrollView>
    </>
  );
};

export default HomeScreen;