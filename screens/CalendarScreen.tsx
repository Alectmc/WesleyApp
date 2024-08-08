import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const CalendarScreen = () => {
    return (
        <View style={styles.container}>
            <WebView source= {{ uri: 'https://www.wesleyfoundationmt.org/upcoming-events' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CalendarScreen