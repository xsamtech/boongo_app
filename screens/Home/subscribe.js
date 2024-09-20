/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WebView } from 'react-native-webview';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import homeStyles from './style';
import { WEB } from '../../tools/constants';
import { AuthContext } from '../../contexts/AuthContext';

const SubscribeScreen = ({ route, navigation }) => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Authentication context ===============
  const { userInfo, validateSubscription, invalidateSubscription } = useContext(AuthContext);

  // =============== Get parameters ===============
  const { subscrId, userId, apiToken } = route.params;

  // =============== Get item API with effect hook ===============
  useEffect(() => {
    const validationInterval = setInterval(() => {
      validateSubscription(userInfo.id);
      invalidateSubscription(userInfo.id);
    }, 1000);

    return () => clearInterval(validationInterval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Custom header */}
      <View style={homeStyles.headerBanner}>
        <TouchableOpacity style={homeStyles.headerButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 style={homeStyles.headerButtonIcon} name='angle-left' />
        </TouchableOpacity>
        <Text style={homeStyles.headerTitle}>{t('subscription.link')}</Text>
      </View>

      {/* Content */}
      <WebView source={{ uri: `${WEB.url}/subscribe?app_id=&subscription_id=${subscrId}&user_id=${userId}&api_token=${apiToken}` }} />
    </SafeAreaView>
  );
};

export default SubscribeScreen;