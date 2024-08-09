/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, FlatList, RefreshControl, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native';
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

  const handleReload = () => {
    // Vider les données
    setBooks([]);
    // Recharger les données
    getBooks();
  };

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
  const addCategory = item => {
    let categoriesData = [];

    categoriesData.push(parseInt(item));

    setSelectedCategories(categoriesData);
    setHasCategories(true);

    handleReload();
  };

  // Remove a category from filter
  const removeCategory = item => {
    if (selectedCategories.indexOf(item) > -1) {
      selectedCategories.splice(item);
    }

    if (selectedCategories.length > 0) {
      setHasCategories(true);

    } else {
      setHasCategories(false);
    }

    handleReload();
  };

  // BOOKS
  const getBooks = () => {
    setIsLoading(true);

    if (hasCategories) {
      console.log('Données à envoyer : ' + JSON.stringify(selectedCategories));

      const url = `${API.url}/work/filter_by_categories_type_status/fr/Ouvrage/Pertinente?page=${currentPage}`;

      let mParams = {}
      // let mParams = {
      //   categories_ids: selectedCategories
      // };

      // Define an array of key-value pairs
      let pairsArray = [];

      for (let i = 0; i < selectedCategories.length; i++) {
        pairsArray.push(['categories_ids[' + i + ']', selectedCategories[i]]);
      }

      // Add each key-value pair to the object
      pairsArray.forEach(([key, value]) => {
        mParams[key] = value;
      });

      console.log(mParams);

      const mHeaders = {
        'X-localization': 'fr'
      };

      axios.post(url, { params: JSON.stringify(mParams), headers: mHeaders }).then(res => {
        const booksData = res.data.data;
        const booksLastPage = res.data.lastPage;

        setCurrentPage(currentPage + 1);
        setLastPage(booksLastPage);
        setBooks([...books, ...booksData]);
        setIsLoading(false);

      }).catch(error => {
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

    } else {
      axios.get(`${API.url}/work/find_all_by_type_status/fr/Ouvrage/Pertinente?page=${currentPage}`).then(res => {
        const booksData = res.data.data;
        const booksLastPage = res.data.lastPage;

        setCurrentPage(currentPage + 1);
        setLastPage(booksLastPage);
        setBooks([...books, ...booksData]);
        setIsLoading(false);

      }).catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          ToastAndroid.show(`${error.response.status} -> ${error.response.data.message || error.response.data}`, ToastAndroid.LONG);

        } else if (error.request) {
          // The request was made but no response was received
          ToastAndroid.show(t('error') + ' ' + t('error_message.no_server_response'), ToastAndroid.LONG);

        } else {
          // An error occurred while configuring the query
          ToastAndroid.show(`${error}`, ToastAndroid.LONG);
        }
      });
    }
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
    if (selectedCategories.includes(item.id)) {
      return (
        <TouchableOpacity
          style={[homeStyles.workDescBadge, { backgroundColor: (selectedCategories.includes(item.id) ? COLORS.black : COLORS.warning), marginBottom: 0 }]}
          onPress={() => removeCategory(item.id)}>
          <Text style={[homeStyles.paragraph, { color: (selectedCategories.includes(item.id) ? COLORS.warning : COLORS.black) }]}>{item.category_name}</Text>
        </TouchableOpacity>
      );

    } else {
      return (
        <TouchableOpacity
          style={[homeStyles.workDescBadge, { backgroundColor: (selectedCategories.includes(item.id) ? COLORS.black : COLORS.warning), marginBottom: 0 }]}
          onPress={() => addCategory(item.id)}>
          <Text style={[homeStyles.paragraph, { color: (selectedCategories.includes(item.id) ? COLORS.warning : COLORS.black) }]}>{item.category_name}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{ height: Dimensions.get('window').height - 20 }}>
      {/* Categories */}
      <View style={{ paddingTop: PADDING.vertical }}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: PADDING.horizontal }}
          renderItem={({ item }) => {
            return (<CategoryItem item={item} />);
          }} />
      </View>

      {/* Works */}
      <SafeAreaView contentContainerStyle={{ flexGrow: 1 }}
        style={[homeStyles.cardEmpty, { height: Dimensions.get('window').height - 70, marginLeft: 0, paddingLeft: 5 }]}>
        <FlatList
          data={books}
          extraData={this.state}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={homeStyles.scrollableList}
          windowSize={10}
          ListEmptyComponent={() => {
            return (
              <>
                <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                <Text style={[homeStyles.cardEmptyText, { marginBottom: 25 }]}>{t('empty_list.description_books')}</Text>
              </>
            )
          }}
          renderItem={({ item }) => {
            return (<BookMagItem item={item} />);
          }}
          ListFooterComponent={currentPage <= lastPage ? renderLoadMoreButton : null}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />} />
      </SafeAreaView>
    </View>
  );
};

export default BookScreen;