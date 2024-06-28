/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, FlatList, RefreshControl, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import homeStyles from '../Home/style';
import { API } from '../../tools/constants';
import BookMagItem from '../../components/workItem/book_mag';

const JournalScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Get data ===============
  const [mags, setMags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // =============== Refresh control ===============
  const [totalPages, setTotalpages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // =============== Refresh control ===============
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 2000);
  }, []);

  // =============== Using the Effect Hook ===============
  useEffect(() => {
    getMags();
  }, []);

  // =============== Some work functions ===============
  const getMags = () => {
    const config = { method: 'GET', url: `${API.url}/work/find_all_by_type_status/fr/Article/Pertinente`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const magsData = res.data.data;
        const magsLastPage = res.data.lastPage;

        setMags(magsData);
        setTotalpages(magsLastPage);
        setItemsPerPage(mags.length);
        setIsLoading(false);

        return magsData;
      })
      .catch(error => {
        console.log(error);
      });
  };

  // =============== Pagination Buttons ===============
  const renderPaginationButtons = () => {
    const maxButtonsToShow = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(0, endPage - maxButtonsToShow + 1);
    }

    const buttons = [];

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageClick(i)}
          style={[
            styles.paginationButton,
            i === currentPage ? styles.activeButton : null,
          ]}>
          <Text style={{ color: 'white' }}>{i}</Text>
        </TouchableOpacity>,
      );
    }

    return buttons;
  };

  return (
    <SafeAreaView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[homeStyles.cardEmpty, { height: Dimensions.get('window').height - 70, paddingLeft: 5 }]}>
        <FlatList
          data={mags}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={homeStyles.scrollableList}
          windowSize={10}
          ListEmptyComponent={() => {
            return (
              <>
                <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_mags')}</Text>
              </>
            )
          }}
          renderItem={({ item }) => {
            return (<BookMagItem item={item} />);
          }}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />} />
      </View>
    </SafeAreaView>
  );
};

export default JournalScreen;