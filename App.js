import React, { Component } from 'react'
import { Text, View, Button, Modal } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ViewPager from '@react-native-community/viewpager';
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
export default class App extends Component {

  constructor(props){
    super(props)
    this.state={visible:true}
  }
  _hide=()=>{
    this.setState({visible:false})
  }
  render() {
    return (
      <NavigationContainer>
        <Modal visible={this.state.visible}>
          <ViewPager style={{flex:1}} initialPage={0}>
            <View key="1">
              <Text>First page</Text>
            </View>
            <View key="2">
              <Text>Second page</Text>
              <Button title="关闭" onPress={this._hide}/>
            </View>
          </ViewPager>
        </Modal>
        <Drawer.Navigator>
          <Drawer.Screen name="Main" component={Main} />
          <Drawer.Screen name="Setting" component={Setting} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

class Main extends React.Component {

  render() {
    return <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Buy" component={Buy} />
      <Tab.Screen name="FAQ" component={Faq} />
    </Tab.Navigator>
  }
}

class Setting extends React.Component {

  render() {
    return <Text>Setting</Text>
  }
}

class Home extends React.Component {

  render() {
    return <Text>Main</Text>
  }
}
class Buy extends React.Component {

  render() {
    return <Stack.Navigator>
      <Stack.Screen name="ItemList" component={ItemList} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
    </Stack.Navigator>
  }
}
class Faq extends React.Component {

  render() {
    return <Text>Faq</Text>
  }
}

class ItemList extends React.Component {
  _showDetail = () => {
    this.props.navigation.navigate("ItemDetail")
  }
  render() {
    return <View>
      <Text>ItemList</Text>
      <Button title="查看详情" onPress={this._showDetail} />
    </View>
  }
}

class ItemDetail extends React.Component {

  render() {
    return <Text>ItemDetail</Text>
  }
}
