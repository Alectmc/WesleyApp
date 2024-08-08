import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; //To be implemented
import CalendarScreen from '../screens/CalendarScreen'; //To be implemented
import PrayerRequestScreen from '../screens/PrayerRequestScreen'; //To be implemented
import LinkTreeScreen from '../screens/LinkTreeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
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
};

export default AppNavigator;