import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import {styles} from "../../App";

export default class DrawerProfileScreen extends React.Component {
    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('DrawerOpen')}
                title="open drawer"
            />
        );
    }
}

// const styles = StyleSheet.create({
//     icon: {
//         width: 26,
//         height: 26,
//     },
// });
