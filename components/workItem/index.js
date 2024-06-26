/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const WorkItem = ({ item }) => {
    // =============== Navigation ===============
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.scrollableListItem} onPress={() => navigation.navigate('WorkData', { itemId : item.id })}>
            {item.image_url !== null ? <Image source={{ uri: item.image_url }} style={styles.thumbnail} /> : null}
            <Text style={styles.titleOne}>
                {((item.work_title).length > 25) ? (((item.work_title).substring(0, 25 - 3)) + '...') : item.work_title}
            </Text>
            <Text style={styles.paragraph}>
                {((item.work_content).length > 33) ? (((item.work_content).substring(0, 33 - 3)) + '...') : item.work_content}
            </Text>
        </TouchableOpacity>
    )
};

export default WorkItem;