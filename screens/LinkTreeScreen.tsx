import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const LinkTreeScreen = () => {
    return (
        <View style={styles.container}>
            <WebView source= {{ uri: 'linktr.ee/wesleyfoundationmt' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LinkTreeScreen;