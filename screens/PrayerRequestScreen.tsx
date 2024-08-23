import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
//import Mailer from 'react-native-mail';
import axios from 'axios';

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
        let emailMessage = `PRAYER REQUEST RECEIVED FROM THE WESLEY APP:\n\n${message}`;
        if (isAnonymous) {
            emailMessage += '\n\nNOTE: This Prayer Request Has Been Marked as Confidential.';
        }

        emailMessage += '\n\n\nALL ATTACHMENTS IN THIS EMAIL ARE CONFIDENTIAL.'

        axios.post('http://192.168.1.154:3000/send-prayer-request', {message: emailMessage})
            .then(reponse => {
                Alert.alert('Success!', 'Your prayer request has been sent!');
                setMessage('');
            })
            .catch(error => {
                Alert.alert('Error', 'Could not send prayer request...');
                console.warn(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>IT WORKS!! PRAISE BE TO GOD!</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your prayer request here..."
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
            />
            <View style={styles.checkboxContainer}>
                <Text>Would you like this Prayer Request to stay private? </Text>
                <CheckBox
                    value={isAnonymous}
                    onValueChange={setIsAnonymous}
                />
            </View>
            <Button title="Send" onPress={sendPrayerRequest} />
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
        marginLeft: 8,
    },
    textStyle: {
        textAlign: 'center'
    }
});

export default PrayerRequestScreen;