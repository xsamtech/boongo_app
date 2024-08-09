/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, FlatList, RefreshControl, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import homeStyles from '../Home/style';
import { API, COLORS, PADDING } from '../../tools/constants';
import BookMagItem from '../../components/workItem/book_mag';

const BookScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Get data ===============
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [hasCategories, setHasCategories] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // =============== Refresh control ===============
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 2000);
  }, []);

  // =============== Using the Effect Hook ===============
  // CATEGORIES
  useEffect(() => {
    getCategories();
  }, []);

  // BOOKS
  useEffect(() => {
    getBooks();
  }, []);

  // =============== Some work functions ===============
  // CATEGORIES
  // Get all categories
  const getCategories = () => {
    setIsLoading(true);

    const config = { method: 'GET', url: `${API.url}/category/find_by_group/Catégorie%20pour%20œuvre`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const categoriesData = res.data.data;

        setCategories(categoriesData);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Add a category to the filter
  const addCategory = ({ item }) => {
    let categoriesData = [];

    categoriesData.push(item);

    setSelectedCategories(categoriesData);
    hasCategories(true);
  };

  // Remove a category from filter
  const removeCategory = ({ item }) => {
    if (categories.indexOf(item) > -1) {
      categories.splice(item);
    }

    if (categories.length > 0) {
      hasCategories(true);

    } else {
      hasCategories(false);
    }
  };

  // BOOKS
  const getBooks = () => {
    setIsLoading(true);

    const urlAllBooks = `${API.url}/work/find_all_by_type_status/fr/Ouvrage/Pertinente?page=${currentPage}`;
    const urlBooksByCategories = `${API.url}/work/filter_by_categories_type_status?page=${currentPage}`;
    const config = {
      method: hasCategories ? 'POST' : 'GET', 
      url: hasCategories ? urlBooksByCategories : urlAllBooks, 
      headers: { 'X-localization': 'fr' }
    };

    axios(config)
      .then(res => {
        const booksData = res.data.data;
        const booksLastPage = res.data.lastPage;

        setCurrentPage(currentPage + 1);
        setLastPage(booksLastPage);
        setBooks([...books, ...booksData]);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // =============== « Load more » button ===============
  const renderLoadMoreButton = () => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.9} onPress={getBooks} style={[homeStyles.authButton, { marginBottom: 30, paddingVertical: PADDING.vertical, borderRadius: 30 }]}>
          <Text style={homeStyles.authButtonText}>{t('load_more')}</Text>
          {isLoading ? (<ActivityIndicator color={COLORS.white} style={{ marginLeft: 8 }} />) : null}
        </TouchableOpacity>
      </View>
    );
  };

  // =============== Category Item ===============
  const CategoryItem = ({ item }) => {
    return (
      <TouchableOpacity style={[homeStyles.workDescBadge, { backgroundColor: (hasCategories ? COLORS.black : COLORS.warning) }]}>
        <Text style={[homeStyles.paragraph, {color: (hasCategories ? COLORS.warning : COLORS.black)}]}>{item.category_name}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView contentContainerStyle={{ flexGrow: 1 }}
      style={[homeStyles.cardEmpty, { height: Dimensions.get('window').height - 70, paddingLeft: 5 }]}>
      {/* Categories */}
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: PADDING.horizontal }}
        renderItem={({ item }) => {
          return (<CategoryItem item={item} />);
        }} />

      {/* Works */}
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={homeStyles.scrollableList}
        windowSize={10}
        ListEmptyComponent={() => {
          return (
            <>
              <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
              <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_books')}</Text>
            </>
          )
        }}
        renderItem={({ item }) => {
          return (<BookMagItem item={item} />);
        }}
        ListFooterComponent={currentPage <= lastPage ? renderLoadMoreButton : null}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />} />
    </SafeAreaView>
  );
};

export default BookScreen;