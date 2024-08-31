import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({ navigation }) => {
    const [logoFade] = useState(new Animated.Value(0)) //Set initial opacity value to 0
    const [textFade] = useState(new Animated.Value(0)) //Set initial opacity value to 0

    useEffect(() => {
        Animated.sequence([
            //Start animation
            Animated.timing(logoFade, {
                toValue: 1, //Opacity to 1
                duration: 2000, //2000ms = 2s
                useNativeDriver: true
            }),
            Animated.delay(500), //Delay for 1 second.
            Animated.timing(textFade, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.delay(1000)
        ]).start(() => checkUserInfo());

        const checkUserInfo = async () => {
            const userInfo = await AsyncStorage.getItem('user_info');
            if (userInfo) {
                navigation.replace('Home');
            } else {
                navigation.replace('Setup');
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/Logo2.png')}
                style={[
                    styles.logo,
                    { opacity : logoFade }
                ]}
            />
            <Animated.Text style={[styles.welcomeText, { opacity: textFade }]}>
                Welcome to the Wesley App!
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        width: 350,
        height: 200,
        marginBottom: 20
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        padding: 20,
        textAlign: 'center'
    }
});

export default WelcomeScreen;