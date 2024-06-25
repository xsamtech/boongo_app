/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { StyleSheet } from 'react-native';
import { COLORS, PADDING } from '../../tools/constants';

const homeStyles = StyleSheet.create({
    // Miscellaneous
    view: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    headingArea: {
        marginTop: 7,
        marginBottom: 12,
        paddingHorizontal: PADDING.horizontal
    },

    cardEmpty: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 40,
        marginHorizontal: 10,
        backgroundColor: COLORS.white,
        elevation: 1
    },

    cardEmptyTitle: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black,
    },

    cardEmptyText: {
        fontSize: 14,
    },

    heading: {
        fontSize: 25,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 7
    },

    headingText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 7
    },

    paragraph: {
        fontSize: 14,
        fontWeight: '800'
    },

    link: {
        color: COLORS.primary,
    },

    linkIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Authentication
    authlogo: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30
    },

    authTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 20
    },

    authText: {
        textAlign: 'center',
        marginTop: 19
    },

    authLink: {
        color: COLORS.primary,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10
    },

    authInput: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        marginBottom: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 5
    },

    authTextarea: {
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        marginBottom: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 5
    },

    authButton: {
        backgroundColor: COLORS.primary
    },

    authCancel: {
        backgroundColor: COLORS.secondary,
        marginVertical: 20
    },

    authButtonText: {
        fontSize: 14,
        color: COLORS.white,
        textAlign: 'center',
        textTransform: 'uppercase'
    },

    authCancelText: {
        fontSize: 14,
        color: COLORS.black,
        textAlign: 'center'
    },

    authDivider: {
        color: COLORS.secondary,
        marginTop: 50,
        marginBottom: 10,
    },

    authTermsText: {
        textAlign: 'center',
        marginBottom: 10
    },

    authBottomText: {
        textAlign: 'center',
    },

    authBottomLink: {
        color: COLORS.primary,
        textAlign: 'center'
    },

    // Drawer
    drawerContent: {
    },

    drawerBrand: {
    },

    drawerTitle: {
        fontWeight: '800'
    },

    drawerCaption: {
    },

    drawerUserInfoSection: {
    },

    drawerSection: {
        width: 'auto'
    },

    drawerButton: {
        backgroundColor: COLORS.primary,
        width: 140,
        margin: 'auto'
    },

    drawerButtonText: {
        color: COLORS.white
    },

    // Toggle language
    langView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: PADDING.vertical
    },

    langPicker: {
        backgroundColor: COLORS.white,
        float: 'right',
        elevation: 2
    },

    langButton: {
        width: 200,
        padding: 10,
        borderBottomColor: COLORS.success,
        borderBottomWidth: 1
    },

    langText: {
        fontSize: 16,
        color: COLORS.black
    },

    button: {
        backgroundColor: COLORS.primary,
        marginBottom: 10,
        paddingVertical: 7,
        paddingHorizontal: PADDING.horizontal
    },

    buttonReverse: {
        backgroundColor: COLORS.secondary,
        marginBottom: 10,
        paddingVertical: 7,
        paddingHorizontal: PADDING.horizontal
    },

    buttonText: {
        fontSize: 14,
        color: COLORS.white,
        textAlign: 'center'
    },

    buttonTextReverse: {
        fontSize: 14,
        color: COLORS.black,
        textAlign: 'center'
    },

    buttonTextReverse: {
        fontSize: 14,
        color: COLORS.black,
        textAlign: 'center'
    },

    // Horizontal scrolling badges
    scrollableBadges: {
        marginTop: 3,
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
        whiteSpace: 'nowrap',
    },

    scrollableList: {
        marginBottom: 10,
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical
    },

    scrollableListItem: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 7,
        marginRight: 15,
        backgroundColor: COLORS.warning,
        borderRadius: 20
    },

    listTitleArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: PADDING.horizontal,
        paddingTop: PADDING.horizontal,
    },

    listTitle: {
        fontWeight: '700',
        textTransform: 'uppercase'
    },
});

export default homeStyles;