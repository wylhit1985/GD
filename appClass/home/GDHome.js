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

import ReactPropTypes from 'prop-types';

import GDCommonNavBar from '../common/GDCommonNavBar';
import GDHalfHourList from './GDHalfHourList';
import GDSearch from '../search/GDSearch';
import GDHomeCell from '../common/GDHomeCell';
import GDNoDataView from '../common/GDNoDataView';
import GDDetailPage from '../common/GDDetailPage';
import GDBadge from '../common/GDBadge';
import TabBadge from '../common/TabBadge';
import RealmStorage from '../storage/RealmStorage';
import GDSiftMenu from '../common/GDSiftMenu';

import HomeSiftData from '../data/HomeSiftData.json';

const {width, height} = Dimensions.get('window')


export default class GDHome extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
            isRefreshing: false,
            isModal: false,
            isSiftModal: false,
            cnlastID: 0,
            homeBadgeNum: 100
        };
    }

    static propTypes = {
        badgeNum:ReactPropTypes.number
    };
    static defaultProps = {
        badgeNum:10
    }
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({ tintColor,focused }) => (

            <View>
                <Image
                    source={{uri:'tabbar_home_30x30'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                >
                </Image>
                <TabBadge tabType={0} focused={focused}/>
            </View>

        ),
    };



// <GDBadge num={99}/>
// {/*<View style={styles.badgeColor} ></View>*/}


    pushToHalfHourList(){
        this.props.navigation.navigate('GDHalfHourList');

        // this.setState({
        //     isModal: true
        // })
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
        AsyncStorage.getItem("cnlastID").then((value) =>{
            alert(value);
        })
    }
    //显示筛选菜单
    showSiftMenu = ()=>{
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
        let params = {"count" : 10};


        HTTPBase.post('https://guangdiu.com/api/getlist.php',params,{})
            .then((responseData) => {

                DeviceEventEmitter.emit('homeBadge',this.state.homeBadgeNum--);
                this.dataSource = [];

                this.setState({
                    dataSource: responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })

                console.log(this.state.dataSource);

                cnlastID = responseData.data[responseData.data.length - 1].id;
                AsyncStorage.setItem("cnlastID", cnlastID.toString());
                console.log(cnlastID);

                RealmStorage.create('HomeData',responseData.date = {});
            }).catch((error)=>{
            // alert(error);
            // this.dataSource = RealmStorage.loadAll('HomeData');
            //
            // this.setState({
            //     dataSource: responseData.data.slice(0),
            //     loaded: true,
            //     isRefreshing: false,
            // })

        }).done();
    }

    _openDetail = (value) => {
        this.props.navigation.navigate('GDDetailPage', {url: 'http://guangdiu.com/go.php' + '?' + 'id=' + value});
    }

    _renderItem = (rowData) => {
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
        // alert('_refresh');
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
                "cate" : cate
            };
        }else {
            params = {
                "mall" : mall
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
        AsyncStorage.getItem("cnlastID").then((value) =>{

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

                    let cnlastID = responseData.data[responseData.data.length - 1].id;
                    AsyncStorage.setItem("cnlastID", cnlastID.toString());
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
                <View>
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor = {(item,index) => item.id}
                    renderItem = {this._renderItem}
                    onRefresh = {this._refresh}
                    refreshing = {false}
                    ListEmptyComponent = {<GDNoDataView infoText = '加载失败，请重试' style={styles.noData}/>}
                    onEndReachedThreshold={0.2}
                    onEndReached={this._loadMore}
                >
                </FlatList>
                </View>
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
            isModal: false,
            isSiftModal: false,
        })
    }

    closeModal(data){
        this.setState({
            isModal: data,
            isSiftModal: data,
        })
    }

    render() {
        return (
            <View style = {styles.container} >
                {/*初始化近半小时热门*/}
                {/*<Modal*/}
                    {/*animationType = 'slide'*/}
                    {/*transparent= {false}*/}
                    {/*visible= {this.state.isModal}*/}
                    {/*onRequestClose={() => this.onRequestClose()}*/}
                {/*>*/}
                    {/*<GDHalfHourList removeModal = {(data) => this.closeModal(data)}/>*/}
                {/*</Modal>*/}

                {/*初始化筛选菜单*/}
                <Modal animationType = 'none'
                       transparent= {true}
                       visible= {this.state.isSiftModal}
                       onRequestClose={() => this.onRequestClose()}
                >
                    <GDSiftMenu removeModal={(data) => this.closeModal(data)}
                                data={HomeSiftData}
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
        backgroundColor: '#95e9de',
    },
    icon: {
        top:5,
        width: 26,
        height: 26,
    },
    icon2: {
        position:'absolute',
        top:5,
        width: 9,
        height: 9,
    },
    badgeStyle: {
        // position:'absolute',
        // top:2,
        // left:20
    },
    badgeColor: {
        position:'absolute',
        top:2,
        left:20,
        backgroundColor: '#2489e9',
        borderRadius:3,
        width: 15,
        height: 13,
    },
    badgeText: {
        position:'absolute',
        top:0,
        left:20,
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