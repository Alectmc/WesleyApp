import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; //To be implemented
import CalendarScreen from '../screens/CalendarScreen'; //To be implemented
import PrayerRequestScreen from '../screens/PrayerRequestScreen'; //To be implemented
import LinkTreeScreen from '../screens/LinkTreeScreen';
import SetupScreen from "../screens/SetupScreen";
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import WhatsNewScreen from '../screens/WhatsNewScreen';
import BetaScreen from '../screens/BetaScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [initialRoute, setInitialRoute] = useState<null | 'Home' | 'Setup'>(null); //Start with null to show loading state

    useEffect(() => {
        const checkUserInfo = async () => {
            //const userInfo = await AsyncStorage.getItem('user_info');
            const seenSetup = await AsyncStorage.getItem('agree_terms')
            if (seenSetup) {
                setInitialRoute('Home')
            } else {
                setInitialRoute('Setup');
            }
        };
        checkUserInfo();
    }, []);

    if (initialRoute === null) {
        // Show a loading indicator while determining the initial route
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );

    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerLeft: null,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen name="Sign In" component={SignInScreen} />
                <Stack.Screen name="Calendar" component={CalendarScreen} />
                <Stack.Screen name="Link Tree" component={LinkTreeScreen} />
                <Stack.Screen name="Prayer Requests" component={PrayerRequestScreen} />
                <Stack.Screen name="Whats New" component={WhatsNewScreen} />
                <Stack.Screen name="Setup" component={SetupScreen} />
                <Stack.Screen name="Profile Settings" component={SettingsScreen} />
                <Stack.Screen
                    name="Beta Disclaimer"
                    component={BetaScreen} 
                    options={{
                        headerLeft: null,
                        gestureEnabled: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/*const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Calendar" component={CalendarScreen} />
                <Stack.Screen name="Link Tree" component={LinkTreeScreen} />
                <Stack.Screen name="Prayer Requests" component={PrayerRequestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};*/

export default AppNavigator;