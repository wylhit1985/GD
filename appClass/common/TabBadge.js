import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Dimensions,
    Platform,
    DeviceEventEmitter,
} from 'react-native';

import ReactPropTypes from 'prop-types';

const {width, height} = Dimensions.get('window')

export default class FocusedTabBadge extends React.Component {
    static propTypes = {
        tabType:ReactPropTypes.number,//0-首页，1-海淘
        focused:ReactPropTypes.bool,
    };

    static defaultProps={
        tabType:0,
        focused:false
    }

    constructor(props){
        super(props);
        this.state = {
            homeNumber: 0,
            htNumber: 0,
        };
    }

    renderjBadge = () => {
        if(this.props.tabType == 0){
            if(this.state.homeNumber == 0){
                return null;
            }else{
                return(
                    <View>
                        <View style={[styles.badgeColor,{backgroundColor: this.props.focused ? 'red' : 'gray'},{opacity:this.props.focused ? 1.0 : 0.5}, {width: this.state.homeNumber < 10 ? 12 : 18}]} ></View>
                        <Text style={styles.badgeText}>{this.state.homeNumber}</Text>
                    </View>
                );
            }
        }else{
            if(this.state.htNumber == 0){
                return null;
            }else{
                return(
                    <View>
                        <View style={[styles.badgeColor, {backgroundColor: this.props.focused ? 'red' : 'gray'},{opacity:this.props.focused ? 1.0 : 0.5}, {width: this.state.htNumber < 10 ? 12 : 18}]} ></View>
                        <Text style={styles.badgeText}>{this.state.htNumber}</Text>
                    </View>
                );
            }
        }
    }

    componentWillUnmount(){
        this.subscriptionHome.remove();
        this.subscriptionHt.remove();
    };

    componentDidMount(){
        this.subscriptionHome = DeviceEventEmitter.addListener('homeBadge',(number)=>{
            // alert(number)
            if(number > 99){
                number = 99;
            }
            this.setState({
                homeNumber:number
            })
        });
        this.subscriptionHt = DeviceEventEmitter.addListener('htBadge',(number)=>{
            // alert(number)
            if(number > 99){
                number = 99;
            }
            this.setState({
                htNumber:number
            })
        });
    };


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
        position:'absolute',
        bottom:25,
        left:23,
        borderRadius:5,
        height: 14,
    },
    badgeText: {
        fontSize:12,
        bottom:25,
        left:25,
    }
});