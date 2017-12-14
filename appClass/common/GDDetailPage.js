import React,{Component} from 'react';
import {
    StyleSheet,
    WebView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import ReactPropTypes from 'prop-types';

import GDCommonNavBar from './GDCommonNavBar';

export default class GDDetailPage extends Component{

    static propTypes = {
        url: ReactPropTypes.string,
    };

    renderLeftItem(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Text style={styles.leftNavStyle}>返回</Text>
            </TouchableOpacity>
        );
    }

    render(){
        const { params } = this.props.navigation.state;
        // alert(params.url);
        return(
            <View style={styles.container}>
                <GDCommonNavBar
                    leftItem={() => this.renderLeftItem()}
                />
                <WebView
                    style={styles.webViewStyle}
                    renderError={ (e) => {
                        if (e === 'WebKitErrorDomain') {
                            alert('报错了');
                            return
                        }
                    }}
                    source={{url: params.url, method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    webViewStyle: {
        flex: 1
    },
    leftNavStyle: {
        fontSize: 17,
        color: 'black',
        marginLeft:15,
    },
});