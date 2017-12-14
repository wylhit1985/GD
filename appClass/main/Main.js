
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    Image,
    Platform,
    DeviceEventEmitter,
    AsyncStorage,
} from 'react-native';

import TabRouters from './TabRouters';
import GDHome from '../home/GDHome';

export default class Main extends Component {

    // ES6
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            cnbadgeText:'',         // 首页Item角标文本
            usbadgeText:''          // 海淘Item角标文本
        };
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
                    this.setState({
                        cnbadgeText:responseData.cn,
                        usbadgeText:responseData.us
                    })
                })
                .catch((error) => {

                })
        });
    }

    // 组件加载完成
    componentDidMount() {
        // 最新数据的个数
        setInterval(() => {
            // this.loadDataNumber();
        }, 1000);

    }

    // 组件即将销毁
    componentWillUnmount() {

    }

    componentWillMount() {
        this.props.navigation.navigate('GDHome');
    }

    render() {
        return null;
    }
}

{/*<View style={styles.container}>*/}
{/*<TabRouters/>*/}
{/*</View>*/}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#1be6ff',
        // top:-64,
    }
});