import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
//import Mailer from 'react-native-mail';
import axios from 'axios';
import FooterText from '../footer/FooterText';

/*const PrayerRequestScreen = () => {
    const [message, setMessage] = useState('');

    const sendPrayerRequest = () => {
        Mailer.mail({
            subject: 'WESLEY APP: Prayer Request',
            recipients: ['alectmc@gmail.com'],
            body: message,
            isHTML: true,
        }, (error, event) => {
            if (error) {
                Alert.alert('Error', 'Could not send request. Please try again later');
                console.warn(error);
            }
            else{
                Alert.alert('Success', 'Your prayer request has been sent.');
                setMessage('');
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text>This is currently completely broken lol</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your prayer request here..."
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Send" onPress={sendPrayerRequest} />
        </View>
    );
};*/

const PrayerRequestScreen = () => {
    const [message, setMessage] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const sendPrayerRequest = () => {
        let emailMessage = `\bPRAYER REQUEST RECEIVED FROM THE WESLEY APP:\n\n"${message}"`;
        if (isAnonymous) {
            emailMessage += '\n\nNOTE: This Prayer Request Has Been Marked as Confidential.';
        }

        emailMessage += ''

        axios.post('http://172.16.100.24:3000/send-prayer-request', {message: emailMessage})
            .then(reponse => {
                Alert.alert('Prayer Request Sent', 'Your prayer request has been sent!');
                setMessage('');
            })
            .catch(error => {
                Alert.alert('Error', 'Could not send prayer request due to an error');
                console.warn(error);
            });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Blobs.png')} style={styles.imageStyle} />
            <Text style={styles.textStyle}>How can we be in prayer for you?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your prayer request here..."
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
            />
            <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxLabel}>Would you like this Prayer Request to stay private? </Text>
                <CheckBox
                    value={isAnonymous}
                    style={styles.checkbox}
                    onValueChange={setIsAnonymous}
                />
            </View>
            <Button title="Send" onPress={sendPrayerRequest} />

            <FooterText />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkboxLabel: {
        marginLeft: 20,
    },
    checkbox: {
        marginLeft: 10,
    },
    textStyle: {
        fontSize: 32,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        paddingBottom: 50
    },
    imageStyle: {
        position: 'absolute',
        width: '112%',
        height: '112%'
    }
});

export default PrayerRequestScreen;