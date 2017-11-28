import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class MainScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigate('Profile1', { name: 'Jane' })
                }
            />
        );
    }
}