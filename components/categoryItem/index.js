/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './style';

const CategoryItem = ({item}) => {
    return (
        <TouchableOpacity style={styles.scrollableListItem}>
            <Text style={styles.paragraph}>{item.category_name}</Text>
        </TouchableOpacity>
    )
};

export default CategoryItem;