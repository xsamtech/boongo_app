/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Dimensions, Linking, SafeAreaView, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import homeStyles from '../Home/style';
import { COLORS, PADDING } from '../../tools/constants';

const sendWhatsAppMessage = async () => {
  const phoneNumber = '+243815737600';
  const message = "Bonjour Boongo.\n\nJe voudrais devenir partenaire pour être en mesure de publier mes ouvrages.\n\nQue dois-je faire ?";
  const text = encodeURIComponent(message);
  const url = `whatsapp://send?phone=${phoneNumber}&text=${text}`;

  try {
    await Linking.openURL(url);

  } catch (error) {
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
  }
};

const UpdateAccountScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Custom header */}
      <View style={homeStyles.headerBanner}>
        <TouchableOpacity style={[homeStyles.headerButton, { paddingVertical: 10 }]} onPress={() => navigation.goBack()}>
          <FontAwesome6 style={[homeStyles.headerButtonIcon, { fontSize: 20 }]} name='arrow-left' />
        </TouchableOpacity>
        <Text style={[homeStyles.headerTitle, { width: Dimensions.get('window').width - 140, textAlign: 'left' }]}>{t('navigation.work')}</Text>
      </View>

      {/* Content */}
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ paddingVertical: 50, paddingHorizontal: 30 }}>
          <FontAwesome6 style={{ alignSelf: 'center', marginBottom: 20, fontSize: 100, color: COLORS.dark_primary }} name='handshake-angle' />
          <Text style={{ marginBottom: 20, fontSize: 17, textAlign: 'center' }}>{t('auth.my_works.description')}</Text>
          <Text style={{ marginBottom: PADDING.vertical, fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>{t('auth.my_works.terms_link')}</Text>
          <Text style={{ marginBottom: 20, fontSize: 17, color: COLORS.dark_danger, textAlign: 'center' }} onPress={() => navigation.navigate('About', { screen: 'Terms' })}>{t('terms_title')}</Text>
          <TouchableOpacity style={{ backgroundColor: COLORS.warning, marginHorizontal: 30, paddingVertical: 5, borderRadius: 20 }} onPress={sendWhatsAppMessage}>
            <Text style={[homeStyles.authCancelText, { marginBottom: 2, fontSize: 17 }]}>{t('auth.my_works.start_button')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateAccountScreen;