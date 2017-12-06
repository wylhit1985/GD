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
    Platform,
} from 'react-native';

import ReactPropTypes from 'prop-types';

import GDCommonNavBar from '../common/GDCommonNavBar';
import GDSearch from '../search/GDSearch';
import GDHomeCell from '../common/GDHomeCell';
import GDNoDataView from '../common/GDNoDataView';
import GDDetailPage from '../common/GDDetailPage';
import GDBadge from '../common/GDBadge';
import RealmStorage from '../storage/RealmStorage';

const {width, height} = Dimensions.get('window')

export default class GDHoutList extends React.Component {
    _renderBadge = ()=>{
        return(
            <GDBadge num={this.state.badgeNum}/>
        );
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
            isRefreshing: false,
            num: 33
        };
    }

    static propTypes = {
        badgeNum:ReactPropTypes.number
    };
    static defaultProps = {
        badgeNum:10
    }
    static navigationOptions = {
        tabBarLabel: '小时风云榜',
        tabBarIcon: ({ tintColor }) => (
            <View>
                <Image
                    source={require('../../assest/tabbar_rank_30x30.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                >
                </Image>
                <Text style={[styles.badgeText, {color: tintColor}]}>23</Text>
            </View>
        ),
    };



// <GDBadge num={99}/>
// {/*<View style={styles.badgeColor} ></View>*/}

    pushSetting(){
        // this.props.navigation.navigate('GDSearch');
    }

    renderMidItem(){
        return(
            <Image source = {require('../../assest/navtitle_rank_107x20.png')} style={styles.midNavStyle}/>
        );
    }

    renderRightItem(){
        return(
            <TouchableOpacity onPress={() => this.pushSetting()}>
                <Text style={styles.rightNavStyle}>设置</Text>
            </TouchableOpacity>
        );
    }

    fetchData = ()=>{
        alert('fetchData');
        let params = {};

        HTTPBase.post('https://guangdiu.com/api/getranklist.php',params,{})
            .then((responseData) => {
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
            this.dataSource = RealmStorage.loadAll('HomeData');

            this.setState({
                dataSource: responseData.data.slice(0),
                loaded: true,
                isRefreshing: false,
            })

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
        alert('_refresh');
        this.fetchData();
    }

    getListHeight(){
        let top = Platform.OS === 'ios' ? 54 : 44;
        let title = 44;
        let bottom = 44;
        let tabH = 34;
        let h = height - top - title - bottom - tabH;
        return h;
    }

    renderView(){
        if(this.state.loaded === false){
            return(
                <GDNoDataView infoText = '请稍等...'/>
            );
        }else{
            return(
                <View style={{height:this.getListHeight()}}>
                    <FlatList
                        data={this.state.dataSource}
                        keyExtractor = {(item,index) => item.id}
                        renderItem = {this._renderItem}
                        onRefresh = {this._refresh}
                        refreshing = {false}
                        ListEmptyComponent = {<GDNoDataView infoText = '加载失败，请重试' style={styles.noData}/>}
                    >
                    </FlatList>
                    {
                        this._renderBadge()
                    }
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

    render() {
        return (
            <View style = {styles.container} >
                <GDCommonNavBar midItem={()=>this.renderMidItem()}
                                rightItem={()=>this.renderRightItem()}
                />

                {/*头部标题*/}
                <View style={styles.promptStyle}>
                    <Text>提示栏</Text>
                </View>

                {
                    this.renderView()
                }

                {/*底部操作按钮*/}
                <View style={styles.operationStyle}>
                    <TouchableOpacity>
                        <Text style={{marginRight:10,fontSize:17,color:'green'}}>{"< 上一小时"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={{marginRight:10,fontSize:17,color:'green'}}>{"下一小时 >"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    icon: {
        top:5,
        width: 26,
        height: 26,
    },
    midNavStyle: {
        width: 107,
        height: 20,
        marginLeft:50,
    },
    rightNavStyle: {
        fontSize:17,
        color:'green',
        marginRight:15,
    },
    promptStyle:{
        width:width,
        height:44,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#e4e6e9',
    },
    operationStyle:{
        width:width,
        // height:44,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }
});