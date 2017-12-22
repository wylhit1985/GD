import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

import ReactPropTypes from 'prop-types';

const {width, height} = Dimensions.get('window')

export default class GDHomeCell extends React.Component {
    static propTypes = {
        image:ReactPropTypes.string,
        title:ReactPropTypes.string,
        mall:ReactPropTypes.string,
        pubTime:ReactPropTypes.string,
        fromSite:ReactPropTypes.string,
    };

    renderImage(){
        if(this.props.image === ''){
            var tmp={
                src:{uri:'defaullt_thumb_250x250'},
            };
        }else{
            var tmp={
                src:{uri:this.props.image},
            };
        }
        return tmp.src;
    }


    getDateTime(pubTime,fromSite){

        let minute = 1000*60;
        let hour = minute*60;
        let day = hour*24;
        let week = day*7;
        let month = day*30; //1个月30天

        let now = new Date().getTime();
        let diffValue = now - Date.parse(pubTime.replace(/-/gi,"/"));

        if(diffValue < 0){
            return;
        }

        let monthC = diffValue/month;  //相差了几个月
        let weekC = diffValue/week;    //相差了几周
        let dayC = diffValue/day;      //相差了几天
        let hourC = diffValue/hour;    //相差了几小时
        let minuteC = diffValue/minute;//相差了几分钟

        let result;

        if(monthC >= 1){
            result = parseInt(monthC) + "月前";
        }else if(weekC >= 1){
            result = parseInt(weekC) + "周前";
        }else if(dayC >= 1){
            result = parseInt(dayC) + "天前";
        }else if(hourC >= 1){
            result = parseInt(hourC) + "小时前";
        }else if(minuteC >= 1){
            result = parseInt(minuteC) + "分钟前";
        }else{
            result = "刚刚";
        }

        // alert(fromSite);
        let tmp = result;
        if(fromSite !== ''){
            tmp = result + ' · ' + fromSite;
        }
        return tmp;
    }

    render() {
        return (
            <View style={styles.container}>
                {/*左边图片*/}
                <Image source={this.renderImage()} style={styles.imageStyle}/>

                {/*中间大view*/}
                <View style={styles.centerViewStyle}>
                    {/*3行标题*/}
                    <View>
                        <Text numberOfLines={3} style={styles.titleStyle}>{this.props.title}</Text>
                    </View>
                    {/*底部平台和时间*/}
                    <View style={styles.detailViewStyle}>
                        <Text style={styles.detailMallStyle}>{this.props.mall}</Text>
                        <Text style={styles.detailTimeStyle}>{this.getDateTime(this.props.pubTime,this.props.fromSite)}</Text>
                    </View>
                </View>

                {/*右边箭头*/}
                <Image source={{uri:'icon_cell_rightarrow'}} style={styles.arrowStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 0.5,
        borderBottomColor:'gray',
        width: width,
    },
    imageStyle: {
        width: 70,
        height: 70,
        marginLeft: 15,
    },
    centerViewStyle:{
        height:70,
        justifyContent:'space-around'
    },
    detailViewStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    detailMallStyle:{
        fontSize:12,
        color:'green'
    },
    detailTimeStyle:{
        fontSize:12,
        color:'gray'
    },
    titleStyle:{
        width: width-(15*2+70+16+15*2),//左边距*2 + 图片宽度 + 箭头宽度 + 右边距*2
    },

    arrowStyle: {
        width: 16,
        height: 26,
        marginRight: 15,
    },
});