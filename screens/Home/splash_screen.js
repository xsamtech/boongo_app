/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { ActivityIndicator, Image, Linking, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../tools/constants';
import homeStyles from './style';
import { Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const SplashScreen = () => {
  // =============== Language ===============
  const { t } = useTranslation();

  const data = [];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50 }}>
      <View style={{ marginBottom: 20, paddingHorizontal: 100 }}>
        <Image source={require('../../assets/img/logo.png')} />
      </View>

      <ActivityIndicator size='large' color={COLORS.danger} />

      <Divider style={homeStyles.authDivider} />
      <Text style={homeStyles.authBottomText}>{t('copyright')} | {t('all_rights_reserved')}</Text>
      <Text style={homeStyles.authBottomText}>
        Designed by <Text style={homeStyles.authBottomLink} onPress={() => Linking.openURL('https://xsamtech.com')}> Xsam Technologies</Text>
      </Text>
    </View>
  );
};

export default SplashScreen;