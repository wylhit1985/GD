import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Easing,
    Animated,
    Platform,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import GDLaunchPage from './appClass/common/GDLaunchPage';
import GDHalfHourList from './appClass/home/GDHalfHourList';
import GDSearch from './appClass/search/GDSearch';
import GDDetailPage from './appClass/common/GDDetailPage';
import GDUSHalfHourList from './appClass/ht/GDUSHalfHourList';
import GDSettings from './appClass/hourList/GDSettings';
import Main from './appClass/main/Main';
import GDHome from './appClass/home/GDHome';
import GDHt from './appClass/ht/GDHt';
import GDHourList from './appClass/hourList/GDHoutList';
import Share from './appClass/share/Share';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const { scene } = sceneProps;
        const { route } = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});

const TabRouters = TabNavigator(
    {
        GDHome: {
            screen: GDHome,
        },
        GDHt: {
            screen: GDHt,
        },
        GDHourList: {
            screen: GDHourList,
        },
        Share: {
            screen: Share,
        }

    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#000ce9',
            inactiveTintColor: '#AAAAAA',
            labelStyle:{
                fontSize:12,
                bottom:Platform.OS === 'ios' ? 0 : 5,
            },
            style: {
                height: 50,
                backgroundColor: '#F7F7F7',
            },
            showIcon: true,
            indicatorStyle:{
                height:0,
            }
        },
    }
);

export default App = StackNavigator(
    {
        GDLaunchPage:{
            screen: GDLaunchPage,
        },
        TabRouters:{
          screen: TabRouters,
        },
        Main:{
            screen: Main,
        },
        GDHalfHourList:{
            screen: GDHalfHourList,
        },
        GDUSHalfHourList:{
            screen: GDUSHalfHourList,
        },
        GDSearch:{
            screen: GDSearch,
        },
        GDDetailPage:{
            screen: GDDetailPage,
        },
        GDSettings:{
            screen: GDSettings,
        }
    },
    {
        headerMode: 'none',
        transitionConfig: TransitionConfiguration,
        // mode: 'modal',
        // navigationOptions: {
        //     gesturesEnabled: false,
        // },
        // transitionConfig: () => ({
        //     transitionSpec: {
        //         duration: 300,
        //         easing: Easing.out(Easing.poly(4)),
        //         timing: Animated.timing,
        //     },
        //     screenInterpolator: sceneProps => {
        //         const { layout, position, scene } = sceneProps;
        //         const { index } = scene;
        //
        //         const height = layout.initHeight;
        //         const translateY = position.interpolate({
        //             inputRange: [index - 1, index, index + 1],
        //             outputRange: [height, 0, 0],
        //         });
        //
        //         const opacity = position.interpolate({
        //             inputRange: [index - 1, index - 0.99, index],
        //             outputRange: [0, 1, 1],
        //         });
        //
        //         return { opacity, transform: [{ translateY }] };
        //     },
        // }),
    }
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
