/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Button, Divider, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import homeStyles from './screens/Home/style';
import { AuthContext } from './contexts/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import TextBrand from './assets/img/text.svg';
import AvatarF from './assets/img/avatar-F.svg';
import AvatarM from './assets/img/avatar-M.svg';

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
                        <TextBrand width={154} height={50} />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { userInfo.id ? navigation.navigate('Account') : navigation.navigate('Login') }}>
                        <View style={homeStyles.drawerUserInfoSection}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10, marginLeft: 16 }}>
                                {userInfo.id ? (
                                    <>
                                        <View style={{ marginTop: 5 }}>
                                            {userInfo.avatar_url != null
                                                ?
                                                <Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={{ uri: userInfo.avatar_url }} />
                                                :
                                                (userInfo.gender == 'F' ? <AvatarF width={60} height={60} /> : <AvatarM width={60} height={60} />)
                                            }
                                        </View>
                                        <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                            <Title style={homeStyles.drawerTitle}>{userInfo.firstname}</Title>
                                            <Text style={homeStyles.drawerCaption}>{userInfo.username ? '@' + userInfo.username : (userInfo.email ? userInfo.email : userInfo.phone)}</Text>
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
                                    onPress={logout} />
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