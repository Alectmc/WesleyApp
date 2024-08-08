import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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

    return (
        <View style={styles.container}>
            <Text>First Name: </Text>
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
                    <Text>{firstName}</Text>
                    <Button title="Edit" onPress={() => setEditFirst(true)} />
                </View>
            )}

            <Text>Last Name: </Text>
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
                    <Text>{lastName}</Text>
                    <Button title="Edit" onPress={() => setEditLast(true)} />
                </View>
            )}

            <Text>Email: </Text>
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
                    <Text>{email}</Text>
                    <Button title="Edit" onPress={() => setEditEmail(true)} />
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
});

export default SettingsScreen;