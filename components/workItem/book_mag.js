/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ICON_SIZE, WEB } from '../../tools/constants';
import homeStyles from '../../screens/Home/style';

const BookMagItem = ({ item }) => {
    // =============== Language ===============
    const { t } = useTranslation();

    // =============== Navigation ===============
    const navigation = useNavigation();

    return (
        <View style={[homeStyles.workTop, { marginBottom: 30 }]}>
            <View>
                <Image source={{ uri: item.image_url ? item.image_url : `${WEB.url}/assets/img/cover.png` }} style={homeStyles.workImage} />
            </View>
            <View style={homeStyles.workDescTop}>
                <Text style={homeStyles.workTitle} numberOfLines={2}>{item.work_title}</Text>
                <Text style={homeStyles.workContent} numberOfLines={4}>{item.work_content}</Text>
                <TouchableOpacity style={homeStyles.linkIcon} onPress={() => navigation.navigate('WorkData', { itemId: item.id })}>
                    <Text style={[homeStyles.link, { fontSize: 16 }]}>{t('see_details')} </Text>
                    <FontAwesome6 name='angle-right' size={ICON_SIZE.s5} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default BookMagItem;