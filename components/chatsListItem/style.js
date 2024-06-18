/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { StyleSheet } from 'react-native';
import { COLORS, PADDING } from '../../tools/constants';

const styles = StyleSheet.create({
    chatContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        elevation: 1
    },

    chatInfo: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    userName: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.black
    },

    chatImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        marginEnd: 7
    },

    chatMessageText: {
        marginTop: 4,
        fontSize: 12
    },

    dateContent: {
        fontSize: 11,
        color: COLORS.green
    },
});

export default styles;