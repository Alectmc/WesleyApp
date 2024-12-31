import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import FooterText from '../footer/FooterText';

//This screen is simply a webview of the ministry's LinkTree.
const LinkTreeScreen = () => {
    return (
        <View style={styles.container}>
            <WebView source= {{ uri: 'https://linktr.ee/wesleyfoundationmt' }} />
            <FooterText />
        </View>
    );
};

//Stylesheet for the view container.
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LinkTreeScreen;