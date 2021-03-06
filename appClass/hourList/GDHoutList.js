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
import GDSettings from './GDSettings';
import RealmStorage from '../storage/RealmStorage';

const {width, height} = Dimensions.get('window')

export default class GDHoutList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
            isRefreshing: false,
            num: 33,
            prompt:"",
            disNextTouch:false   // 下一小时按钮状态
        };
        this.lasthourhour = '';
        this.lasthourdate = '';
        this.nexthourhour = '';
        this.nexthourdate = '';

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
                    source={{uri:'tabbar_rank_30x30'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                >
                </Image>
            </View>
        ),
    };



// <GDBadge num={99}/>
// {/*<View style={styles.badgeColor} ></View>*/}

    pushSetting(){
        this.props.navigation.navigate('GDSettings');


    }

    getCurDate = ()=>{
        let date = new Date();

        let year = date.getFullYear() + "";
        let month = date.getMonth() + 1;    //注意，java和js中月份从 0 开始
        let day = date.getDate();

        if(month >=1 && month <= 9){
            month = "0" + month;
        }else{
            month += "";
        }

        if(day >=1 && day <= 9){
            day = "0" + day;
        }else{
            day += "";
        }

        // alert(year);
        // alert(month);
        // alert(day);
        let curDate = year + month + day;

        return curDate;
    }


    renderMidItem(){
        return(
            <Image source = {{uri:'navtitle_rank_107x20'}} style={styles.midNavStyle}/>
        );
    }

    renderRightItem(){
        return(
            <TouchableOpacity onPress={() => this.pushSetting()}>
                <Text style={styles.rightNavStyle}>设置</Text>
            </TouchableOpacity>
        );
    }

    fetchData = (date,hour)=>{
        // 初始化参数对象
        let params = {};

        if (date) {     // 时间有值时
            params = {
                "date" : date,
                "hour" : hour
            }
        }

        HTTPBase.post('https://guangdiu.com/api/getranklist.php',params,{})
            .then((responseData) => {

                let disNextTouch = true;

                if (responseData.hasnexthour == 1) {    // hasnexthour为0时 下一小时按钮，不可点击
                    disNextTouch = false;
                }

                console.log(responseData.hasnexthour);
                console.log('this.state.disNextTouch = ',this.state.disNextTouch);

                this.dataSource = [];

                this.setState({
                    dataSource: responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                    prompt:responseData.displaydate + responseData.rankhour + '点档' + '(' + responseData.rankduring + ')',
                    disNextTouch:disNextTouch,    // 更新按钮状态
                })

                this.lasthourhour = responseData.lasthourhour;
                this.lasthourdate = responseData.lasthourdate;
                this.nexthourhour = responseData.nexthourhour;
                this.nexthourdate = responseData.nexthourdate;

                // alert(this.lasthourhour);
                // alert(this.lasthourdate);
            }).catch((error)=>{
            alert(error);
        }).done();
    }

    //根据时间加载数据
    dataFromTime(hour,date){

        let params = {
            "date":date,
            "hour":hour
        };

        HTTPBase.post('https://guangdiu.com/api/getranklist.php',params,{})
            .then((responseData) => {
                this.dataSource = [];

                this.setState({
                    dataSource: responseData.data.slice(0),
                    loaded: true,
                    isRefreshing: false,
                })
            }).catch((error)=>{
            alert(error);
        }).done();
    }


    pressLastHour = ()=>{
        this.fetchData(this.lasthourdate,this.lasthourhour);
        // let hour = this.nowHour - 1;
        //
        // this.dataFromTime(hour,this.getCurDate());
        //
        // this.nowHour = hour;
    }

    pressNextHour = ()=>{
        this.fetchData(this.nexthourdate,this.nexthourhour);
        // let hour = this.nowHour + 1;
        //
        // this.dataFromTime(hour,this.getCurDate());
        //
        // this.nowHour = hour;
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
        let tabH = 44 + 50;
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
                        // onRefresh = {this._refresh}
                        refreshing = {false}
                        ListEmptyComponent = {<GDNoDataView infoText = '加载失败，请重试' style={styles.noData}/>}
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

    render() {
        return (
            <View style = {styles.container} >
                <GDCommonNavBar midItem={()=>this.renderMidItem()}
                                rightItem={()=>this.renderRightItem()}
                />

                {/*头部标题*/}
                <View style={styles.promptStyle}>
                    <Text>{this.state.prompt}</Text>
                </View>

                {
                    this.renderView()
                }

                {/*底部操作按钮*/}
                <View style={styles.operationStyle}>
                    <TouchableOpacity onPress={this.pressLastHour}>
                        <Text style={{marginRight:10,fontSize:17,color:'green'}}>{"< 上一小时"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.pressNextHour}
                        disabled={this.state.disNextTouch}>
                        <Text style={{marginRight:10,fontSize:17,color:this.state.disNextTouch == false ? 'green' : 'gray'}}>{"下一小时 >"}</Text>
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
        top: Platform.OS === 'ios' ? 5 : 0,
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
        height:44,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }
});