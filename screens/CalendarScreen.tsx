import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import FooterText from '../footer/FooterText';

//This screen simply produces a webview of the ministry's calendar page from the website.
const CalendarScreen = () => {
    return (
        <View style={styles.container}>
            <WebView source= {{ uri: 'https://www.wesleyfoundationmt.org/upcoming-events' }} />
            <FooterText />
        </View>
    );
};

//Stylesheets for the container.
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CalendarScreen