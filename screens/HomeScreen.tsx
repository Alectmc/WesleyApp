import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterText from '../footer/FooterText';
import moment from 'moment'
import axios from 'axios';

const HomeScreen = ({ navigation }) => {

    const checkInfo = async () => {
        const userInfo = await AsyncStorage.getItem('user_info');
        if(userInfo) {
            const { firstName, lastName, email } = JSON.parse(userInfo);

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

    const invalidInfoAlert = () => {
        Alert.alert(
            'Missing/Incomplete Information',
            'Your first name, last name, and/or email were not found. This is required for signing in. Would you like to add them now?',
            [
                { text: 'Yes', onPress: () => navigation.navigate('Profile Settings') },
                { text: 'No' },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Profile Settings')}
            >
                <Icon name='person-circle-outline' size={40} color='black' />
            </TouchableOpacity>
            <Image source={require('../assets/Logo.png')} style={styles.imageStyle} />
            <Text style={styles.textStyle}>Welcome to the Wesley App!{'\n'}(Closed Beta Version 0.4.1)</Text>

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
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Whats New')}
            >
                <Text style={styles.buttonText}>What's New</Text>
            </TouchableOpacity>

            <FooterText />
        </View>
    );
};

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