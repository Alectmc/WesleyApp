import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidateEmail from '../helper_funcs/EmailVerification';
import FooterText from '../footer/FooterText';

const SetupScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = async() => {
        if (!firstName || !lastName || !email) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (!ValidateEmail(email)) {
            Alert.alert('Error', 'Please type a valid email address.');
            return;
        }

        try {
            await AsyncStorage.setItem('user_info', JSON.stringify({ firstName, lastName, email }));
            await AsyncStorage.setItem('seen_setup', 'true');
            console.log('User info saved');
            navigation.navigate('Beta Disclaimer')
            //navigation.navigate('Home');
        } catch (e) {
            Alert.alert('Error', 'An unexpected error occured. Please try again later.');
        }
    };

    const handleSkip = () => {
        Alert.alert(
            "Are you sure?",
            "You may skip setup, but should you decide to use the sign-in feature of the app, you will need to update your info in settings.",
            [
                {
                    text: "Yes!",
                    onPress: async () => { 
                        await AsyncStorage.setItem('seen_setup', 'true');
                        navigation.navigate('Beta Disclaimer'); 
                    },
                },
                {
                    text: "No thanks",
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Blobs.png')} style={styles.imageStyle} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={120} // Adjust this if needed
            >
            <ScrollView style={styles.scrollContainer}>
                <Image source={require('../assets/Logo2.png')} style={styles.logo} />
                <Text style={styles.welcomeText}>Welcome to the Wesley of Middle Tennessee Mobile App!{'\n\n'}If you'd like to use the app to sign in, please enter your information below.{'\n'}(NOTE: This is <Text style={styles.underline}>NOT</Text> required and can be done later in settings.)</Text>
                <Text>First Name: </Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    returnKeyType='done'
                />
                <Text>Last Name: </Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    returnKeyType='done'
                />
                <Text>Email: </Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType='done'
                />
                <View style={styles.buttonStyles}>
                    <Button title="Save" onPress={handleSave} />
                    <Text>                     </Text>
                    <Button title="Skip" onPress={handleSkip} />
                </View>

            </ScrollView>
            </KeyboardAvoidingView>
            <FooterText />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        //justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    buttonStyles: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    welcomeText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 40,
        color: 'black'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    imageStyle: {
        position: 'absolute',
        width: '112%',
        height: '112%',
        zIndex: -1, // Ensure it's behind other content
    },
    logo: {
        width: 250,
        height: 150,
        marginBottom: 20,
        alignSelf: 'center'
    }
});

export default SetupScreen;