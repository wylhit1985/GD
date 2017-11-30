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

import GDCommonNavBar from '../common/GDCommonNavBar';
import GDHotCell from '../common/GDHotCell';
import GDNoDataView from '../common/GDNoDataView';
import HTTPBase from '../http/HTTPBase';

const {width, height} = Dimensions.get('window')

export default class GDHalfHourList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
            isRefreshing: false,
        };
    }

    static defaultProps = {
        removeModal: {}
    }

    renderMidItem(){
        return(
            <Text style={styles.midNavStyle}> 近半小时热门 </Text>
        );
    }

    renderRightItem(){
        //()=>this.props.navigation.goBack()
        return(
            <TouchableOpacity onPress={() => {this.props.removeModal(false)}}>
                <Text style={styles.rightNavStyle}> 关闭 </Text>
            </TouchableOpacity>
        );
    }

    fetchData = ()=>{

        HTTPBase.get('http://guangdiu.com/api/gethots.php')
            .then((responseData) => {
                this.setState({
                    dataSource:responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })
            });

        // fetch('http://guangdiu.com/api/gethots.php')
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //         this.setState({
        //             dataSource:responseData.data.slice(0),
        //             loaded: true,
        //             isRefreshing: false,
        //         })
        //     }).catch((error)=>{alert(error);}).done();
    }

    _renderHeader(){
        return(
            <View style={styles.headerTitleStyle}>
                <Text>根据每条折扣的点击进行统计，每5分钟更新一次 </Text>
            </View>
        );
    }

    _renderItem = (rowData) => {
        return (
            <GDHotCell
                image={rowData.item.image}
                title={rowData.item.title}/>
        );
    }

    _refresh = ()=>{
        // this.setState({
        //     isRefreshing: true,
        // });
        this.fetchData();
    }

    _loadMore = ()=>{
        this.fetchData();
        // alert('_onload');
    }

    renderView(){
        if(this.state.loaded === false){
            return(
                <GDNoDataView infoText = '请稍等...'/>
            );
        }else{
            return(
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor = {(item,index) => item.id}
                    renderItem = {this._renderItem}
                    ListHeaderComponent = {this._renderHeader}
                    onRefresh = {this._refresh}
                    refreshing = {false}
                    ListEmptyComponent = {<GDNoDataView infoText = '加载失败，请重试' style={styles.noData}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._loadMore}
                >
                </FlatList>
            );
        }
    }

    componentDidMount() {
        this.timer = setTimeout(
            ()=>{
                this.fetchData();
                },
            1000,
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
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
                <GDCommonNavBar
                    midItem={()=>this.renderMidItem()}
                    rightItem={()=>this.renderRightItem()}
                />
                {
                    this.renderView()
                }
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
        marginLeft: 60
    },
    rightNavStyle: {
        fontSize: 17,
        color: 'black',
        marginRight:15,
    },
    headerTitleStyle:{
        width: width,
        height: 44,
        backgroundColor: '#e4e6e9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noData:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});