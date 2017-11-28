import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Dimensions,
    Animated
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import GDHome from '../home/GDHome';

const {width, height} = Dimensions.get('window')

export default class GDLaunchPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.bounceValue, {
            toValue: 1.2,
            duration: 1000
        }).start();

        // SplashScreen.hide();
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('tabView');
        },1500)
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render(){
        return(
            <Image source={require('../../assest/launchimage.png')} style={styles.imageStyle}/>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle:{
        width: width,
        height: height,
    }
});