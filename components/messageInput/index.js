/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, ICON_SIZE } from '../../tools/constants';

const MessageInput = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputText} placeholder='Message ici ...' />
            <TouchableOpacity>
                <MaterialCommunityIcons style={styles.inputSubmit} name='send' color={COLORS.white} size={ICON_SIZE.s1} />
            </TouchableOpacity>
        </View>
    );
};

export default MessageInput;