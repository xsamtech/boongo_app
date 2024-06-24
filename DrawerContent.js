/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Button, Divider, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import homeStyles from './screens/Home/style';
import { AuthContext } from './contexts/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const DrawerList = [
    { icon: 'home-outline', label: 'navigation.home', navigateTo: 'Home' },
    { icon: 'help-circle-outline', label: 'navigation.about', navigateTo: 'About' },
    { icon: 'book', label: 'navigation.book', navigateTo: 'Book' },
    { icon: 'newspaper', label: 'navigation.magazine', navigateTo: 'Journal' },
    { icon: 'map-marker-outline', label: 'navigation.mapping', navigateTo: 'Mapping' },
    { icon: 'video-outline', label: 'navigation.media', navigateTo: 'Media' }
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
                        <Image source={require('./assets/img/brand.png')} />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { userInfo.id ? navigation.navigate('Account') : navigation.navigate('Login') }}>
                        <View style={homeStyles.drawerUserInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10, marginLeft: 16 }}>
                                {userInfo.id ? (
                                    <>
                                        <Avatar.Image
                                            source={{
                                                uri: !userInfo.avatar_url  ? userInfo.avatar_url : 'data:image/png;base64,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'
                                            }}
                                            size={50}
                                            style={{ marginTop: 5 }}
                                        />
                                        <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                            <Title style={homeStyles.drawerTitle}>{userInfo.firstname}</Title>
                                            <Text style={homeStyles.drawerCaption}>{userInfo.username ? userInfo.username : (userInfo.email ? userInfo.email : userInfo.phone)}</Text>
                                        </View>
                                    </>
                                ) : (
                                    <Button style={homeStyles.drawerButton} onPress={() => { navigation.navigate('Login'); }}>
                                        <Text style={homeStyles.drawerButtonText}>{t('login')}</Text>
                                    </Button>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={homeStyles.drawerSection}>
                        <DrawerItems />
                        {userInfo.id ? (
                            <>
                                <Divider style={{ marginTop: 30 }} />
                                <DrawerItem
                                    icon={({ color, size }) => <Icon name='logout' color={color} size={size} />}
                                    label={t('logout')}
                                    onPress={logout}/>
                                <Divider />
                            </>
                        ) : ('')}
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

export default DrawerContent;