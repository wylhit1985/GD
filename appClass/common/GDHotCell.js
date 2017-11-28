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

export default class GDHotCell extends React.Component {
    static propTypes = {
        image:ReactPropTypes.string,
        title:ReactPropTypes.string,
    };

    renderImage(){
        if(this.props.image === ''){
            var tmp={
                src:require('../../assest/defaullt_thumb_250x250.png'),
            };
            // return(
            //    <Image source={require('../../assest/defaullt_thumb_250x250.png')} style={styles.imageStyle}/>
            // );
        }else{
            var tmp={
                src:{uri:this.props.image},
            };
            // return(
            //     <Image source={{uri:this.props.image}} style={styles.imageStyle}/>
            // );
        }
        return tmp.src;
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={this.renderImage()} style={styles.imageStyle}/>
                <View>
                    <Text numberOfLines={3} style={styles.titleStyle}>{this.props.title}</Text>
                </View>
                <Image source={require('../../assest/icon_cell_rightarrow.png')} style={styles.arrowStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 0.5,
        borderBottomColor:'gray',
        width: width,
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