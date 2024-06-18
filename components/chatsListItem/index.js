/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ChatsListItem = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.chatContainer}
            onPress={() => navigation.navigate('messageDetails', {item})}>
            <Image source={item.avatar_url} style={styles.chatImage} />
            <View>
                <View style={styles.chatInfo}>
                    <Text style={styles.userName}>{item.firstname + ' ' + item.lastname}</Text>
                    <Text style={styles.dateContent}>{dayjs(item.updated_at).fromNow(true)}</Text>
                </View>
                <Text>
                    {((item.last_message).length > 41) ? (((item.last_message).substring(0, 41 - 3)) + '...') : item.last_message}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ChatsListItem;