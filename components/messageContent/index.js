/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { COLORS, ICON_SIZE } from '../../tools/constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

dayjs.extend(relativeTime);

const MessageContent = ({ item }) => {
    const isRead = () => { return item.status === 1; };
    const isMine = () => { return item.user.id === 1; };

    return (
        <View style={[styles.container, {
            backgroundColor: isMine() ? COLORS.green : COLORS.white,
            alignSelf: isMine() ? 'flex-end' : 'flex-start'
        }]}>
            <View>
                <Text style={[styles.messageText, { color: isMine() ? COLORS.white : '#555' }]}>{item.message}</Text>
            </View>
            <View style={styles.messageInfo}>
                <MaterialCommunityIcons name={isRead() ? 'check-circle' : 'clock-outline'} color={isRead() ? COLORS.green : '#999'} size={ICON_SIZE.s5} />
                <Text style={[styles.dateContent, { color: isMine() ? COLORS.white : '#999' }]}>
                    {dayjs(item.updated_at).fromNow(true)}
                </Text>
            </View>
        </View>
    );
};

export default MessageContent;