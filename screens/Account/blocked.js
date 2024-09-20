/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import homeStyles from '../Home/style';

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

const BlockedScreen = () => {
  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Authentication context ===============
  const { userInfo } = useContext(AuthContext);

  return (
    <View style={[homeStyles.cardEmpty, { flex: 1 }]}>
      <Text style={accountStyles.heading}>{t('auth.message.disabled.title')}</Text>
      <Text style={accountStyles.text}>{t('auth.message.disabled.description')}</Text>
      <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Home_')}>
        <Text style={homeStyles.buttonText}>{t('back_home')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlockedScreen;