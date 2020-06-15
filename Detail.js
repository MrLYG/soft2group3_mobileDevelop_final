import React, { Component } from 'react'
import { Text, View, Button, Modal, TextInput, Image, TouchableHighlight, StyleSheet , FlatList} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ViewPager from '@react-native-community/viewpager';
import Setting from './Setting'
import Feather from "react-native-vector-icons/Feather"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Listen from './listen'
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()


class bx extends Component {
    constructor() {
      super()
      this.max = 7
      this.state = { data: [], albums: [], color: 'red', size: '10' }
    }
    componentDidMount() {
      fetch("http://118.25.250.106:3200/personalalbums", { method: 'GET' })
        .then(resp => resp.json())
        .then(albums => {
          // console.log(albums)
          let a = []
          for (let i = 0; i < this.max; i++) {
            a.push(albums[i])
          }
          this.setState({ albums: a })
        })
    }
    _detail(item) {
      let params = item
    //   console.log(item)
      this.props.navigation.navigate('Listen', params)
    }
    _renderItem = ({ item, index }) => {
        // console.log(item)
      return (
        <TouchableHighlight onPress={() => this._detail(item)} underlayColor='white'>
          <View style={{ height: 90, flexDirection: "row", marginTop: 0 }}>
            <Text style={[styles.tex, { color: item.id <= 3 ? this.state.color : '#ccc' }, { fontSize: item.id <= 3 ? 20 : 10 }]}>{index + 1}</Text>
            <View style={{ justifyContent: "flex-start", flexDirection: "row", alignItems: "center", flexGrow: 1 }}>
              <Image style={{ width: 80, height: 80, marginRight: 30, marginTop: 0 }} source={{ uri: item.imagePath }} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', flexGrow: 1 }}>
              <Text style={{ width: 90 }}>{item.name}</Text>
            </View>
  
          </View>
        </TouchableHighlight>
      )
    }
    _ItemSeparatorComponent = () => {
      return (
        <View style={{ height: 1 }}></View>
      )
    }
    _refresh = () => {
      //刷新的是数据
      let d = Math.floor(Math.random() * 100 + 100)
      let data = this.state.data.splice(0)//赋值给data并清空this.state.data中的内容
      data.unshift(d)//arr0.unshift('new1','new2');//插入到数组前面，所有的元素自动后移
      this.setState({ data: data })
    }
    _reachEnd = () => {
      console.log(1111)
      fetch("http://liyuangang.cn:3200/personalalbums", { method: 'GET' })
        .then(resp => resp.json())
        .then(albums => {
          // console.log(albums)
          this.max = this.max + 5
          if (this.max >= albums.length) {
            this.max = albums.length
          }
          let a = []
          for (let i = 0; i < this.max; i++) {
            a.push(albums[i])
          }
          this.setState({ albums: a })
        })
    }
  
    render() {
      return (
        <FlatList
          ListEmptyComponent={<Text>请稍后</Text>}//若flatlist...data数据为空时,则显示
          keyExtractor={(item, index) => index}//给循环的数组下标key
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          //ItemSeparatorComponent 行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。
          data={this.state.albums}
          //从data中挨个取出数据并渲染到列表中。
          renderItem={this._renderItem}
        //   onEndReached={this._reachEnd}//罚值
          onEndReachedThreshold={0.2}
        />
      )
    }
  }
  function App() {
    return (
      <Stack.Navigator initialRouteName="bx">
        {/* initialRouteName 设置主页 第一个页面 */}
        <Stack.Screen name="bx" component={bx} options={{ title: '许嵩' }} />
        <Stack.Screen name="Listen" component={Listen} options={{ title: 'Listen' }} />
      </Stack.Navigator>
    );
  }
  export default App
  const styles = StyleSheet.create({
    container: { color: 'red' }, content: { color: 'green' },
    button: { backgroundColor: '#5C9DE5', width: 50, height: 30, borderRadius: 5, textAlign: "center", textAlignVertical: 'center' },
    con: { color: 'yellow' },
    tex: { marginLeft: 5, marginRight: 5, marginTop: 0 }
  })