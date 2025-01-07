import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const FooterText = () => {
    //Generates footer text at bottom of each screen.
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>DEVELOPMENT BUILD: v0.7b</Text>
        </View>
    );
}

//Stylesheets for the text
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