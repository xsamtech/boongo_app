/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, RefreshControl, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { API, COLORS, WEB } from '../../tools/constants';
import axios from 'axios';
import homeStyles from './style';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Divider } from 'react-native-paper';

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
    const config = {
      method: 'GET',
      url: `${API.url}/work/${itemId}`,
      headers: {
        'X-localization': 'fr',
        'X-user-id': userInfo.id ? userInfo.id : null,
        'X-ip-address': '192.168.43.78',
        'X-user-agent': 'application-name/1.6.7.42 Dalvik/2.1.0 (Linux; U; Android 5.1.1; Android SDK built for x86 Build/LMY48X)',
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
            <View style={{ maxWidth: 154 }}>
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
            <View style={homeStyles.workDesc}>
              <Text style={[homeStyles.workDescText, { fontWeight: '600' }]}>{t('work_details.type')}</Text>
              <Text style={[homeStyles.workDescText, { color: COLORS.success }]}>{work.type ? work.type.type_name : null}</Text>
            </View>
            <View style={homeStyles.workDesc}>
              <Text style={[homeStyles.workDescText, { fontWeight: '600' }]}>{t('work_details.categories')}</Text>
              <FlatList
                data={work.categories}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={homeStyles.scrollableList}
                renderItem={({ item }) => {
                  return (<Text style={homeStyles.workDescBadge}>{item.category_name}</Text>);
                }} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkDataScreen;