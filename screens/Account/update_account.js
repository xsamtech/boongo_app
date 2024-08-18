/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import homeStyles from '../Home/style';
import { COLORS } from '../../tools/constants';

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
        <Text style={[homeStyles.headerTitle, { width: Dimensions.get('window').width - 140, textAlign: 'left' }]}>{t('navigation.update_account')}</Text>
        <TouchableOpacity style={[homeStyles.headerButton, { marginLeft: 0 }]} onPress={() => navigation.navigate('Cart')}>
          <MaterialCommunityIcons name='cart-outline' color={COLORS.white} size={23} />
        </TouchableOpacity>
        <TouchableOpacity style={[homeStyles.headerButton, { marginLeft: 0 }]} onPress={() => navigation.navigate('Notification')}>
          <MaterialCommunityIcons name='bell-outline' color={COLORS.white} size={23} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={{ flexGrow: 1 }}>
        <Text>{t('navigation.update_account')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAccountScreen;