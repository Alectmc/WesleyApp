import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import FooterText from '../footer/FooterText';
import axios, { AxiosError } from 'axios'; //Using 0.24.0

const WhatsNewScreen = () => {
    //const [updateMessage, setUpdateMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const checkAppVersion = async () => {
        setLoading(true);

        try {
            const response = await axios.post('http://172.16.100.30:5000/check-version', {
                version: 'v0.1b'
            }, {
                timeout: 5000
            });
            const data = response.data;
            if (data.latest) {
                Alert.alert("You're up-to-date!", 'The Wesley App is up-to-date and running on the latest version.');
                //setUpdateMessage('Your app is up-to-date!')
            } else {
                Alert.alert("Out-Of-Date!", `The Wesley App is out-of-date! To continue using the sign-in and prayer request features, please update to the newest version: ${data.latestVersion}`);
                //setUpdateMessage(`OUT OF DATE. AN UPDATE IS AVAILABLE: ${data.latestVersion}`);
            }
        } catch (e) {
            console.log(e);

            const error = e as AxiosError;

            if (error.message === 'Network Error') { //ECONNABORTED is the error code in axios for a timed out request.
                Alert.alert('Network Error', 'Checking for updates took too long. Please try again later.')
            } else {
                Alert.alert('Error', 'An error has occured. Please try again later.')
                //setUpdateMessage('An error occured during version check. Please try again later.')
            }
        }
        setLoading(false);
    };

    return(
        <View style={styles.container}>
            <Text style={styles.mainText}>What's New in Beta 0.1?</Text>
            <Text style={styles.list}>-The Wesley App is now in BETA!!!!!</Text>
            <Text style={styles.list}>-Sign Ins are now being tested!</Text>
            <Text style={styles.list}>-Calendar and Link Tree are now available!</Text>
            <Text style={styles.list}>-Prayer Requests are now being tested!</Text>
            <Text style={styles.list}>-What's New section added to view what's new in each update and check for an update!</Text>

            {loading ? (
                <ActivityIndicator size='large' color='blue' />
            ) : (
                <>
                    <Button title="Check For Update" onPress={checkAppVersion} />
                </>
            )}

            <FooterText />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 44,
        textAlign: 'center',
        paddingBottom: 100,
        color: 'black'
    },
    list: {
        fontSize: 24,
        textAlign: 'left',
        width: '80%',
        color: 'black',
        fontWeight: 'bold',
        paddingBottom: 20
    }
})
export default WhatsNewScreen