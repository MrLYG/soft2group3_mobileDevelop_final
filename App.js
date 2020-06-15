import React, { Component } from 'react'
import { Text, View, Button, Modal , Image , StyleSheet, TouchableHighlight} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ViewPager from '@react-native-community/viewpager';
import Setting from './Setting'
import Home from './Home'
import Album from './album'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Feather from "react-native-vector-icons/Feather"
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = { visible: true }
  }
  _hide = () => {
    this.setState({ visible: false })
  }
  render() {
    return (
      <NavigationContainer>
        <Modal visible={this.state.visible}>
          <ViewPager style={{ flex: 1 }} initialPage={0}>
            <View key="1">
              <Image style={{ width: '100%', height: "100%" }} source={{ uri: 'http://118.25.250.106/picture/huantingpic.jpg' }}></Image>
            </View>
            <View key="2" style={{ flexDirection: "row" }}>
              <Image style={{ width: '95%', height: "100%" }} source={{ uri: 'http://118.25.250.106/picture/ruguodangshipic.jpg' }}></Image>
              <Button title=" " onPress={this._hide} />
            </View>
          </ViewPager>
        </Modal>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'Album') {
                iconName = focused ? 'list' : 'list';
              } else if (route.name === 'Setting') {
                iconName = focused ? 'user' : 'user';
              }

              // You can return any component that you like here!
              return <Feather name={iconName} size={20} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}

        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Album" component={Album} />
          <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}


class Faq extends React.Component {

  render() {
    return <Text>Faq</Text>
  }
}

