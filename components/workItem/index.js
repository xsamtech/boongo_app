/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import styles from './style';

const WorkItem = ({item}) => {
    return (
        <TouchableOpacity style={styles.scrollableListItem}>
            <Image source={item.photo_url} style={styles.thumbnail} />
            <Text style={styles.titleOne}>
                {((item.title).length > 25) ? (((item.title).substring(0, 25 - 3)) + '...') : item.title}
            </Text>
            <Text style={styles.paragraph}>
                {((item.description).length > 33) ? (((item.description).substring(0, 33 - 3)) + '...') : item.description}
            </Text>
        </TouchableOpacity>
    )
};

export default WorkItem;