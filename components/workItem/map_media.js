/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import homeStyles from '../../screens/Home/style';

const MapMediaItem = ({ item }) => {
    // =============== Language ===============
    const { t } = useTranslation();

    // =============== Navigation ===============
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('WorkData', { itemId: item.id })}>
            <View style={[homeStyles.cardEmpty, { marginLeft: 0, marginBottom: 0 }]}>
                <View>
                    <Image source={{ uri: item.image_url ? item.image_url : `${WEB.url}/assets/img/cover.png` }} style={[homeStyles.workImage, { width: Dimensions.get('window').width - 45, height: Dimensions.get('window').width / 1.5 }]} />
                </View>
                <View style={homeStyles.workDescTop}>
                    <Text style={[homeStyles.workTitle, { textAlign: 'center', fontWeight: '500' }]}>{item.work_title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default MapMediaItem;