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
import GDHalfHourList from '../halfHour/GDHalfHourList';
import GDSearch from '../search/GDSearch';
import GDHotCell from '../common/GDHotCell';
import GDNoDataView from '../common/GDNoDataView';
import HTTPBase from '../http/HTTPBase';

const {width, height} = Dimensions.get('window')

export default class GDHome extends React.Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../assest/tabbar_home_30x30.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
            isRefreshing: false,
        };
    }

    pushToHalfHourList(){
        this.props.navigation.navigate('GDHalfHourList');
    }

    pushSearch(){
        this.props.navigation.navigate('GDSearch');
    }

    renderLeftItem(){
        return(
            <TouchableOpacity onPress={()=>this.pushToHalfHourList()}>
                <Image source = {require('../../assest/hot_icon_20x20.png')} style={styles.leftNavStyle}/>
            </TouchableOpacity>
        );
    };

    renderMidItem(){
        return(
            <TouchableOpacity>
                <Image source = {require('../../assest/navtitle_home_down_66x20.png')} style={styles.midNavStyle}/>
            </TouchableOpacity>
        );
    }

    renderRightItem(){
        return(
            <TouchableOpacity onPress={() => this.pushSearch()}>
                <Image source = {require('../../assest/search_icon_20x20.png')} style={styles.rightNavStyle}/>
            </TouchableOpacity>
        );
    }

    fetchData = ()=>{
        let params = {"count" : 25};

        HTTPBase.post('http://guangdiu.com/api/getlist.php',params,{})
            .then((responseData) => {
                this.setState({
                    dataSource:responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })
            }).catch((error)=>{alert(error);}).done();


        // let formData = new FormData();
        // formData.append("count",30);
        // formData.append("mall","京东商城")
        //
        // fetch('http://guangdiu.com/api/getlist.php',{
        //     method: 'POST',
        //     header: {},
        //     body: formData,
        // })
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //         this.setState({
        //             dataSource:responseData.data.slice(0),
        //             loaded: true,
        //             isRefreshing: false,
        //         })
        //     }).catch((error)=>{alert(error);}).done();
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
        // this.fetchData();
        alert('_loadMore');
        fetch('http://guangdiu.com/api/gethots.php')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource:responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })
            }).catch((error)=>{alert(error);}).done();
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
                    onEndReachedThreshold={0.1}
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
        return (
            <View style = {styles.container} >
                <GDCommonNavBar leftItem={()=>this.renderLeftItem()}
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
        alignItems: 'center',
        backgroundColor: '#95e9de',
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