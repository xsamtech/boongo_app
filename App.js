/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from './tools/constants';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import AboutScreen from './screens/About';
import AccountScreen from './screens/Account';
import BookScreen from './screens/Book';
import BlockedScreen from './screens/Account/blocked';
import DrawerContent from './DrawerContent';
import HomeScreen from './screens/Home';
import JournalScreen from './screens/Journal';
import LanguageScreen from './screens/Language';
import LoginScreen from './screens/Auth';
import MappingScreen from './screens/Mapping';
import MediaScreen from './screens/Media';
import NotificationScreen from './screens/Account/notification';
import PasswordResetScreen from './screens/Auth/password-reset';
import PDFViewerScreen from './screens/Home/pdf_viewer';
import RegisterScreen from './screens/Auth/register';
import SplashScreen from './screens/Home/splash_screen';
import SearchScreen from './screens/Search';
import VideoPlayerScreen from './screens/Home/video_player';
import WorkDataScreen from './screens/Home/work_data';
import SubscriptionScreen from './screens/Home/subscriptions';
import SubscribeScreen from './screens/Home/subscribe';

const StackNav = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { userInfo, splashLoading } = useContext(AuthContext);

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
            {splashLoading ? (
                <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
            ) : (
                <>
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
                                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                                    <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='magnify' />
                                </TouchableOpacity>
                            );
                        }
                    }} />
                    <Stack.Screen name='About' component={AboutScreen} options={{ headerShown: false }} />
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
                    <Stack.Screen name='Subscription' component={SubscriptionScreen} options={{ title: t('subscription.title') }} />
                    <Stack.Screen name='Search' component={SearchScreen} options={{ title: t('navigation.search') }} />
                    <Stack.Screen name='WorkData' component={WorkDataScreen} options={{ title: t('work_details.title') }} />
                    <Stack.Screen name='PDFViewer' component={PDFViewerScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='VideoPlayer' component={VideoPlayerScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Language' component={LanguageScreen} options={{ title: t('change_lang') }} />
                    {userInfo.id ? (
                            <>
                            <Stack.Screen name='Account' component={AccountScreen} options={{ headerShown: false, title: t('navigation.account') }} />
                            <Stack.Screen name='Notification' component={NotificationScreen} options={{ title: t('navigation.notification') }} />
                            <Stack.Screen name='Subscribe' component={SubscribeScreen} options={{ headerShown: false }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false, title: t('register') }} />
                            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false, title: t('login') }} />
                            <Stack.Screen name='PasswordReset' component={PasswordResetScreen} options={{ headerShown: false, title: t('auth.password.reset') }} />
                        </>
                    )}
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
