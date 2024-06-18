/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../tools/constants';

const styles = StyleSheet.create({
    scrollableListItem: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 7,
        marginRight: 15,
        backgroundColor: COLORS.warning,
        borderRadius: 20
    },

    paragraph: {
        fontSize: 14,
        fontWeight: '800'
    }
});

export default styles;