import React, {Component} from 'react';
import { StyleSheet,View,Text,Easing,Animated } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import GDHome from '../home/GDHome';
import GDHt from '../ht/GDHt';
import GDHourList from '../hourList/GDHoutList';


export default TabRouters = TabNavigator(
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
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#000ce9',
        },
    }
);