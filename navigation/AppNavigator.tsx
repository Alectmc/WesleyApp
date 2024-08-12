import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; //To be implemented
import CalendarScreen from '../screens/CalendarScreen'; //To be implemented
import PrayerRequestScreen from '../screens/PrayerRequestScreen'; //To be implemented
import LinkTreeScreen from '../screens/LinkTreeScreen';
import SetupScreen from "../screens/SetupScreen";
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [initialRoute, setInitialRoute] = useState<null | 'Home' | 'Setup'>(null); //Start with null to show loading state

    useEffect(() => {
        const checkUserInfo = async () => {
            const userInfo = await AsyncStorage.getItem('user_info');
            if (userInfo) {
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
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
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
                <Stack.Screen name="Setup" component={SetupScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
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