import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WhatsNewScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.mainText}>What's New in Beta 0.1?</Text>
            <Text style={styles.list}>-The Wesley App is now in BETA!!!!!</Text>
            <Text style={styles.list}>-Sign Ins are now being tested!</Text>
            <Text style={styles.list}>-Calendar and Link Tree are now available!</Text>
            <Text style={styles.list}>-Prayer Requests are now being tested!</Text>
            <Text style={styles.list}>-What's New section added to view what's new in each update and check for an update!</Text>
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