/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from './tools/constants';
import HomeScreen from './screens/Home';
import AboutScreen from './screens/About';
import AccountScreen from './screens/Account';
import CartScreen from './screens/Account/cart';
import MyWorkScreen from './screens/Account/my_work';
import BookScreen from './screens/Book';
import JournalScreen from './screens/Journal';
import MappingScreen from './screens/Mapping';
import MediaScreen from './screens/Media';
import NotificationScreen from './screens/Account/notification';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import DrawerContent from './DrawerContent';
import LanguageScreen from './screens/Language';
import RegisterScreen from './screens/Auth/register';
import LoginScreen from './screens/Auth';
import PasswordResetScreen from './screens/Auth/password-reset';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import WorkDataScreen from './screens/Home/work_data';

const StackNav = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { userInfo } = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                statusBarColor: COLORS.dark_danger,
                headerStyle: {
                    backgroundColor: COLORS.danger
                },
                headerTintColor: COLORS.white,
                headerTitleAlign: 'center'
            }}>
            <Stack.Screen name='Home_' component={HomeScreen} options={{
                title: t('navigation.home'),
                headerLeft: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='menu' />
                        </TouchableOpacity>
                    );
                },
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Language')}>
                            <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='translate' />
                        </TouchableOpacity>
                    );
                }
            }} />
            <Stack.Screen name='About' component={AboutScreen} options={{ headerShown: false, title: t('navigation.about') }} />
            <Stack.Screen name='Book' component={BookScreen} options={{
                title: t('navigation.book'),
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='magnify' />
                        </TouchableOpacity>
                    );
                }
            }} />
            <Stack.Screen name='Journal' component={JournalScreen} options={{
                title: t('navigation.magazine'),
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='magnify' />
                        </TouchableOpacity>
                    );
                }
            }} />
            <Stack.Screen name='Mapping' component={MappingScreen} options={{
                title: t('navigation.mapping'),
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='magnify' />
                        </TouchableOpacity>
                    );
                }
            }} />
            <Stack.Screen name='Media' component={MediaScreen} options={{
                title: t('navigation.media'),
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='magnify' />
                        </TouchableOpacity>
                    );
                }
            }} />
            <Stack.Screen name='WorkData' component={WorkDataScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Language' component={LanguageScreen} options={{ title: t('change_lang') }} />
            {userInfo.id ? (
                <>
                    <Stack.Screen name='Notification' component={NotificationScreen} />
                    <Stack.Screen name='Account' component={AccountScreen} />
                    <Stack.Screen name='Cart' component={CartScreen} />
                    <Stack.Screen name='MyWork' component={MyWorkScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false, title: t('register') }} />
                    <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false, title: t('login') }} />
                    <Stack.Screen name='PasswordReset' component={PasswordResetScreen} options={{ headerShown: false, title: t('auth.password.reset') }} />
                </>
            )}
        </Stack.Navigator>
    );
};

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{ headerShown: false }}>
            <Drawer.Screen name='Home' component={StackNav} />
        </Drawer.Navigator>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <DrawerNav />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
