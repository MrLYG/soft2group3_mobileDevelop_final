import React, { Component } from 'react'
import { Text, View, Button, Modal, TextInput, Image, TouchableHighlight, StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ViewPager from '@react-native-community/viewpager';
import Setting from './Setting'
import Feather from "react-native-vector-icons/Feather"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Detail from './Detail'
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function al() {
    return (
        <Stack.Navigator initialRouteName="Home">
            {/* initialRouteName 设置主页 第一个页面 */}
            <Stack.Screen name="Home" component={Home} options={{ title: 'music' }} />
            <Stack.Screen name="Detail" component={Detail} options={{ title: '专辑' }} />
            {/* <Stack.Screen name="List" component={List} options={{ title: '专辑' }} /> */}
        </Stack.Navigator>
    );
}
export default al

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            albums: ''
        }
    }

    componentDidMount() {
        fetch("http://liyuangang.cn:3200/personalalbums", { method: 'GET' })
            .then(resp => resp.json())
            .then(albums => {
                // console.log(albums)
                this.setState({ albums: albums })
            })
    }
    _detail(){
        let params = this.state.albums
        this.props.navigation.navigate('Detail',params)
    }
    render() {
        return (
            <View style={{ height: 550 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, margin: 15 }}>音乐馆</Text>
                    <TextInput style={{ borderWidth: 1, height: 25, borderColor: '#ccc', marginTop: 18, borderRadius: 18, width: '65%', marginLeft: 10 }}></TextInput>
                </View>
                <View style={{ height: 120, backgroundColor: '#ccc', margin: 15, borderRadius: 15, marginTop: 0, marginBottom: 0 }}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 6 }} source={{ uri: 'http://liyuangang.cn/picture/duanqiaocanxuepic.jpg' }}></Image>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View>
                        <Feather style={{ marginBottom: 10, marginLeft: 10, marginTop: 20 }} name="user" size={30} color="#11D99A" />
                        <Text style={{ marginLeft: 11 }}>歌手</Text>
                    </View>
                    <View>

                    {/* <TouchableHighlight onPress={() => alert(1)} underlayColor='white'> */}
                        <Feather style={{ marginBottom: 10, marginLeft: 10, marginTop: 20 }} name="bar-chart" size={30} color="#11D99A" />
                        <Text style={{ marginLeft: 11 }}>排行</Text>
                    {/* </TouchableHighlight> */}

                        
                    </View>
                    <View>
                        <Feather style={{ marginBottom: 10, marginLeft: 10, marginTop: 20 }} name="feather" size={30} color="#11D99A" />
                        <Text style={{ marginLeft: 11 }}>分类</Text>
                    </View>
                    <View>
                        <Feather style={{ marginBottom: 10, marginLeft: 10, marginTop: 20 }} name="headphones" size={30} color="#11D99A" />
                        <Text style={{ marginLeft: 11 }}>音乐</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{ margin: 15, marginTop: 30 }}>专辑</Text>
                    <Text style={{ margin: 15, color: '#ccc', marginTop: 30 }}>更多></Text>
                </View>
                <View style={{ height:100, flexDirection: 'row', flexWrap: "wrap", marginTop: 0, margin: 0 }}>

                    <TouchableHighlight onPress={() => alert(1)} underlayColor='white'>
                        <View style={styles.albums}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 6 }} source={{ uri: 'http://liyuangang.cn/picture/yumupic.jpg' }}></Image>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._detail()} underlayColor='white'>
                        <View style={styles.albums}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 6 }} source={{ uri: 'http://liyuangang.cn/picture/chengfupic.jpg' }}></Image>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => alert(1)} underlayColor='white'>
                        <View style={styles.albums}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 6 }} source={{ uri: 'http://liyuangang.cn/picture/yupic.jpg' }}></Image>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    albums: { width: 90, height: 90, margin: 10 }
})