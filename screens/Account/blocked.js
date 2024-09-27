/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { View, Text, Linking, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import homeStyles from '../Home/style';
import { COLORS, PHONE } from '../../tools/constants';

const sendWhatsAppMessage = async () => {
  const phoneNumber = PHONE.admin;
  const message = "Bonjour Boongo.\n\nJe voudrais devenir partenaire pour être en mesure de publier mes ouvrages.\n\nQue dois-je faire ?";
  const text = encodeURIComponent(message);
  const url = `whatsapp://send?phone=${phoneNumber}&text=${text}`;

  try {
    await Linking.openURL(url);

  } catch (error) {
      // An error occurred while configuring the query
      ToastAndroid.show(`${error.message}`, ToastAndroid.LONG);
  }
};

const BlockedScreen = () => {
  // =============== Navigation ===============
  const navigation = useNavigation();

  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Authentication context ===============
  const { userInfo, changeStatus } = useContext(AuthContext);

  if (userInfo.status.status_name_fr == 'Bloqué') {
    return (
      <View style={[homeStyles.cardEmpty, { flex: 1 }]}>
        <Text style={homeStyles.authTitle}>{t('auth.status.blocked.title')}</Text>
        <Text style={homeStyles.authText}>{t('auth.status.blocked.description')}</Text>
        <TouchableOpacity style={[homeStyles.button, { backgroundColor: COLORS.success }]} onPress={sendWhatsAppMessage}>
          <Text style={homeStyles.buttonText}>{t('auth.status.blocked.link1')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.authCancel} onPress={() => navigation.navigate('Home_')}>
          <Text style={homeStyles.authCancelText}>{t('back_home')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (userInfo.status.status_name_fr == 'Désactivé') {
    return (
      <View style={[homeStyles.cardEmpty, { flex: 1 }]}>
        <FontAwesome6 style={[homeStyles.workCmdIcon, { fontSize: 20, alignSelf: 'center' }]} name='triangle-exclamation' />
        <Text style={homeStyles.authTitle}>{t('auth.status.disabled.title')}</Text>
        <Text style={homeStyles.authText}>{t('auth.status.disabled.description')}</Text>
        <TouchableOpacity style={homeStyles.button} onPress={() => { changeStatus(userInfo.id, 3); navigation.navigate('Account'); }}>
          <Text style={homeStyles.buttonText}>{t('auth.status.disabled.link1')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Home_')}>
          <Text style={homeStyles.buttonText}>{t('back_home')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default BlockedScreen;