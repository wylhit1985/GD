import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import {styles} from "../../App";

export default class TabProfileScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '说明',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../assest/arrow-expand.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
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
