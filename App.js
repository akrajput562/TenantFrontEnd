import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FindPropertyScreen from './screens/FindPropertyScreen';
import ConfirmPropertyScreen from './screens/ConfirmPropertyScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import TermsAgreementScreen from './screens/TermsAgreementScreen';
import UserDashboardScreen from './screens/UserDashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="FindProperty"
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#000',
            }}
          >
            <Stack.Screen 
              name="FindProperty" 
              component={FindPropertyScreen}
              options={{ title: 'Find Property' }}
            />
            <Stack.Screen 
              name="ConfirmProperty" 
              component={ConfirmPropertyScreen}
              options={{ title: 'Confirm Property' }}
            />
            <Stack.Screen 
              name="PersonalDetails" 
              component={PersonalDetailsScreen}
              options={{ title: 'Personal Details' }}
            />
            <Stack.Screen 
              name="TermsAgreement" 
              component={TermsAgreementScreen}
              options={{ title: 'Terms of Agreement' }}
            />
            <Stack.Screen 
              name="UserDashboard" 
              component={UserDashboardScreen}
              options={{ title: 'Dashboard' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
