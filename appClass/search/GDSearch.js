import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';

import ReactPropTypes from 'prop-types';

import GDCommonNavBar from '../common/GDCommonNavBar';
import GDHotCell from '../common/GDHotCell';

const {width, height} = Dimensions.get('window')

export default class GDSearch extends React.Component {
    static propTypes = {
        name: ReactPropTypes.string,
        ID: ReactPropTypes.number.isRequired,
    };

    static defaultProps = {
        name: '苍老师'
    }

    constructor(props){
        super(props);
        this.state = {dataSource:[]};
        // this.fetchData = this.fetchData.bind(this);
    }

    renderLeftItem(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Text style={styles.leftNavStyle}> 返回 </Text>
            </TouchableOpacity>
        );
    }

    renderMidItem(){
        return(
            <Text style={styles.midNavStyle}> 近半小时热门 </Text>
        );
    }

    fetchData(){
        fetch('http://guangdiu.com/api/gethots.php')
            .then((response) => response.json())
            .then((responseData) => {
                // alert('da');
                console.log("000");
                console.log(this.state.dataSource);
                this.setState({
                    dataSource:responseData.data.slice(0),
                })
                console.log("111");
                console.log(this.state.dataSource);
            }).catch((error)=>{alert(error);}).done();
    }

    _renderItem = (rowData) => {
        console.log("222");

        // var ITEM_HEIGHT = 100;
        // var txt = '第' + item.index + '个' + ' title=' + item.item.title;
        // var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
        // return <Text style={[{flex:1,height:ITEM_HEIGHT,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
        return (
            <GDHotCell
                image={rowData.item.image}
                title={rowData.item.title}/>
        );
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        console.log("render");
        console.log(this.state.dataSource);
        var data = [];
        for (var i = 0; i < 100; i++) {
            data.push({key: i, title: i + ''});
        }
        return (

            <View style={{flex:1}}>
                <View style={{flex:1}}>

                    <GDCommonNavBar
                        leftItem={()=>this.renderLeftItem()}
                        midItem={()=>this.renderMidItem()}
                    />

                    <View style={styles.headerTitleStyle}>
                        <Text>根据每条折扣的点击进行统计，每5分钟更新一次 </Text>
                    </View>

                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor = {(item,index) => item.id}
                        renderItem = {this._renderItem}
                    >
                    </FlatList>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: '#d8e933',
    },
    icon: {
        width: 26,
        height: 26,
    },
    midNavStyle: {
        fontSize: 17,
        color: 'black',
        marginRight: 50
    },
    leftNavStyle: {
        fontSize: 17,
        color: 'black',
        marginLeft:15,
    },
    headerTitleStyle:{
        width: width,
        height: 44,
        backgroundColor: '#e4e6e9',
        justifyContent: 'center',
        alignItems: 'center',
    }
});