import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Dimensions,
    Platform,
    // ReactPropTypes,
} from 'react-native';

import ReactPropTypes from 'prop-types';

const {width, height} = Dimensions.get('window')

export default class GDBadge extends React.Component {
    static propTypes = {
        num:ReactPropTypes.number
    };

    renderjBadge(){
        if(this.props.num == 0){
            return null;
        }else{
            return(
                <View>
                    <View style={styles.badgeColor} ></View>
                    <Text style={styles.badgeText}>{this.props.num}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {
                    this.renderjBadge()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    badgeColor: {
        // position:'absolute',
        bottom:22,
        left:20,
        backgroundColor: 'red',
        borderRadius:5,
        width: 18,
        height: 14,
    },
    badgeText: {
        position:'absolute',
        fontSize: 12,
        // top:0,
        bottom:22,
        left:23,
    },
    imageStyle: {
        width: 70,
        height: 70,
        marginLeft: 15,
    },
    titleStyle:{
        width: width*0.60,
    },
    arrowStyle: {
        width: 16,
        height: 26,
        marginRight: 15,
    },
});