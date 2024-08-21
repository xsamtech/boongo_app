/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import homeStyles from '../Home/style';
import { COLORS, PADDING } from '../../tools/constants';
import { Button } from 'react-native-paper';

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
        <TouchableOpacity style={[homeStyles.headerButton, { marginLeft: 0 }]} onPress={() => navigation.navigate('Cart')}>
          <MaterialCommunityIcons name='cart-outline' color={COLORS.white} size={23} />
        </TouchableOpacity>
        <TouchableOpacity style={[homeStyles.headerButton, { marginLeft: 0 }]} onPress={() => navigation.navigate('Notification')}>
          <MaterialCommunityIcons name='bell-outline' color={COLORS.white} size={23} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ paddingVertical: 50, paddingHorizontal: 30 }}>
          <FontAwesome6 style={{ alignSelf: 'center', marginBottom: 20, fontSize: 100, color: COLORS.dark_primary }} name='handshake-angle' />
          <Text style={{ marginBottom: 20, fontSize: 17, textAlign: 'center' }}>{t('auth.my_works.description')}</Text>
          <Text style={{ marginBottom: PADDING.vertical, fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>{t('auth.my_works.terms_link')}</Text>
          <Text style={{ marginBottom: 20, fontSize: 17, color: COLORS.dark_danger, textAlign: 'center' }} onPress={() => navigation.navigate('About')}>{t('terms_title')}</Text>
          <TouchableOpacity style={{ backgroundColor: COLORS.warning, marginHorizontal: 30, paddingVertical: 5, borderRadius: 20 }}>
            <Text style={[homeStyles.authCancelText, { marginBottom: 2, fontSize: 17 }]}>{t('auth.my_works.start_button')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateAccountScreen;