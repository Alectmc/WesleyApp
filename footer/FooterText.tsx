import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const FooterText = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>DEVELOPMENT BUILD: v0.1b</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 20,
        bottom: 14
    },
    textStyle: {
        fontSize: 12,
        color: '#808080'
    }
});

export default FooterText;