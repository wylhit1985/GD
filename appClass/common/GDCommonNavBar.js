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

export default class GDCommonNavBar extends React.Component {

    static propTypes = {
        leftItem: ReactPropTypes.func,
        midItem: ReactPropTypes.func,
        rightItem: ReactPropTypes.func,
    };

    renderLeftItem(){
        if (this.props.leftItem === undefined){
            return;
        }else{
            return this.props.leftItem();
        }
    }
    renderMidItem(){
        if (this.props.midItem === undefined){
            return;
        }else{
            return this.props.midItem();
        }
    }
    renderRightItem(){
        if (this.props.rightItem === undefined){
            return;
        }else{
            return this.props.rightItem();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* 左边 */}
                <View>
                    {this.renderLeftItem()}
                </View>

                {/* 中间 */}
                <View>
                    {this.renderMidItem()}
                </View>

                {/* 右边 */}
                <View>
                    {this.renderRightItem()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:width,
        height: Platform.OS === 'ios' ? 54 : 44,
        backgroundColor: '#fff196',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingTop:15,
    },
    icon: {
        width: 26,
        height: 26,
    },
});