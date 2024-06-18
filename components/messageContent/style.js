/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { StyleSheet } from 'react-native';
import { COLORS, PADDING } from '../../tools/constants';

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        backgroundColor: COLORS.white,
        margin: 5,
        paddingTop: 5,
        paddingBottom: 12,
        borderRadius: 14,
    },

    messageInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: PADDING.horizontal
    },

    messageText: {
        marginBottom: 3,
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: 5,
        fontSize: 15,
        color: '#555'
    },

    status: {
        fontSize: 12,
        color: '#999'
    },

    dateContent: {
        fontSize: 12,
        color: '#999'
    }
});

export default styles;