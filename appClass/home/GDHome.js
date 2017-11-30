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
    Modal,
    AsyncStorage
} from 'react-native';

import GDCommonNavBar from '../common/GDCommonNavBar';
import GDHalfHourList from '../halfHour/GDHalfHourList';
import GDSearch from '../search/GDSearch';
import GDHotCell from '../common/GDHotCell';
import GDNoDataView from '../common/GDNoDataView';
import HTTPBase from '../http/HTTPBase';
import GDDetailPage from '../common/GDDetailPage';

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
            isModal: false,
            lastID: 0,
        };
    }

    pushToHalfHourList(){
        // this.props.navigation.navigate('GDHalfHourList');

        this.setState({
            isModal: true
        })
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

    showID(){
        AsyncStorage.getItem("lastID").then((value) =>{
            alert(value);
        })
    }

    renderMidItem(){
        return(
            <TouchableOpacity onPress={() => {this.showID()}}>
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
        alert('fetchData');
        let params = {"count" : 10};

        HTTPBase.post('https://guangdiu.com/api/getlist.php',params,{})
            .then((responseData) => {
                // this.dataSource = this.state.dataSource.concat(responseData.data);

                this.setState({
                    dataSource: responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })

                console.log(this.state.dataSource);

                lastID = responseData.data[responseData.data.length - 1].id;
                AsyncStorage.setItem("lastID", lastID.toString());
                console.log(lastID);
            }).catch((error)=>{alert(error);}).done();
    }

    _openDetail = (value) => {
        this.props.navigation.navigate('GDDetailPage', {url: 'http://guangdiu.com/go.php' + '?' + 'id=' + value});
    }

    _renderItem = (rowData) => {
        return (
            <TouchableOpacity onPress={() => {
                this._openDetail(rowData.item.id)
            }}>
                <GDHotCell
                    image={rowData.item.image}
                    title={rowData.item.title}
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

    _loadMore = ()=>{
        alert('_loadMore');
        //读取id
        AsyncStorage.getItem("lastID").then((value) =>{

            let params = {
                "count" : 10,
                "sinceid" : value};

            console.log('加载更多');
            console.log(value);

            HTTPBase.post('https://guangdiu.com/api/getlist.php',params,{})
                .then((responseData) => {
                    this.dataSource = this.state.dataSource.concat(responseData.data);
                    this.setState({
                        // dataSource:responseData.data.slice(0),
                        loaded: true,
                        isRefreshing: false,
                    })

                    let lastID = responseData.data[responseData.data.length - 1].id;
                    AsyncStorage.setItem("lastID", lastID.toString());
                    // console.log(responseData.data);
                }).catch((error)=>{alert(error);}).done();
        })
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
                    onEndReachedThreshold={0.2}
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

    onRequestClose(){
        this.setState({
            isModal: false
        })
    }

    closeModal(data){
        this.setState({
            isModal: data
        })
    }

    render() {
        return (
            <View style = {styles.container} >
                <Modal
                    animationType = 'slide'
                    transparent= {false}
                    visible= {this.state.isModal}
                    onRequestClose={() => this.onRequestClose()}
                >
                    <GDHalfHourList removeModal = {(data) => this.closeModal(data)}/>
                </Modal>
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