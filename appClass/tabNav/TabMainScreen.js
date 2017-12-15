import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import {styles} from "../../App";

export default class TabMainScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '主页',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={{uri:'android-user-menu'}}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('TabProfile')}
                title="Go to profile"
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
