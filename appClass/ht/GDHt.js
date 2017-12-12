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
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import GDCommonNavBar from '../common/GDCommonNavBar';
import GDUSHalfHourList from './GDUSHalfHourList';
import GDSearch from '../search/GDSearch';
import GDHotCell from '../common/GDHotCell';
import GDNoDataView from '../common/GDNoDataView';
import HTTPBase from '../http/HTTPBase';
import TabBadge from '../common/TabBadge';
import GDDetailPage from '../common/GDDetailPage';
import GDSiftMenu from '../common/GDSiftMenu';

import HTSiftData from '../data/HTSiftData.json';

const {width, height} = Dimensions.get('window')

export default class GDHt extends React.Component {
    static navigationOptions = {
        tabBarLabel: '海淘',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor,focused }) => (
            <View>
                <Image
                    source={require('../../assest/tabbar_abroad_30x30.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />

                <TabBadge tabType={1} focused={focused}/>
            </View>
        ),
    };
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
            isRefreshing: false,
            isHFModal: false,
            isSiftModal: false,
            uslastID: 0,
            htBadgeNum: 20
        };
    }

    pushToUSHalfHourList(){
        // this.props.navigation.navigate('GDUSHalfHourList');

        this.setState({
            isHFModal: true
        })
    }

    pushSearch(){
        this.props.navigation.navigate('GDSearch');
    }

    renderLeftItem(){
        return(
            <TouchableOpacity onPress={()=>this.pushToUSHalfHourList()}>
                <Image source = {require('../../assest/hot_icon_20x20.png')} style={styles.leftNavStyle}/>
            </TouchableOpacity>
        );
    };

    //显示筛选菜单
    showSiftMenu = () => {
        this.setState({
            isSiftModal: true,
        })
    }

    renderMidItem(){
        return(
            <TouchableOpacity onPress={() => {this.showSiftMenu()}}>
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
        let params = {
            "count" : 10,
            "country" : "us"
        };

        HTTPBase.post('https://guangdiu.com/api/getlist.php',params,{})
            .then((responseData) => {
                // this.dataSource = this.state.dataSource.concat(responseData.data);

                DeviceEventEmitter.emit('htBadge',this.state.htBadgeNum++);

                this.setState({
                    dataSource: responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })

                console.log(this.state.dataSource);

                uslastID = responseData.data[responseData.data.length - 1].id;
                AsyncStorage.setItem("uslastID", uslastID.toString());
                console.log(uslastID);
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


    // 加载筛选数据网络请求
    loadSiftData = (mall, cate) => {

        // 初始化参数对象
        let params = {};

        if (mall === "" && cate === "") {   // 全部
            this.loadData(undefined);
            return;
        }

        if (mall === "") {  // cate 有值
            params = {
                "cate" : cate,
                "country" : "us"
            };
        }else {
            params = {
                "mall" : mall,
                "country" : "us"
            };
        }

        // 筛选请求
        HTTPBase.get('https://guangdiu.com/api/getlist.php', params)
            .then((responseData) => {
                // 重新渲染
                this.setState({
                    dataSource: responseData.data.slice(0),
                    loaded:true,
                });

                // 存储数组中最后一个元素的id
                let cnlastID = responseData.data[responseData.data.length - 1].id;
                AsyncStorage.setItem('cnlastID', cnlastID.toString());

            })
            .catch((error) => {
                // 网络等问题处理
            })
    }

    _loadMore = ()=>{
        //读取id
        AsyncStorage.getItem("uslastID").then((value) =>{

            let params = {
                "count" : 10,
                "country" : "us",
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

                    let uslastID = responseData.data[responseData.data.length - 1].id;
                    AsyncStorage.setItem("uslastID", uslastID.toString());
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
            isHFModal: false,
            isSiftModal: false,
        })
    }

    closeModal(data){
        this.setState({
            isHFModal: data,
            isSiftModal: data,
        })
    }

    render() {
        return (
            <View style = {styles.container} >
                {/*初始化半小时热门*/}
                <Modal
                    animationType = 'slide'
                    transparent= {false}
                    visible= {this.state.isHFModal}
                    onRequestClose={() => this.onRequestClose()}
                >
                    <GDUSHalfHourList removeModal = {(data) => this.closeModal(data)}/>
                </Modal>

                {/*初始化筛选菜单*/}
                <Modal animationType = 'none'
                       transparent= {true}
                       visible= {this.state.isSiftModal}
                       onRequestClose={() => this.onRequestClose()}
                >
                    <GDSiftMenu removeModal={(data) => this.closeModal(data)}
                                data={HTSiftData}
                                loadSiftData={(mall, cate) => this.loadSiftData(mall, cate)} />
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
        backgroundColor: '#e96ddb',
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