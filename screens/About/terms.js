/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { WEB } from '../../tools/constants';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import WebView from 'react-native-webview';
import homeStyles from '../Home/style';

const TermsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      {/* Custom header */}
      <View style={homeStyles.headerBanner}>
        <TouchableOpacity style={homeStyles.headerButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 style={homeStyles.headerButtonIcon} name='angle-left' />
        </TouchableOpacity>
        <Text style={homeStyles.headerTitle}>{t('terms_title')}</Text>
      </View>

      {/* Content */}
      <WebView source={{ uri: WEB.url + '/about/terms_of_use' }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
};

export default TermsScreen;