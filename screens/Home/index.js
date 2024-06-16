/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, TouchableOpacity, Modal, SafeAreaView, FlatList } from 'react-native';
import React, { useState } from 'react';
import i18next, {languageResources} from '../../services/i18next';
import languagesList from '../../services/languagesList.json'
import { useTranslation } from 'react-i18next';
import homeStyles from './style';

const HomeScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={homeStyles.view}>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={homeStyles.langView}>
          <FlatList
            data={Object.keys(languageResources)}
            renderItem={({ item }) => (
              <TouchableOpacity style={homeStyles.langButton}>
                <Text style={homeStyles.langText}>{languagesList[item].nativeName}</Text>
              </TouchableOpacity>
            )} />
        </View>
      </Modal>

      <Text style={homeStyles.heading}>{t('navigation.home')}</Text>
      <TouchableOpacity style={homeStyles.button} onPress={() => props.navigation.navigate('Account', { name: 'Xanders' })}>
        <Text style={homeStyles.text}>{t('navigation.account')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.button} onPress={() => setVisible(true)}>
        <Text style={homeStyles.text}>{t('change_lang')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;