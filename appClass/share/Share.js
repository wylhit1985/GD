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

import ShareUtil from './ShareUtil';
import ColorUtil from '../common/ColorUtil';

const {width, height} = Dimensions.get('window')

export default class Share extends React.Component {
    static navigationOptions = {
        tabBarLabel: '分享',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor,focused }) => (
            <View>
                <Image
                    source={{uri:'icontravel_40x40'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            </View>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {result: "结果"};
    }
    sinashare = () => {
        // alert('ok');
        ShareUtil.share('sssss','http://dev.umeng.com/images/tab2_1.png','http://www.umeng.com/','title',1,(code,message) =>{
            this.setState({result:message});
        });
    }
    qqshare = () => {
        ShareUtil.share('sssss','http://dev.umeng.com/images/tab2_1.png','http://www.umeng.com/','title',0,(code,message) =>{
            this.setState({result:message});

        });
    }
    wxshare = () => {
        ShareUtil.share('sssss','http://dev.umeng.com/images/tab2_1.png','http://www.umeng.com/','title',2,(code,message) =>{
            this.setState({result:message});

        });
    }
    shareboard = () => {
        var list = [0,1,2]
        ShareUtil.shareboard('sssss','http://dev.umeng.com/images/tab2_1.png','http://www.umeng.com/','title',list,(code,message) =>{
            this.setState({result:message});

        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>{this.state.result}</Text>
                <TouchableOpacity
                    style={styles.touchItem}
                    onPress={this.sinashare}
                >
                    <Text style={styles.text}>{'新浪分享'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchItem}
                    onPress={this.wxshare}
                >
                    <Text style={styles.text}>{'微信分享'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.touchItem}
                    onPress={this.qqshare}
                >
                    <Text style={styles.text}>{'QQ分享'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchItem}
                    onPress={this.shareboard}
                >
                    <Text style={styles.text}>{'分享面板'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: ColorUtil.background,
    },
    icon: {
        top: Platform.OS === 'ios' ? 5 : 0,
        width: 26,
        height: 26,
    },
    touchItem: {
        margin: 10,
        backgroundColor: ColorUtil.default_primary_color,
        elevation: 10,
        borderColor: ColorUtil.default_primary_color,
        borderRadius: 15,
        borderWidth: 1.5,
        shadowOffset: {width: 0, height: 0},
        shadowColor: ColorUtil.default_primary_color,
        shadowOpacity: 1,
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize:26,
        color: ColorUtil.text_primary_color
    },
});