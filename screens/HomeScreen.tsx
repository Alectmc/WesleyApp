import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterText from '../footer/FooterText';

//This screen is the main screen for the user interface within the app.
const HomeScreen = ({ navigation }) => {

    //This user will check if the user has entered their info that is used for sign-ins.
    //If so, they will be redirected to the Sign In screen, otherwise they will be prompted to
    //enter their details. This function is currently inactive until the backend for the
    //sign-ins is live.
    const checkInfo = async () => {
        //Get user info from async storage.
        const userInfo = await AsyncStorage.getItem('user_info');
        //Check if the user has info saved. If not, immediately prompt them for it.
        if(userInfo) {
            //Parse user info.
            const { firstName, lastName, email } = JSON.parse(userInfo);

            //If a valid first name, last name, and email are found, redirect to the Sign in screen.
            //Otherwise, prompt the user for their info.
            if (firstName && lastName && email) {
                Alert.alert("Sign-In Coming Soon!", "The Sign-In Feature will be available in a future version of the Wesley App!")
                //navigation.navigate('Sign In');
            } else {
                Alert.alert("Sign-In Coming Soon!", "The Sign-In Feature will be available in a future version of the Wesley App!")
                //invalidInfoAlert();
            }
        } else {
            Alert.alert("Sign-In Coming Soon!", "The Sign-In Feature will be available in a future version of the Wesley App!")
            //invalidInfoAlert();
        }
    };

    //This function is called if info is needed for signins
    const invalidInfoAlert = () => {
        //Send a pop-up alert that the user is missing information and allow them to update it if they so choose
        //in the profile setting screen.
        Alert.alert(
            'Missing/Incomplete Information',
            'Your first name, last name, and/or email were not found. This is required for signing in. Would you like to add them now?',
            [
                { text: 'Yes', onPress: () => navigation.navigate('Profile Settings') },
                { text: 'No' },
            ]
        );
    };

    //This is the screen for the main home page. Includes buttons signing in, the calendar, the LinkTree,
    //sending prayer requests, and viewing whats new. At the top, there is also a button for profile settings
    //(user info).
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Profile Settings')}
            >
                <Icon name='person-circle-outline' size={40} color='black' />
            </TouchableOpacity>
            <Image source={require('../assets/Logo.png')} style={styles.imageStyle} />
            <Text style={styles.textStyle}>Welcome to the Wesley App!{"\n"}(Public Beta 0.7)</Text>

            <TouchableOpacity 
                style={styles.button} 
                onPress={checkInfo}
            >
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Calendar')}
            >
                <Text style={styles.buttonText}>View Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Link Tree')}
            >
                <Text style={styles.buttonText}>View LinkTree</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Prayer Requests')}
            >
                <Text style={styles.buttonText}>Send Prayer Request</Text>
            </TouchableOpacity>

            <FooterText />
        </View>
    );
};

//Stylesheets for the home screen.
const styles = StyleSheet.create({
    container: {
        padding: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    settingsButton: {
        position: 'absolute',
        top: 40,
        right: 16,
    },
    imageStyle: {
        width: 150,
        height: 150,
    },
    textStyle: {
        padding: 16,
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
        textAlign: 'center'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    }
});

export default HomeScreen;