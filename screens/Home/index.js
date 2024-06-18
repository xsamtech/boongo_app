/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, TouchableOpacity, Modal, SafeAreaView, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import homeStyles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkItem from '../../components/workItem';
import { FakeWorks } from '../../fakeData/fakeWorks';
import { ICON_SIZE } from '../../tools/constants';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <View style={homeStyles.headingArea}>
        <Text style={homeStyles.heading}>{t('welcome_title')}</Text>
        <Text style={homeStyles.headingText}>{t('welcome_description')}</Text>
      </View>

      {/* Recent works start */}
      <View style={homeStyles.listTitleArea}>
        <Text style={homeStyles.listTitle}>Les plus populaires</Text>
      </View>
      <FlatList
        data={FakeWorks.filter(item => parseInt(item.published_data.split('-')[0]) > 1990)}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={homeStyles.scrollableList}
        renderItem={({ item }) => {
          return (<WorkItem item={item} />);
        }} />
      {/* Recent works end */}

      {/* Books start */}
      <View style={homeStyles.listTitleArea}>
        <Text style={homeStyles.listTitle}>Ouvrages</Text>
        <TouchableOpacity style={homeStyles.linkIcon}>
          <Text style={homeStyles.link}>Afficher tout </Text>
          <MaterialCommunityIcons name='chevron-double-right' size={ICON_SIZE.s3} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={FakeWorks.filter(item => item.type.type_name === 'Ouvrages')}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={homeStyles.scrollableList}
        renderItem={({ item }) => {
          return (<WorkItem item={item} />);
        }} />
      {/* Books end */}

      {/* Articles start */}
      <View style={homeStyles.listTitleArea}>
        <Text style={homeStyles.listTitle}>Revues, Mag. & Journaux</Text>
        <TouchableOpacity style={homeStyles.linkIcon}>
          <Text style={homeStyles.link}>Afficher tout </Text>
          <MaterialCommunityIcons name='chevron-double-right' size={ICON_SIZE.s3} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={FakeWorks.filter(item => item.type.type_name === 'Revues, Magazines & Journaux')}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={homeStyles.scrollableList}
        renderItem={({ item }) => {
          return (<WorkItem item={item} />);
        }} />
      {/* Articles end */}
    </ScrollView>
  );
};

export default HomeScreen;