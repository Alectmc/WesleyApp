import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment-timezone';
import axios from 'axios';

const SignInScreen = () => {
    const [selectedEvent, setSelectedEvent] = useState('tuesday_worship');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const events = [
        { label: 'Tuesday Worship', value: 'tuesday_worship', start: '18:30', end: '20:00', day: 2 },
        { label: 'Wednesday Lunch', value: 'wednesday_lunch', start: '10:45', end: '13:00', day: 3 },
        { label: 'Thursday Dinner & Bible Study', value: 'thurday_dinner', start: '12:30', end: '20:00', day: 5 }
    ];

    useEffect(() => {
        const loadUserInfo = async () => {
            const userInfo = await AsyncStorage.getItem('user_info');
            if (userInfo) {
                const { firstName, lastName, email } = JSON.parse(userInfo);
                setFirstName(firstName);
                setLastName(lastName);
                setEmail(email);
            }
        };

        loadUserInfo();
    }, []);

    const handleSignIn = () => {
        const event = events.find(e => e.value === selectedEvent);

        const now = moment().tz('America/Chicago');
        const startTime = moment(now).day(event.day).hour(event.start.split(':')[0]).minute(event.start.split(':')[1]);
        const endTime = moment(now).day(event.day).hour(event.end.split(':')[0]).minute(event.end.split(':')[1]);

        if (now.isBetween(startTime, endTime)) {
            //POST request to backend server (Will be localhost for now during dev testing!)
            axios.post('http://192.168.1.154:4000/signin', {
                firstName,
                lastName,
                email,
            })
            .then(response => {
                Alert.alert("Success", `You have signed in as ${firstName} ${lastName} for ${event.label}!`);
            })
            .catch(error => {
                Alert.alert('Error', 'Could not sign in. Please try again later.')
                console.log(error)
            });
        } else {
            const formattedTime = startTime.format('h:mm A');
            Alert.alert("Error", `${event.label} sign in is not open right now! You may sign in starting at ${formattedTime} on ${event.label.split(' ')[0]}.`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Select Event:</Text>
            <Picker
                selectedValue={selectedEvent}
                onValueChange={(itemValue, itemIndex) => setSelectedEvent(itemValue)}
                style={styles.picker}
            >
                {events.map(event => (
                    <Picker.Item key={event.value} label={event.label} value = {event.value} />
                ))}
            </Picker>
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    picker: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    textStyle: {
        padding: 20,
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black',
    },
});

export default SignInScreen;