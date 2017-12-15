import React, { Component } from 'react';
import {styles} from "../../App";
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default class DrawerMainScreen extends Component {
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
                onPress={() => this.props.navigation.navigate('DP')}
                title="Go to DP"
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
