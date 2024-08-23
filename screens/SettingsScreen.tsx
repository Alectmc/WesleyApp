import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, AlertButton } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidateEmail from '../helper_funcs/EmailVerification'

const SettingsScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [editFirstName, setEditFirst] = useState(false);
    const [editLastName, setEditLast] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    useEffect(() => {
        const loadUserInfo = async () => {
            const userInfo = await AsyncStorage.getItem('user_info');
            if(userInfo) {
                const { firstName, lastName, email } = JSON.parse(userInfo);
                setFirstName(firstName);
                setLastName(lastName);
                setEmail(email);
            }
        };
        loadUserInfo();
    }, []);

    const saveField = async (field: string) => {
        if (field === "Email" && !ValidateEmail(email)) {
            Alert.alert('Error', 'Please type a valid email address.');
            return;
        }

        await AsyncStorage.setItem('user_info', JSON.stringify({ firstName, lastName, email }));
        Alert.alert('Success',  `${field} successfully updated!`);
        if (field === "First Name") setEditFirst(false);
        if (field === "Last Name") setEditLast(false);
        if (field === "Email") setEditEmail(false);
    };

    const handleDeleteData = () => {
        Alert.alert(
            "WARNING: This cannot be undone",
            "Are you sure you want to delete all data?",
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    onPress: async () => { 
                        await AsyncStorage.removeItem('user_info');
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        Alert.alert("Success", "Your data has been deleted.");
                     }
                }

            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>First Name: </Text>
            {editFirstName ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <Button title='Save' onPress={() => saveField("First Name")} />
                </>
            ) : (
                <View style={styles.infoContainer}>
                    <Text style={styles.textInputStyle}>{firstName}</Text>
                    <Button title="Edit" onPress={() => setEditFirst(true)} />
                </View>
            )}

            <Text style={styles.textStyle}>Last Name: </Text>
            {editLastName ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <Button title='Save' onPress={() => saveField("Last Name")} />
                </>
            ) : (
                <View style={styles.infoContainer}>
                    <Text style={styles.textInputStyle}>{lastName}</Text>
                    <Button title="Edit" onPress={() => setEditLast(true)} />
                </View>
            )}

            <Text style={styles.textStyle}>Email: </Text>
            {editEmail ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Button title='Save' onPress={() => saveField("Email")} />
                </>
            ) : (
                <View style={styles.infoContainer}>
                    <Text style={styles.textInputStyle}>{email}</Text>
                    <Button title="Edit" onPress={() => setEditEmail(true)} />
                </View>
            )}

            <Button title="Delete All Data" color="red" onPress={() => handleDeleteData()}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginVertical: 8,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black'
    },
    textInputStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
});

export default SettingsScreen;