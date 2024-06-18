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
        maxWidth: 170,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginRight: 15,
        backgroundColor: COLORS.white,
        elevation: 1
    },

    titleOne: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.black
    },

    paragraph: {
        marginTop: 4,
        fontSize: 12
    },

    thumbnail: {
        width: 110,
        height: 150,
        borderRadius: 5,
        marginBottom: 4
    },
});

export default styles;