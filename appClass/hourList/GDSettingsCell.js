/**
 * Created by yeshaojian on 2017/4/4.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Switch,
    Platform,
} from 'react-native';

import ReactPropTypes from 'prop-types';

export default class GDSettingsCell extends Component {

    static propTypes = {
        leftTitle:ReactPropTypes.string,
        isShowSwitch:ReactPropTypes.bool,
    };

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isOn:false,
        };
      }

    // 返回需要的组件
    renderRightContent() {
        let component;

        if (this.props.isShowSwitch) {  // 显示 Switch 按钮

            component = <Switch value={this.state.isOn} onValueChange={() => {this.setState({isOn: !this.state.isOn})}} />
        }else {
            component = <Image source={require('../../assest/icon_cell_rightarrow.png')} style={styles.arrowStyle} />
        }

        return(
            component
        )
    }

    render() {
        return(
            <View style={styles.container}>
                {/* 左边 */}
                <View>
                    <Text>{this.props.leftTitle}</Text>
                </View>

                {/* 右边 */}
                <View style={styles.rightViewStyle}>
                    {this.renderRightContent()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        height:Platform.OS === 'ios' ? 44 : 36,
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomColor:'gray',
        borderBottomWidth:0.5,
        marginLeft:15,
    },

    rightViewStyle:{
        marginRight:15,
    },

    arrowStyle: {
        width:10,
        height:10,
    }
});