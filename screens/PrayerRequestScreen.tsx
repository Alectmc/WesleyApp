import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text, Alert, Keyboard, TouchableWithoutFeedback, ActivityIndicator, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
//import Mailer from 'react-native-mail';
import axios from 'axios';
import FooterText from '../footer/FooterText';

//This screen is for sending prayer requests to the ministry staff.
const PrayerRequestScreen = () => {
    //Variables with setters.
    const [message, setMessage] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //This function will send the prayer request typed in the message box to the ministry staff.

    const sendPrayerRequest = () => {
        //Activate the loading icon.
        setIsLoading(true);

        //If message has no contents, do not send it.
        if (!message) {
            Alert.alert('Warning', 'Your prayer request cannot have an empty body!');
            return;
        }

        //Format the message to be sent.
        let emailMessage = `\bPRAYER REQUEST RECEIVED FROM THE WESLEY APP:\n\n"${message}"`;
        //If the user has asked for their prayer request to be confidential, add a disclaimer at the end
        //of the message.
        if (isAnonymous) {
            emailMessage += '\n\nNOTE: This Prayer Request Has Been Marked as Confidential.';
        }

        emailMessage += ''

        //Send the prayer request to the backend server. If no response has been received after 5 seconds,
        //report a timeout error. Otherwise, confirm the message was sent if there are no errors with
        //a pop-up alert, end the loading animation, and reset the message to be empty.
        axios.post('https://server.wesleyfoundationmt.org', {message: emailMessage}, {timeout: 5000})
            .then(reponse => {
                setIsLoading(false);
                Alert.alert('Prayer Request Sent', 'Your prayer request has been sent!');
                setMessage('');
            })
            .catch(error => {
                setIsLoading(false);
                Alert.alert('Error', 'Could not send prayer request due to an error');
                console.warn(error);
            });
    };

    //Screen to be viewed by the end-user to enter and send their prayer request.
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                    {isLoading ? (
                        <ActivityIndicator size="large" color="black" /> // Show loader when loading
                    ) : (
                        <Button title="Send" onPress={sendPrayerRequest} disabled={isLoading} /> // Disable button while loading
                    )}

                <FooterText />
            </View>
        </TouchableWithoutFeedback>
    );
};

//Stylesheets for the Prayer Request screen
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
        alignItems: 'center'
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