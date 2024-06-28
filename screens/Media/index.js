/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, FlatList, RefreshControl, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import homeStyles from '../Home/style';
import { API } from '../../tools/constants';
import MapMediaItem from '../../components/workItem/map_media';

const MediaScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Get data ===============
  const [medias, setMedias] = useState([]);
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
    getMedias();
  }, []);

  // =============== Some work functions ===============
  const getMedias = () => {
    const config = { method: 'GET', url: `${API.url}/work/find_all_by_type_status/fr/Médias/Pertinente`, headers: { 'X-localization': 'fr' } };

    axios(config)
      .then(res => {
        const mediasData = res.data.data;
        const mediasLastPage = res.data.lastPage;

        setMedias(mediasData);
        setTotalpages(mediasLastPage);
        setItemsPerPage(medias.length);
        setIsLoading(false);

        return mediasData;
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
      <View>
        <FlatList
          data={medias}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={homeStyles.scrollableList}
          windowSize={10}
          ListEmptyComponent={() => {
            return (
              <View style={[homeStyles.cardEmpty, { marginLeft: 0 }]}>
                <Text style={homeStyles.cardEmptyTitle}>{t('empty_list.title')}</Text>
                <Text style={homeStyles.cardEmptyText}>{t('empty_list.description_medias')}</Text>
              </View>
            )
          }}
          renderItem={({ item }) => {
            return (<MapMediaItem item={item} />);
          }}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />} />
      </View>
    </SafeAreaView>
  );
};

export default MediaScreen;