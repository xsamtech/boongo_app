/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { WEB } from '../../tools/constants';
import homeStyles from '../../screens/Home/style';

const WorkItem = ({ item }) => {
    // =============== Navigation ===============
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.scrollableListItem} onPress={() => navigation.navigate('WorkData', { itemId: item.id })}>
            <View>
                <Image source={{ uri: item.image_url ? item.image_url : `${WEB.url}/assets/img/cover.png` }} style={homeStyles.workImage} />
            </View>
            <View style={homeStyles.workDescTop}>
                <Text style={homeStyles.workTitle}>{item.work_title}</Text>
                <Text style={homeStyles.workContent}>{item.work_content}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default WorkItem;