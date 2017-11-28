import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class GDNoDataView extends Component{
    static defaultProps={
        infoText:'加载中'
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>{this.props.infoText} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    textStyle:{
        fontSize: 21,
        color: 'gray',
    }
})