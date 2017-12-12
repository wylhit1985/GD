import React, {Component} from 'react';
import { StyleSheet,View,Text,Easing,Animated } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import GDHome from './appClass/home/GDHome';
import GDHt from './appClass/ht/GDHt';
import GDHourList from './appClass/hourList/GDHoutList';
import GDHalfHourList from './appClass/home/GDHalfHourList';
import GDSearch from './appClass/search/GDSearch';
import GDLaunchPage from './appClass/common/GDLaunchPage';
import GDDetailPage from './appClass/common/GDDetailPage';
import GDUSHalfHourList from './appClass/ht/GDUSHalfHourList';
import GDSettings from './appClass/hourList/GDSettings';

// import Main from './appClass/MainScreen'
// import profile from './appClass/ProfileScreen'
//
// import TabMain1 from './appClass/tabNav/TabMainScreen'
// import TabProfile1 from './appClass/tabNav/TabProfileScreen'
//
//
// const HomeScreen = ({navigation}) => (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//           onPress={() => navigation.navigate('Details')}
//           title="Go to details"
//       />
//     </View>
// );
//
// const DetailsScreen = ({navigation}) => (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//           onPress={() => navigation.navigate('Home')}
//           title="Go to Home"
//       />
//     </View>
// );
// const App = StackNavigator({
//     Main1: {screen: Main},
//     Profile1: {screen: profile},
//     // Home: {
//     //     screen: HomeScreen,
//     //     navigationOptions: {
//     //         headerTitle: 'Home',
//     //     },
//     // },
//     // Details: {
//     //     screen: DetailsScreen,
//     //     navigationOptions: {
//     //         headerTitle: 'Details',
//     //     },
//     // },
// });

// const App = TabNavigator(
//     {
//     TabMain: {screen: TabMain1},
//     TabProfile: {screen: TabProfile1},
//     },
//     {
//     tabBarPosition: 'bottom',
//     animationEnabled: false,
//         swipeEnabled: false,
//     tabBarOptions: {
//         activeTintColor: '#15c7e9',
//         activeBackgroundColor: '#3a3aaa',
//         style: {
//             backgroundColor: 'red',
//         },
//     },
// });

// const App = DrawerNavigator(
//     {
//     DM11:{screen: DrawerM},
//     DP:{screen:DrawerP},
//         DM12:{screen: DrawerM},
//         DP1:{screen:DrawerP},
//         DM13:{screen: DrawerM},
//         DP3:{screen:DrawerP},
//         DM14:{screen: DrawerM},
//         DP4:{screen:DrawerP},
//         DM15:{screen: DrawerM},
//         DP5:{screen:DrawerP},
//         DM16:{screen: DrawerM},
//         DP6:{screen:DrawerP},
//         DM17:{screen: DrawerM},
//         DP7:{screen:DrawerP},
//     }
//
// );

const tabView = TabNavigator(
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
            activeTintColor: '#e91e63',
        },
    });

const App = StackNavigator(
    {
        GDLaunchPage:{
            screen: GDLaunchPage,
        },
        tabView:{
            screen: tabView,
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

export default App;

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }
//
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
