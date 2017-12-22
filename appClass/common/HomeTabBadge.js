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

export default class HomeTabBadge extends React.Component {
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
        if(this.props.tabType == 0){//首页
            if(this.state.homeNumber == -1){
                return null;
            }else{
                this.state.homeNumber = 99;
                return(
                    <View>
                        <Image
                            style={[styles.icon, {tintColor: 'green'}]}
                            source={{uri:'category_20x20'}}
                        >
                        </Image>
                        <View style={[styles.corner]} ></View>
                        {/*<Text style={styles.badgeText}>{this.state.homeNumber}</Text>*/}
                        {/*<Image source={{uri:'tabbar_abroad_30x30'}} style={styles.badgeImage}/>*/}
                    </View>
                );
            }
        }else{//海淘
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
    corner:{
        backgroundColor:"red",
        width:27,
        height:27,
        position:"absolute",
        right:0,
        top:0,
        borderRadius:10
    },
    icon: {
        top: Platform.OS === 'ios' ? 5 : 0,
        width: 40,
        height: 40,
    },
    badgeColor: {
        position:'absolute',//25,23
        bottom:25,
        left:23,
        borderRadius:5,
        height: 14,
    },
    badgeText: {
        position:'absolute',
        fontSize:12,
        bottom:8,
        left:15,
        color:'red',
    },
    badgeImage: {
        // position:'absolute',
        width:25,
        height:25,
    }
});

// badgeText: {
//     // position:'absolute',
//     fontSize:12,
//         bottom:25,
//         left:25,
//         color:'red',
// },