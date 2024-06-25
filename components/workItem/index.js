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