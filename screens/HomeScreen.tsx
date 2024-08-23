import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const checkInfo = async () => {
        const userInfo = await AsyncStorage.getItem('user_info');
        if(userInfo) {
            const { firstName, lastName, email } = JSON.parse(userInfo);

            if (firstName && lastName && email) {
                navigation.navigate('Sign In');
            } else {
                invalidInfoAlert();
            }
        } else {
            invalidInfoAlert();
        }
    };

    const invalidInfoAlert = () => {
        Alert.alert(
            'Missing/Incomplete Information',
            'Your first name, last name, and/or email were not found. This is required for signing in. Would you like to add them now?',
            [
                { text: 'Yes', onPress: () => navigation.navigate('Settings') },
                { text: 'No' },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
            >
                <Icon name='settings-outline' size={32} color='black' />
            </TouchableOpacity>
            <Image source={require('../assets/Logo.png')} style={styles.imageStyle} />
            <Text style={styles.textStyle}>Welcome to the Wesley App!{'\n'}(Beta Version 0.1)</Text>
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
        </View>
    );
};

/*const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Wesley App!</Text>
            <Button title="View Calendar" onPress={() => navigation.navigate('Calendar')} />
            <Button title="View LinkTree" onPress={() => navigation.navigate('Link Tree')} />
            <Button title="Send Prayer Request" onPress={() => navigation.navigate('PrayerRequest')} />
            
        </View>
    );
};*/

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
        width: 250,
        height: 250,
    },
    textStyle: {
        padding: 16,
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
        textAlign: 'center'
    }
});

export default HomeScreen;