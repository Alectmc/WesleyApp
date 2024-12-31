import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Screen to ensure the user is aware that this is a beta build of the app.
const BetaScreen = ({ navigation }) => {
    //The following code sets the async storage's item 'agree_terms' to true,
    //indicating the user has agreed to the acknowledgement. Assuming no errors,
    //the user will be redirected to the home page and never seen this screen again.
    const agree = 'true';

    const agreeToTerms = async () => {
        try{
            await AsyncStorage.setItem('agree_terms', JSON.stringify({ agree }))
            navigation.navigate('Home')
        }
        catch (e){
            Alert.alert('Error', 'An unexpected error occured. Please try again later.');
        }
    }

    //View of the screen for the end user.
    return(
        <View style={styles.container}>
            <Text style={styles.betaText}>BETA DISCLAIMER</Text>
            <Text style={styles.descText}>This is a beta build of the Wesley App.</Text>
            <Text style={styles.descText}>Some things may not work properly, and this build is <Text style={styles.underline}>NOT</Text> reflective of the final version.</Text>
            <Text style={styles.descText}>To get started using the app, simply tap 'I Understand' below!</Text>
            <View style={styles.buttonStyle}>
                <Button title="I Understand" onPress={agreeToTerms} />
            </View>
        </View>
    )
}

//Stylesheets for screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    buttonStyle: {
        justifyContent: 'center'
    },
    descText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 40,
        color: 'black'
    },
    betaText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 44,
        paddingBottom: 20,
        color: 'red'
    },
    underline: {
        textDecorationLine: 'underline'
    }
});

export default BetaScreen;