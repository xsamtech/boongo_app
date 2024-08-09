/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
// import homeStyles from './style';
import homeStyles from '../../screens/Home/style';
import { COLORS } from '../../tools/constants';

const CategoryItem = ({item}) => {
    return (
        <TouchableOpacity style={[homeStyles.workDescBadge, { backgroundColor: COLORS.warning }]}>
            <Text style={homeStyles.paragraph}>{item.category_name}</Text>
        </TouchableOpacity>
    )
};

export default CategoryItem;