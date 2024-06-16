/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from './tools/constants';
import HomeScreen from './screens/Home';
import AboutScreen from './screens/About';
import AccountScreen from './screens/Account';
import CartScreen from './screens/Account/cart';
import MyWorkScreen from './screens/Account/my_work';
import TermsScreen from './screens/About/terms';
import PrivacyScreen from './screens/About/privacy';
import ContactScreen from './screens/About/contact';
import BookScreen from './screens/Book';
import JournalScreen from './screens/Journal';
import MappingScreen from './screens/Mapping';
import MediaScreen from './screens/Media';
import NotificationScreen from './screens/Account/notification';
import i18next from '../../services/i18next';
import { useTranslation } from 'react-i18next';

const StackNav = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                statusBarColor: COLORS.info,
                headerStyle: {
                    backgroundColor: COLORS.primary
                },
                headerTintColor: COLORS.white,
                headerTitleAlign: 'center'
            }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='About' component={AboutScreen} />
            <Stack.Screen name='Terms' component={TermsScreen} />
            <Stack.Screen name='Privacy' component={PrivacyScreen} />
            <Stack.Screen name='Contact' component={ContactScreen} />
            <Stack.Screen name='Book' component={BookScreen} />
            <Stack.Screen name='Journal' component={JournalScreen} />
            <Stack.Screen name='Mapping' component={MappingScreen} />
            <Stack.Screen name='Media' component={MediaScreen} />
            <Stack.Screen name='Notification' component={NotificationScreen} />
            <Stack.Screen name='Account' component={AccountScreen} options={{ headerShown: true }} />
            <Stack.Screen name='Cart' component={CartScreen} />
            <Stack.Screen name='MyWork' component={MyWorkScreen} />
        </Stack.Navigator>
    );
};

const App = () => {
    const Drawer = createDrawerNavigator();
    const { t } = useTranslation();

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={HomeScreen} options={{ title: t('navigation.home') }} />
                <Drawer.Screen name='About' component={AboutScreen} options={{ title: t('navigation.about') }} />
                <Drawer.Screen name='Book' component={BookScreen} options={{ title: t('navigation.book') }} />
                <Drawer.Screen name='Journal' component={JournalScreen} options={{ title: t('navigation.magazine') }} />
                <Drawer.Screen name='Mapping' component={MappingScreen} options={{ title: t('navigation.mapping') }} />
                <Drawer.Screen name='Media' component={MediaScreen} options={{ title: t('navigation.media') }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default App;
