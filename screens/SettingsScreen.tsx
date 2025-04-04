import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, AlertButton } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidateEmail from '../helper_funcs/EmailVerification'
import { TouchableOpacity } from 'react-native-gesture-handler';
import FooterText from '../footer/FooterText';

const SettingsScreen = () => {
    //Setup Use States for information editing.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [editFirstName, setEditFirst] = useState(false);
    const [editLastName, setEditLast] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    //Use effect for when the user info is loaded to be displayed in the fields.
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

    //Function to save info when updated in settings
    const saveField = async (field: string) => {
        //Check is the email is valid.
        if (field === "Email" && !ValidateEmail(email)) {
            Alert.alert('Error', 'Please type a valid email address.');
            return;
        }

        //Save the new information, display a success message, and
        await AsyncStorage.setItem('user_info', JSON.stringify({ firstName, lastName, email }));
        Alert.alert('Success',  `${field} successfully updated!`);
        if (field === "First Name") setEditFirst(false);
        if (field === "Last Name") setEditLast(false);
        if (field === "Email") setEditEmail(false);
    };

    //Function to delete all data if the user so wishes.
    const handleDeleteData = () => {
        //Prompt the user to confirm deletion of data.
        Alert.alert(
            "WARNING: This cannot be undone",
            "Are you sure you want to delete all info?",
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
                        Alert.alert("Success", "Your info has been deleted.");
                     }
                }

            ]
        );
    };

    //User interface to be displayed for user settings.
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Blobs.png')} style={styles.imageStyle} />
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

            <TouchableOpacity style={styles.button} onPress={handleDeleteData}>
                <Text style={styles.buttonText}>Delete All Info</Text>
            </TouchableOpacity>

            <FooterText />
        </View>
    );
};

//Stylesheets
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
        fontSize: 28,
        color: 'black'
    },
    textInputStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black',
        padding: 24
    },
    button: {
        backgroundColor: '#ff4d4d',
        paddingTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginVertical: 50,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    imageStyle: {
        position: 'absolute',
        width: '112%',
        height: '112%'
    }
});

//<Button title="Delete All Data" color="red" onPress={() => handleDeleteData()}/>

export default SettingsScreen;