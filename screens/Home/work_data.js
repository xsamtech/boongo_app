/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, RefreshControl, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { API, COLORS, WEB } from '../../tools/constants';
import axios from 'axios';
import homeStyles from './style';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Divider } from 'react-native-paper';
import { NetworkInfo } from 'react-native-network-info';
import UserAgent from 'react-native-user-agent';

const WorkDataScreen = ({ route, navigation }) => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Authentication context ===============
  const { userInfo } = useContext(AuthContext);

  // =============== Get ID parameters ===============
  const { itemId } = route.params;

  // =============== Get data ===============
  const [work, setWork] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // =============== Refresh control ===============
  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 2000);
  }, []);

  // =============== Get item API with effect hook ===============
  useEffect(() => {
    getWork();
  }, []);

  const getWork = () => {
    NetworkInfo.getIPAddress().then(ip_address => {
      const config = {
        method: 'GET',
        url: `${API.url}/work/${itemId}`,
        headers: {
          'X-localization': 'fr',
          'X-user-id': userInfo.id ? userInfo.id : null,
          'X-ip-address': ip_address,
          'X-user-agent': UserAgent.getUserAgent()
        }
      };

      axios(config)
        .then(res => {
          const workData = res.data.data;

          setWork(workData);
          setIsLoading(false);

          return workData;
        })
        .catch(error => {
          console.log(error);
        });
    })
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
      <View style={homeStyles.workBody}>
        <View style={homeStyles.workCard}>
          <View style={homeStyles.workTop}>
            <View>
              <Image source={{ uri: work.image_url ? work.image_url : `${WEB.url}/assets/img/cover.png` }} style={homeStyles.workImage} />
            </View>
            <View style={homeStyles.workDescTop}>
              <Text style={homeStyles.workTitle}>{work.work_title}</Text>
              <Text style={homeStyles.workContent}>{work.work_content}</Text>
              <Divider />
              <View style={homeStyles.workIconBtns}>
                <TouchableOpacity style={{ marginHorizontal: 30 }}>
                  <FontAwesome6 style={[homeStyles.workIconBtn, { color: COLORS.danger }]} name='file-lines' />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome6 style={[homeStyles.workIconBtn, { color: COLORS.primary }]} name='play-circle' />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={homeStyles.workBottom}>
            {work.user_owner ? (
              <>
                <View style={homeStyles.workDescBottom}>
                  <Text style={[homeStyles.workDescText, { color: COLORS.dark_secondary}]}>{t('work_details.author')}</Text>
                  <Text style={[homeStyles.workDescText, { fontWeight: '600' }]}>{work.user_owner ? work.user_owner : null}</Text>
                </View>
              </>
            ) : ''}
            <View style={homeStyles.workDescBottom}>
              <Text style={[homeStyles.workDescText, { color: COLORS.dark_secondary}]}>{t('work_details.type')}</Text>
              <Text style={[homeStyles.workDescText, { fontWeight: '600' }]}>{work.type ? work.type.type_name : null}</Text>
            </View>
            <View style={homeStyles.workDescBottom}>
              <Text style={[homeStyles.workDescText, { color: COLORS.dark_secondary}]}>{t('work_details.categories')}</Text>
              <FlatList
                data={work.categories}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={homeStyles.workDescBadgesList}
                contentContainerStyle={homeStyles.workDescBadgesListContents}
                renderItem={({ item }) => {
                  return (<Text style={homeStyles.workDescBadge}>{item.category_name}</Text>);
                }} />
            </View>
          </View>
        </View>
        <View style={homeStyles.workCard}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, marginBottom: 10, padding: 10, borderRadius: 5 }}>
              <FontAwesome6 style={{ fontSize: 16, color: COLORS.white, marginRight: 10 }} name='money-check-dollar' />
              <Text style={{ color: COLORS.white }}>{t('subscribe')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.warning, padding: 10, borderRadius: 5 }}>
              <FontAwesome6 style={{ fontSize: 16, color: COLORS.black, marginRight: 10 }} name='cart-shopping' />
              <Text style={{ color: COLORS.black }}>{t('addToCart')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkDataScreen;