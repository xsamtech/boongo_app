/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { StyleSheet } from 'react-native';
import { COLORS, PADDING } from '../../tools/constants';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee'
    },

    inputText: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 7,
        paddingHorizontal: 10,
    },

    inputSubmit: {
        backgroundColor: COLORS.blue,
        paddingVertical: 8,
        paddingHorizontal: PADDING.horizontal,
    }
});

export default styles;