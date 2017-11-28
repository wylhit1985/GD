import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import GDCommonNavBar from '../common/GDCommonNavBar';
export default class GDHt extends React.Component {
    static navigationOptions = {
        tabBarLabel: '海淘',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../assest/tabbar_abroad_30x30.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };


    renderLeftItem(){
        return(
            <TouchableOpacity>
                <Image source = {require('../../assest/hot_icon_20x20.png')} style={styles.leftNavStyle}/>
            </TouchableOpacity>
        );
    };

    renderMidItem(){
        return(
            <TouchableOpacity>
                <Image source = {require('../../assest/navtitle_abroad_down_66x20.png')} style={styles.midNavStyle}/>
            </TouchableOpacity>
        );
    }

    renderRightItem(){
        return(
            <TouchableOpacity>
                <Image source = {require('../../assest/search_icon_20x20.png')} style={styles.rightNavStyle}/>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style = {styles.container} >
                <GDCommonNavBar leftItem={()=>this.renderLeftItem()}
                                midItem={()=>this.renderMidItem()}
                                rightItem={()=>this.renderRightItem()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e96ddb',
    },
    icon: {
        width: 26,
        height: 26,
    },
    leftNavStyle: {
        width: 20,
        height: 20,
        marginLeft:15,
    },
    midNavStyle: {
        width: 66,
        height: 20,
    },
    rightNavStyle: {
        width: 20,
        height: 20,
        marginRight:15,
    }
});