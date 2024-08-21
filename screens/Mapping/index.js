/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator, ToastAndroid, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API, COLORS, PADDING } from '../../tools/constants';
import homeStyles from '../Home/style';

const MappingScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Get data ===============
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([0]);
  const [maps, setMaps] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // =============== Refresh control ===============
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 2000);
  }, []);

  const handleReload = () => {
    // Vider les données
    setMaps([]);
    // Recharger les données
    getMaps();
  };

  // =============== Using the Effect Hook ===============
  // CATEGORIES
  useEffect(() => {
    getCategories();
  }, []);

  // MAPS
  useEffect(() => {
    getMaps();
  }, []);

  // =============== Some work functions ===============
  // CATEGORIES
  // Get all categories
  const getCategories = () => {
    setIsLoading(true);

    const config = { method: 'GET', url: `${API.url}/category/find_by_group/Catégorie%20pour%20carte`, headers: { 'X-localization': 'fr' } };
    const item_all = { "id": 0, "category_name": t('all_f'), "category_name_fr": "Toutes", "category_name_en": "All", "category_description": null };

    axios(config)
      .then(res => {
        const categoriesData = res.data.data;

        categoriesData.unshift(item_all);

        setCategories(categoriesData);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Add a category to the filter
  const addCategory = (item) => {
    // let categoriesData = [];

    // categoriesData.push(parseInt(item));

    console.log(parseInt(item));

    setSelectedCategories([parseInt(item)]);

    console.log('Données à envoyer : ' + JSON.stringify(selectedCategories));

    handleReload();
  };

  // Remove a category from filter
  const removeCategory = item => {
    if (selectedCategories.indexOf(item) > -1) {
      selectedCategories.splice(item);
    }

    handleReload();
  };

  // MAPS
  const getMaps = () => {
    setIsLoading(true);

    const url = `${API.url}/work/filter_by_categories_type_status/fr/Carte%20géographique/Pertinente?page=${currentPage}`;
    let mParams = {}
    let qs = require('qs');

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

    axios.post(url, qs.stringify(mParams), mHeaders).then(res => {
      const mapsData = res.data.data;
      const mapsLastPage = res.data.lastPage;

      setCurrentPage(currentPage + 1);
      setLastPage(mapsLastPage);
      setMaps([...maps, ...mapsData]);
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
  };

  // =============== « Load more » button ===============
  const renderLoadMoreButton = () => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.9} onPress={getMaps} style={[homeStyles.authButton, { marginBottom: 30, paddingVertical: PADDING.vertical, borderRadius: 30 }]}>
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

  // =============== Map Item ===============
  const MapItem = ({ item }) => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity onPress={() => navigation.navigate('WorkData', { itemId: item.id })}>
        <View style={[homeStyles.cardEmpty, { marginLeft: 0, marginBottom: 0 }]}>
          <View>
            <Image source={{ uri: item.image_url ? item.image_url : `${WEB.url}/assets/img/cover.png` }} style={[homeStyles.workImage, { width: Dimensions.get('window').width - 45, height: Dimensions.get('window').width / 1.5 }]} />
          </View>
          <View style={homeStyles.workDescTop}>
            <Text style={[homeStyles.workTitle, { textAlign: 'center', fontWeight: '500' }]}>{item.work_title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
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
      <SafeAreaView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[homeStyles.cardEmpty, { height: Dimensions.get('window').height - 70, marginLeft: 0, paddingLeft: 5 }]}>
          <FlatList
            data={maps}
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
                  <Text style={[homeStyles.cardEmptyText, { marginBottom: 25 }]}>{t('empty_list.description_maps')}</Text>
                </>
              )
            }}
            renderItem={({ item }) => {
              return (<MapItem item={item} />);
            }}
            ListFooterComponent={maps.length > 0 ? renderLoadMoreButton : null}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MappingScreen;