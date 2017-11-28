import React from 'react';
import { View, Text, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'profile',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Text>profile Screen</Text>
        );
    }
}