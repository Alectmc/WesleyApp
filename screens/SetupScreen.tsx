import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidateEmail from '../helper_funcs/EmailVerification';

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
            await AsyncStorage.setItem('@user_info', JSON.stringify({ firstName, lastName, email }));
            console.log('User info saved');
            navigation.navigate('Home');
        } catch (e) {
            Alert.alert('Error', 'An unexpected error occured. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>First Name: </Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text>Last Name: </Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
            />
            <Text>Email: </Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Save" onPress={handleSave} />
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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});

export default SetupScreen;