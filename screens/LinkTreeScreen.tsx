import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import FooterText from '../footer/FooterText';

const LinkTreeScreen = () => {
    return (
        <View style={styles.container}>
            <WebView source= {{ uri: 'https://linktr.ee/wesleyfoundationmt' }} />
            <FooterText />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LinkTreeScreen;