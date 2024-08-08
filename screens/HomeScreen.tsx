import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Wesley App Pre-Alpha Test!</Text>
            <Text>EVERYTHING Here is subject to change and not finalized.</Text>
            <Text>NONE of this is public, so please keep this confidential/within Council!</Text>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Calendar')}
            >
                <Text style={styles.buttonText}>View Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Link Tree')}
            >
                <Text style={styles.buttonText}>View LinkTree</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Prayer Requests')}
            >
                <Text style={styles.buttonText}>Send Prayer Request</Text>
            </TouchableOpacity>
        </View>
    );
};

/*const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Wesley App!</Text>
            <Button title="View Calendar" onPress={() => navigation.navigate('Calendar')} />
            <Button title="View LinkTree" onPress={() => navigation.navigate('Link Tree')} />
            <Button title="Send Prayer Request" onPress={() => navigation.navigate('PrayerRequest')} />
            
        </View>
    );
};*/

const styles = StyleSheet.create({
    container: {
        padding: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;