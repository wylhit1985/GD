import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
    Modal,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import Main from '../main/Main';
import GDHome from '../home/GDHome';
import GDHt from '../ht/GDHt';

const {width, height} = Dimensions.get('window')

export default class GDLaunchPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.bounceValue, {
            toValue: 1.5,
            duration: 1000
        }).start();

        // SplashScreen.hide();
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('GDHome',{ transition: 'forFade' });//
        },1500)
    }



    render(){
        return(
            <View>
                <Image source={{uri:'launchimage'}} style={styles.imageStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle:{
        width:width,
        height:height,
    }
});