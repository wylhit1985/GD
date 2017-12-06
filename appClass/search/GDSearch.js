import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    TextInput,
    AsyncStorage,
} from 'react-native';

import ReactPropTypes from 'prop-types';

import GDCommonNavBar from '../common/GDCommonNavBar';
import GDHomeCell from '../common/GDHomeCell';
import GDDetailPage from '../common/GDDetailPage';
import GDNoDataView from '../common/GDNoDataView';

const {width, height} = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard');     // 获取键盘回收方法

export default class GDSearch extends React.Component {
    static propTypes = {
        name: ReactPropTypes.string,
    };

    static defaultProps = {
        name: '苍老师'
    }

    constructor(props){
        super(props);
        this.state = {dataSource:[]};
        this.changeText = '';
    }

    pressCancel = ()=>{
        dismissKeyboard();
        this.props.navigation.goBack();
    }

    renderLeftItem(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={require('../../assest/back.png')} style={styles.leftNavStyle} />
                    <Text>返回</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderMidItem(){
        return(
            <Text style={styles.midNavStyle}> 搜索全网折扣 </Text>
        );
    }

    fetchData(){
        if(!this.changeText){
            return;
        }

        let params = {
            "q":this.changeText
        }
        HTTPBase.post('https://guangdiu.com/api/getresult.php',params,{})
            .then((responseData) => {
                this.state.dataSource = [];

                this.setState({
                    dataSource: responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })

                console.log(this.state.dataSource);

                if(this.state.dataSource.length > 0){
                    //最后一个商品id
                    alert('最后一个商品id');
                    let searchLastID = responseData.data[responseData.data.length - 1].id;
                    AsyncStorage.setItem("searchLastID",searchLastID.toString());
                }
            }).catch((error)=>{
            alert(error);

        }).done();
    }
    _loadMore = ()=>{
        if(!this.changeText){
            return;
        }
        alert('_loadMore');
        //读取id
        AsyncStorage.getItem('searchLastID')
            .then((value) => {
            let params = {
                "q" : this.changeText,
                "sinceid" : value};

            console.log('加载更多');
            console.log(value);

            HTTPBase.post('https://guangdiu.com/api/getresult.php',params,{})
                .then((responseData) => {
                    this.state.dataSource = this.state.dataSource.concat(responseData.data);
                    this.setState({
                        // dataSource:responseData.data.slice(0),
                        loaded: true,
                        isRefreshing: false,
                    })

                    if(this.state.dataSource.length > 0){
                        //最后一个商品id
                        alert('最后一个商品id');
                        let searchLastID = responseData.data[responseData.data.length - 1].id;
                        AsyncStorage.setItem("searchLastID",searchLastID.toString());
                    }
                }).catch((error)=>{alert(error);}).done();
            })
    }
    _openDetail = (value) => {
        this.props.navigation.navigate('GDDetailPage', {url: 'http://guangdiu.com/go.php' + '?' + 'id=' + value});
    }
    _renderItem = (rowData) => {
        console.log("222");

        // var ITEM_HEIGHT = 100;
        // var txt = '第' + item.index + '个' + ' title=' + item.item.title;
        // var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
        // return <Text style={[{flex:1,height:ITEM_HEIGHT,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
        return (
            <TouchableOpacity onPress={() => {
                this._openDetail(rowData.item.id)
            }}>
                <GDHomeCell
                    image={rowData.item.image}
                    title={rowData.item.title}
                    mall={rowData.item.mall}
                    pubTime={rowData.item.pubtime}
                    fromSite={rowData.item.fromsite}
                />
            </TouchableOpacity>

        );
    }

    _refresh = ()=>{
        // this.setState({
        //     isRefreshing: true,
        // });
        alert('_refresh');
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

                    {/*输入框*/}
                    <View style={styles.toolsViewStyle}>
                        {/*左边输入框*/}
                        <View style={styles.inputViewStyle}>
                            <Image source={require('../../assest/search_icon_20x20.png')} style={styles.searchImageStyle}/>
                            <TextInput
                                style={styles.textInputStyle}
                                keyboardType="default"
                                placeholder="请输入商品关键字"
                                placeholderTextColor='gray'
                                autoFocus={true}
                                clearButtonMode="while-editing"
                                onChangeText={(text)=>{this.changeText = text}}
                                onEndEditing={()=>this.fetchData()}
                            />
                        </View>

                        {/*右边取消按钮*/}
                        <View style={{marginRight:11}}>
                            <TouchableOpacity onPress={this.pressCancel}>
                                <Text style={{color:'green'}}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor = {(item,index) => item.id}
                        renderItem = {this._renderItem}
                        onRefresh = {this._refresh}
                        refreshing = {false}
                        ListEmptyComponent = {<GDNoDataView infoText = '无数据' style={styles.noData}/>}
                        onEndReachedThreshold={0.2}
                        onEndReached={this._loadMore}
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
    toolsViewStyle:{
        width:width,
        height:44,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    inputViewStyle:{
        height:35,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(239,239,241,1.0)',
        marginLeft:8,
        borderRadius:5,
    },
    searchImageStyle:{
        width:15,
        height:15,
        marginLeft:8,
    },
    textInputStyle:{
        width:width*0.75,
        height:35,
        marginLeft:8,
    },
    midNavStyle: {
        fontSize: 17,
        color: 'black',
        marginRight: 50
    },
    leftNavStyle: {
        width:20,
        height:20,
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