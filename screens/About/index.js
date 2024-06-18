/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import homeStyles from '../Home/style';
import { useTranslation } from 'react-i18next';

// const Stack = createNativeStackNavigator();

// const StackNav = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='About' screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="terms" component={TermsScreen} />
//         <Stack.Screen name="privacy" component={PrivacyScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const AboutScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={homeStyles.view}>
      <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 10 }}>{t('about_boongo')}</Text>
      <TouchableOpacity style={homeStyles.button} onPress={() => navigation.navigate('Home_')}>
        <Text style={homeStyles.text}>{t('navigation.home')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;