import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BetaScreen = ({ navigation }) => {
    const agree = 'true';

    const agreeToTerms = async () => {
        const agreeInfo = await AsyncStorage.setItem('agree_terms', JSON.stringify({ agree }))
        navigation.navigate('Home')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.betaText}>DISCLAIMER</Text>
            <Text style={styles.descText}>This is a beta build of the Wesley App.</Text>
            <Text style={styles.descText}>Some things may not work properly, and this build is <Text style={styles.underline}>NOT</Text> reflective of the final version.</Text>
            <Text style={styles.descText}>To get started testing the app, simply tap 'I Understand' below!</Text>
            <View style={styles.buttonStyle}>
                <Button title="I Understand" onPress={agreeToTerms} />
            </View>
        </View>
    )
}

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