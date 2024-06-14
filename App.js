/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './tools/constants';

const App = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
};

export default App;
