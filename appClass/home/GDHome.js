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
    DeviceEventEmitter,
    Platform
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

// let cnbadgeNum = 0;
// let usbadgeNum = 0;

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
                    style={[styles.icon, {tintColor: tintColor}]}
                    source={{uri:'tabbar_home_30x30'}}
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

    pushSearch= () => {
        this.props.navigation.navigate('GDSearch');
    }

    renderLeftItem(){
        return(
            <TouchableOpacity onPress={()=>this.pushToHalfHourList()}>
                <Image source = {{uri:'hot_icon_20x20'}} style={styles.leftNavStyle}/>
            </TouchableOpacity>
        );
    };

    //显示筛选菜单
    showSiftMenu = ()=>{
        this.setState({
            isSiftModal: true,
        })
    }

    renderMidItem(){
        return(
            <TouchableOpacity onPress={() => {this.showSiftMenu()}}>
                <Image source = {{uri:'navtitle_home_down_66x20'}} style={styles.midNavStyle}/>
            </TouchableOpacity>
        );
    }

    renderRightItem(){
        return(
            <TouchableOpacity onPress={() => this.pushSearch()}>
                <Image source = {{uri:'search_icon_20x20'}} style={styles.rightNavStyle}/>
            </TouchableOpacity>
        );
    }

    fetchData = ()=>{
        let params = {"count" : 10};


        HTTPBase.post('https://guangdiu.com/api/getlist.php',params,{})
            .then((responseData) => {

                // DeviceEventEmitter.emit('homeBadge',this.state.homeBadgeNum--);
                this.state.dataSource = [];

                this.setState({
                    dataSource: responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })

                console.log(this.state.dataSource);

                cnlastID = responseData.data[responseData.data.length - 1].id;
                AsyncStorage.setItem("cnlastID", cnlastID.toString());
                console.log(cnlastID);

                // 存储数组中第一个元素的id
                let cnfirstID = responseData.data[0].id;
                AsyncStorage.setItem('cnfirstID', cnfirstID.toString());

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

    // 获取最新数据个数网络请求
    loadDataNumber() {
        // 取出id
        AsyncStorage.multiGet(['cnfirstID', 'usfirstID'], (error, stores) => {
            // 拼接参数
            let params = {
                "cnmaxid" : stores[0][1],
                "usmaxid" : stores[1][1],
            };

            // 请求数据
            HTTPBase.get('http://guangdiu.com/api/getnewitemcount.php', params)
                .then((responseData) => {
                    DeviceEventEmitter.emit('homeBadge',parseInt(responseData.cn));
                    DeviceEventEmitter.emit('htBadge',parseInt(responseData.us));

                    // this.setState({
                    //     cnbadgeNum: parseInt(responseData.cn),
                    //     usbadgeNum: parseInt(responseData.us)
                    // })
                })
                .catch((error) => {

                })
        });
    }
    // 获取最新数据个数网络请求
    refreshRedNumber() {
        // 取出id
        AsyncStorage.multiGet(['cnfirstID', 'usfirstID'], (error, stores) => {
            // 拼接参数
            let params = {
                "cnmaxid" : 5,//stores[0][1],
                "usmaxid" : stores[1][1],
            };

            // 请求数据
            HTTPBase.get('http://guangdiu.com/api/getnewitemcount.php', params)
                .then((responseData) => {
                    DeviceEventEmitter.emit('homeBadge',parseInt(responseData.cn));

                    // this.setState({
                    //     cnbadgeNum: parseInt(responseData.cn),
                    //     usbadgeNum: parseInt(responseData.us)
                    // })
                })
                .catch((error) => {

                })
        });
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


        this.timerNum = setTimeout(
            ()=>{
                this.refreshRedNumber();
            },
            1000,
        );
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
                    this.state.dataSource = this.state.dataSource.concat(responseData.data);
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
            0,
        );

        this.refreshRedNumber();

        // 最新数据的个数
        setInterval(() => {
            this.loadDataNumber();
        }, 1000*30);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.timerNum && clearTimeout(this.timerNum);
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
        backgroundColor: '#1e1de9',
    },
    icon: {
        top: Platform.OS === 'ios' ? 5 : 0,
        width: 26,
        height: 26,
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