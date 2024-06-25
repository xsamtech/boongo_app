/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, TouchableOpacity, Modal, SafeAreaView, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import homeStyles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkItem from '../../components/workItem';
import { API, COLORS, ICON_SIZE } from '../../tools/constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Get data ===============
  const [popular, setPopular] = useState([]);
  const [books, setBooks] = useState([]);
  const [mags, setMags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // =============== Language ===============
  const { t } = useTranslation();

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
    let date = new Date();
    const year = date.getFullYear();
    const config = { method: 'GET', url: `${API.url}/work/find_all_by_type/fr/Ouvrage`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const booksData = res.data.data;

        setBooks(booksData)
        setIsLoading(false);

        return booksData;
      })
      .catch(error => {
        console.log(error);
      });
  };
  // MAGAZINES
  const getMags = () => {
    let date = new Date();
    const year = date.getFullYear();
    const config = { method: 'GET', url: `${API.url}/work/find_all_by_type/fr/Article`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const magsData = res.data.data;

        setMags(magsData)
        setIsLoading(false);

        return magsData;
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
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
          {popular.length > 0 ?
            <FlatList
              data={popular}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={homeStyles.scrollableList}
              renderItem={({ item }) => {
                return (<WorkItem item={item} />);
              }} />
            :
            <>
              <View style={homeStyles.cardEmpty}>
                <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_popular')}</Text>
              </View>
            </>}

          <View style={homeStyles.listTitleArea}>
            <Text style={homeStyles.listTitle}>{t('navigation.book')}</Text>
            <TouchableOpacity style={homeStyles.linkIcon} onPress={() => { navigation.navigate('Book') }}>
              <Text style={homeStyles.link}>{t('see_all')} </Text>
              <MaterialCommunityIcons name='chevron-double-right' size={ICON_SIZE.s3} />
            </TouchableOpacity>
          </View>
          {books.length > 0 ?
            <FlatList
              data={books}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={homeStyles.scrollableList}
              renderItem={({ item }) => {
                return (<WorkItem item={item} />);
              }} />
            :
            <>
              <View style={homeStyles.cardEmpty}>
                <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_books')}</Text>
              </View>
            </>}

          <View style={homeStyles.listTitleArea}>
            <Text style={homeStyles.listTitle}>{t('navigation.magazine')}</Text>
            <TouchableOpacity style={homeStyles.linkIcon} onPress={() => { navigation.navigate('Journal') }}>
              <Text style={homeStyles.link}>{t('see_all')} </Text>
              <MaterialCommunityIcons name='chevron-double-right' size={ICON_SIZE.s3} />
            </TouchableOpacity>
          </View>
          {mags.length > 0 ?
            <FlatList
              data={mags}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={homeStyles.scrollableList}
              renderItem={({ item }) => {
                return (<WorkItem item={item} />);
              }} />
            :
            <>
              <View style={homeStyles.cardEmpty}>
                <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_mags')}</Text>
              </View>
            </>}
        </>
      }
    </ScrollView>
  );
};

export default HomeScreen;