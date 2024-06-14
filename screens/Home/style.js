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

    heading: {
        fontSize: 30,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 10
    },

    text: {
        fontSize: 14,
        color: COLORS.white
    },

    button: {
        width: 100,
        backgroundColor: COLORS.primary,
        paddingVertical: 5,
        paddingHorizontal: PADDING.horizontal,
        textAlign: 'center'
    },
});

export default homeStyles;