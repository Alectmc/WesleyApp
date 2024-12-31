//This screen has been depreciated and will be removed in a future version.

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FooterText from '../footer/FooterText';
import axios, { AxiosError } from 'axios'; //Using 0.24.0

const WhatsNewScreen = () => {
    return(
        <View style={styles.container}>
            <Image source={require('../assets/Blobs.png')} style={styles.imageStyle} />
                <Text style={styles.mainText}>What's New in Beta 0.4.1?</Text>
                <Text style={styles.list}>-Fixed a bug where the keyboard would cover text fields.</Text>
                <Text style={styles.list}>-Cleaned up keyboard layout.</Text>
                <Text style={styles.list}>-Fixed a bug where the user could not scroll on the setup screen.</Text>
            <FooterText />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 44,
        textAlign: 'center',
        paddingBottom: 50,
        color: 'black'
    },
    list: {
        fontSize: 24,
        textAlign: 'left',
        width: '80%',
        color: 'black',
        fontWeight: 'bold',
        paddingBottom: 20
    },
    imageStyle: {
        position: 'absolute',
        width: '112%',
        height: '112%',
        zIndex: -1
    }
})
export default WhatsNewScreen