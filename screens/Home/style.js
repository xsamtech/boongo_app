/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { Dimensions, StyleSheet } from 'react-native';
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
        flexShrink: 1,
        width: Dimensions.get('window').width,
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

    // Floating button
    floatingButton: {
        alignItems: 'center',
        position: 'absolute',
        right: 30,
        bottom: 40,
        zIndex: 999,
        width: 60,
        height: 60,
        paddingTop: 7,
        borderRadius: 100 / 2
    },

    // Custom header
    headerBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.danger
    },

    headerButton: {
        width: 40,
        height: 40,
        marginVertical: PADDING.horizontal,
        marginLeft: PADDING.horizontal,
        paddingVertical: 7,
        paddingLeft: 11
    },

    headerButtonIcon: {
        fontSize: 25,
        color: COLORS.white
    },

    headerTitle: {
        width: Dimensions.get('window').width - 80,
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '500',
        color: COLORS.white
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

    // Work details
    workBody: {
        paddingVertical: 30,
        paddingHorizontal: 10,
    },

    workCard: {
        backgroundColor: COLORS.white,
        marginBottom: 14,
        padding: 15,
    },

    workTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },

    workDescTop: {
        flexShrink: 1,
        marginBottom: 10,
    },

    workImage: {
        width: Dimensions.get('window').width / 2.5,
        height: (Dimensions.get('window').width / 2.5) * 1.5,
        marginRight: 10,
        borderWidth: 3,
        borderColor: COLORS.light,
        borderRadius: 20
    },

    workImageMap: {
        width: '100%',
        height: '100%',
    },

    workTitle: {
        fontSize: 23,
        fontWeight: '700',
        color: COLORS.black,
        marginTop: 10,
        marginBottom: 7
    },

    workContent: {
        fontSize: 14,
        marginBottom: 10
    },

    workBottom: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    workDescBottom: {
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },

    workDescText: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 10
    },

    workDescBadgesList: {
        flexDirection: 'column',
        marginBottom: 10,
        paddingHorizontal: PADDING.horizontal
    },

    workDescBadgesListContents: {
        flexShrink: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    workDescBadge: {
        fontSize: 16,
        color: COLORS.black,
        backgroundColor: COLORS.secondary,
        marginBottom: 10,
        marginRight: 7,
        paddingTop: 3,
        paddingBottom: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    workIconBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 154,
        marginTop: 10,
    },

    workIconBtn: {
        fontSize: 25,
    },

    workCmds: {
        padding: 10,
    },

    workCmd: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5
    },

    workCmdIcon: {
        fontSize: 16,
        marginRight: 10
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

    // Home styles
    homeScrollableListItem: {
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 170,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginRight: 15,
        backgroundColor: COLORS.white,
        elevation: 1
    },

    homeTitleOne: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.black
    },

    homeParagraph: {
        marginTop: 4,
        fontSize: 12
    },

    homeThumbnail: {
        width: 110,
        height: 150,
        borderRadius: 5,
        marginBottom: 4
    },

    // Category filter badge
    categoryBadge: {
        backgroundColor: COLORS.warning,
        marginRight: 7,
        paddingTop: 3,
        paddingBottom: 4,
        paddingHorizontal: 10,
        borderRadius: 10
    },

    categoryBadgeText: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.black
    },

    categoryBadgeSelected: {
        backgroundColor: COLORS.black,
        marginRight: 7,
        paddingTop: 3,
        paddingBottom: 4,
        paddingHorizontal: 10,
        borderRadius: 10
    },

    categoryBadgeTextSelected: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.warning
    },

    // Search
    searchContainer: {
        paddingTop: 15,
        flexDirection: 'column',
        alignItems: 'center'
    },

    searchInput: {
        flexDirection: 'row'
    },

    searchInputText: {
        width: Dimensions.get('window').width - 100,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        marginVertical: 15,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderEndWidth: 0,
        borderColor: COLORS.secondary,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        fontSize: 16
    },

    searchInputSubmit: {
        backgroundColor: COLORS.primary,
        marginVertical: 15,
        paddingTop: 15,
        paddingHorizontal: 14,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
    },

    searchResult: {
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        marginBottom: 0,
        paddingVertical: PADDING.vertical,
        paddingHorizontal: 20
    },

    searchResultImage: {
        width: 80,
        height: 100
    },

    searchResultTitle: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black
    },

    searchResultText: {
        marginBottom: 10,
        fontSize: 14
    },

    searchResultLink: {
        marginBottom: 10,
        fontSize: 14
    },

    // Notepad
    noteTitle: {
        marginVertical: PADDING.vertical, 
        fontSize: 18, 
        textAlign: 'center', 
        color: COLORS.black
    },

    noteForm: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    noteInput: {
        width: Dimensions.get('window').width - 20,
        borderColor: '#ddd',
        borderWidth: 1,
        borderBottomWidth: 0,
        paddingHorizontal: 14,
        fontSize: 15
    },

    noteSubmit: {
        width: Dimensions.get('window').width - 20,
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 16
    },

    noteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: Dimensions.get('window').width - 33,
        marginHorizontal: 20,
        paddingVertical: 10,
        // paddingRight: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },

    noteText: {
        width: Dimensions.get('window').width - 70,
        fontSize: 16
    },

    noteDeleteButton: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        padding: 8,
        borderRadius: 4
    },

    noteDeleteButtonText: {
        fontSize: 21,
        color: COLORS.black
    }
});

export default homeStyles;