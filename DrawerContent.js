/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Divider, Title } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from './contexts/AuthContext';
import homeStyles from './screens/Home/style';
import TextBrand from './assets/img/text.svg';

const DrawerList = [
    { icon: 'home-outline', label: 'navigation.home', navigateTo: 'Home' },
    { icon: 'book', label: 'navigation.book', navigateTo: 'Book' },
    { icon: 'newspaper', label: 'navigation.magazine', navigateTo: 'Journal' },
    { icon: 'map-marker-outline', label: 'navigation.mapping', navigateTo: 'Mapping' },
    { icon: 'video-outline', label: 'navigation.media', navigateTo: 'Media' },
    { icon: 'help-circle-outline', label: 'navigation.about', navigateTo: 'About' },
    { icon: 'translate', label: 'change_lang', navigateTo: 'Language' }
];

const DrawerLayout = ({ icon, label, navigateTo }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <DrawerItem
            icon={({ color, size }) => <Icon name={icon} color={color} size={size} />}
            label={t(label)}
            onPress={() => {
                navigation.navigate(navigateTo);
            }}
        />
    );
};

const DrawerItems = props => {
    return DrawerList.map((el, i) => {
        return (
            <DrawerLayout key={i}
                icon={el.icon}
                label={el.label}
                navigateTo={el.navigateTo} />
        );
    });
};

const goToAccount = (nav) => {
    try {
        nav.navigate('Account')
    } catch (error) {
        console.log('Nini yango ? ' + error);
    }
};

const DrawerContent = (props) => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    // =============== Authentication context ===============
    const { userInfo, isLoading, logout } = useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <Spinner visible={isLoading} />

            <DrawerContentScrollView {...props}>
                <View style={homeStyles.drawerContent}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginVertical: 12 }}>
                        <TextBrand width={154} height={50} />
                    </View>
                    <View style={homeStyles.drawerUserInfoSection}>
                        {userInfo && userInfo.id ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10, marginLeft: 20 }}>
                                <View style={{ marginTop: 5 }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={{ uri: userInfo.avatar_url }} />
                                </View>
                                <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                    <Title style={homeStyles.drawerTitle}>{userInfo.firstname}</Title>
                                    <Text style={homeStyles.drawerCaption}>{userInfo.username ? '@' + userInfo.username : (userInfo.email ? userInfo.email : userInfo.phone)}</Text>
                                </View>
                            </View>
                        ) : (
                            <Button style={homeStyles.drawerButton} onPress={() => { navigation.navigate('Login'); }}>
                                <Text style={homeStyles.drawerButtonText}>{t('login')}</Text>
                            </Button>
                        )}
                    </View>
                    <View style={homeStyles.drawerSection}>
                        {userInfo.id ? (
                            <>
                                <View>
                                    <DrawerItem
                                        icon={({ color, size }) => <Icon name='account-outline' color={color} size={size} />}
                                        label={t('navigation.account')}
                                        onPress={() => { navigation.navigate('Account'); }} />
                                </View>
                                <DrawerItems />
                                <View>
                                    <Divider style={{ marginTop: 30 }} />
                                    <DrawerItem
                                        icon={({ color, size }) => <Icon name='logout' color={color} size={size} />}
                                        label={t('logout')}
                                        onPress={logout} />
                                    <Divider />
                                </View>
                            </>
                        ) : (
                            <DrawerItems />
                        )}
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

export default DrawerContent;