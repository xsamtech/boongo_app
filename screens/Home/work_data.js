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
import { NetworkInfo } from 'react-native-network-info';
import UserAgent from 'react-native-user-agent';

const WorkDataScreen = ({ route, navigation }) => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Authentication context ===============
  const { userInfo } = useContext(AuthContext);

  // =============== Get parameters ===============
  const { itemId } = route.params;

  // =============== Get data ===============
  const [work, setWork] = useState({});
  const [categoryCount, setCategoryCount] = useState(0);
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
          const workCategories = res.data.data.categories.length;

          setWork(workData);
          setCategoryCount(workCategories);
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
              <View style={[homeStyles.workIconBtns, { justifyContent: 'space-between', paddingHorizontal: 20 }]}>
                <TouchableOpacity onPress={() => navigation.navigate('PDFViewer', { docTitle: work.workTitle, docUri: work.document_url, curPage: 1 })}>
                  <FontAwesome6 style={[homeStyles.workIconBtn, { color: COLORS.danger }]} name='file-lines' />
                </TouchableOpacity>
                {work.video_url ? (
                  <>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', { videoTitle: work.workTitle, videoUri: work.video_url })}>
                      <FontAwesome6 style={[homeStyles.workIconBtn, { color: COLORS.primary }]} name='play-circle' />
                    </TouchableOpacity>
                  </>
                ) : ''}
                <TouchableOpacity>
                  <FontAwesome6 style={[homeStyles.workIconBtn, { color: COLORS.success }]} name='headphones' />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={homeStyles.workBottom}>
            {work.user_owner ? (
              <>
                <View style={homeStyles.workDescBottom}>
                  <Text style={[homeStyles.workDescText, { color: COLORS.dark_secondary }]}>{t('work_details.author')}</Text>
                  <Text style={[homeStyles.workDescText, { fontWeight: '600' }]}>{work.user_owner ? work.user_owner : null}</Text>
                </View>
              </>
            ) : ''}
            <View style={homeStyles.workDescBottom}>
              <Text style={[homeStyles.workDescText, { color: COLORS.dark_secondary }]}>{t('work_details.type')}</Text>
              <Text style={[homeStyles.workDescText, { fontWeight: '600' }]}>{work.type ? work.type.type_name : null}</Text>
            </View>
            <View style={homeStyles.workDescBottom}>
              <Text style={[homeStyles.workDescText, { color: COLORS.dark_secondary }]}>
                {categoryCount > 1 ? t('work_details.categories') : t('work_details.category')}
              </Text>
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
          <Text style={{ marginBottom: 10, textAlign: 'center', color: COLORS.black }}>{t('work_details.subscription_info')}</Text>
          <View style={homeStyles.workCmds}>
            <TouchableOpacity style={[homeStyles.workCmd, { backgroundColor: COLORS.primary, marginBottom: 10 }]} onPress={() => { userInfo.id ? navigation.navigate('Account') : navigation.navigate('Login') }}>
              <FontAwesome6 style={[homeStyles.workCmdIcon, { color: COLORS.white }]} name='money-check-dollar' />
              <Text style={{ color: COLORS.white }}>{t('subscribe')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.workCmd, { backgroundColor: COLORS.warning }]} onPress={() => { userInfo.id ? navigation.navigate('Cart') : navigation.navigate('Login') }}>
              <FontAwesome6 style={[homeStyles.workCmdIcon, { color: COLORS.black }]} name='handshake-angle' />
              <Text style={{ color: COLORS.black }}>{t('auth.my_works.start_button')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkDataScreen;