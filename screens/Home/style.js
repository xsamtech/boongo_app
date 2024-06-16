/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { StyleSheet } from 'react-native';
import { COLORS, PADDING } from '../../tools/constants';

const homeStyles = StyleSheet.create({
    view: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    langView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.warning
    },

    heading: {
        fontSize: 30,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 10
    },

    text: {
        fontSize: 16,
        color: COLORS.white,
        textAlign: 'center'
    },

    langText: {
        fontSize: 16,
        color: COLORS.black,
        textAlign: 'center'
    },

    button: {
        width: 140,
        backgroundColor: COLORS.primary,
        paddingVertical: 5,
        paddingHorizontal: PADDING.horizontal
    },

    langButton: {
        padding: 10,
        borderBottomColor: COLORS.success,
        borderBottomWidth: 1
    },
});

export default homeStyles;