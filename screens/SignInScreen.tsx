import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment-timezone';
import axios, { AxiosError } from 'axios';
import FooterText from '../footer/FooterText';

//Will be available in a future update...
const SignInScreen = () => {
    const [selectedEvent, setSelectedEvent] = useState('tuesday_worship');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const events = [
        { label: 'Tuesday Worship', value: 'tuesday_worship', start: '18:30', end: '20:00', day: 2 },
        { label: 'Wednesday Lunch', value: 'wednesday_lunch', start: '10:45', end: '13:00', day: 3 },
        { label: 'Thursday Dinner & Bible Study', value: 'thurday_dinner', start: '17:30', end: '20:00', day: 4 }
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

    const handleSignIn = async () => {
        const event = events.find(e => e.value === selectedEvent);

        const now = moment().tz('America/Chicago');
        const startTime = moment(now).day(event.day).hour(event.start.split(':')[0]).minute(event.start.split(':')[1]);
        const endTime = moment(now).day(event.day).hour(event.end.split(':')[0]).minute(event.end.split(':')[1]);

        if(!now.isBetween(startTime, endTime)) {
            const formattedTime = startTime.format('h:mm A');
            Alert.alert("Error", `${event.label} sign in is not open right now! You may sign in starting at ${formattedTime} on ${event.label.split(' ')[0]}.`);
            return;
        }

        setLoading(true)
        try {
            const response = await axios.post('http://172.16.100.30:4000/signin', {
                firstName,
                lastName,
                email
            }, {
                timeout: 5000
            });
            Alert.alert("Success", `You have signed in as ${firstName} ${lastName} for ${event.label}!`);
        } catch (e) {
            console.warn(e);
            const error = e as AxiosError;
            if (error.message === 'Network Error'){
                Alert.alert('Network Error', 'Signing in took too long to complete. Please try again later.');
            } else{
                Alert.alert('Error', 'Could not sign in due to an unknown error. Please try again later.');
            }
        }
        setLoading(false);

        /*if (now.isBetween(startTime, endTime)) {
            setLoading(true);
            //POST request to backend server (Will be localhost for now during dev testing!)
            axios.post('http://192.168.1.154:4000/signin', {
                firstName,
                lastName,
                email,
            }, {
                timeout: 10000
            })
            .then(response => {
                Alert.alert("Success", `You have signed in as ${firstName} ${lastName} for ${event.label}!`);
                setLoading(false);
            })
            .catch(e => {
                console.log(e)
                const error = e as AxiosError;
                if (error.message === 'Network Error'){
                    Alert.alert('Network Error', 'Signing in took too long to complete. Please try again later.')
                } else{
                    Alert.alert('Error', 'Could not sign in. Please try again later.')
                }
                setLoading(false);
            });
        } else {
            const formattedTime = startTime.format('h:mm A');
            Alert.alert("Error", `${event.label} sign in is not open right now! You may sign in starting at ${formattedTime} on ${event.label.split(' ')[0]}.`);
        }*/
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Blobs.png')} style={styles.imageStyle} />
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
            {loading ? (
                <ActivityIndicator size='large' color='blue' />
            ) : (
                <>
                    <Button title="Sign In" onPress={handleSignIn} />
                </>
            )}

            <FooterText />
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
    imageStyle: {
        position: 'absolute',
        width: '112%',
        height: '112%'
    }
});

export default SignInScreen;