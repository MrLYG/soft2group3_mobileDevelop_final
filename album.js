import React, { Component } from 'react'
import { Text, View, Button, Modal, Image ,TouchableHighlight} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Video from 'react-native-video'
import ViewPager from '@react-native-community/viewpager';
import Entypo from "react-native-vector-icons/Entypo"
import Setting from './Setting'
import Home from './Home'
import Slider from '@react-native-community/slider'
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

var p = 0
export default class Buy extends React.Component {
    constructor() {
        super()
        this.player = null
        this.state = {
            playlist: true,
            name: 'control-play',
            albums: [],
            music: '',
            singer: '蒲提-爱我',
            img: 'http://118.25.250.106/picture/aiwopic.jpg',
            size: 30,
            duration: 1,
            currentTime: 0
        }
    }
    componentDidMount() {
        fetch("http://118.25.250.106:3200/albums", { method: 'GET' })
            .then(resp => resp.json())
            .then(albums => {
                console.log(albums)
                this.setState({ albums: albums })
            })
    }
    last = () => {
        p--
        let videoPath = this.state.albums[p].audioPath
        let singerPath = this.state.albums[p].name
        let imgPath = this.state.albums[p].imagePath
        this.setState({
            music: videoPath,
            singer: singerPath,
            img: imgPath,
            name: 'control-play',
            playlist: true,
        })
    }

    stop = () => {
        if (this.state.playlist === true) {
            let videoPath = this.state.albums[p].audioPath
        let singerPath = this.state.albums[p].name
        let imgPath = this.state.albums[p].imagePath
        console.log(this.state.albums)
            this.setState({ playlist: false, name: 'control-pause', music: videoPath, singer: singerPath, img: imgPath })
        } else {
            this.setState({ playlist: true, name: 'control-play' })
        }
    }

    next = () => {
        // alert(2)
        p++
        let videoPath = this.state.albums[p].audioPath
        let singerPath = this.state.albums[p].name
        let imgPath = this.state.albums[p].imagePath
        this.setState({
            music: videoPath,
            singer: singerPath,
            img: imgPath,
            name: 'control-play',
            playlist: true
        })
    }
    _loadHandler = ({ duration }) => {
        this.setState({
            duration
        })
    }
    _progressHandler = ({ currentTime }) => {
        this.setState({
            currentTime
        })
    }
    _seekHandler = (value) => {
        this.player.seek(value)
    }
    _endHandler=()=>{
        this.next()
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Image style={{ width: '80%', height: 250 , borderRadius: 18 }} source={{ uri: this.state.img}} />
                </View>
                <View style={{ height: 100, margin: 0, paddingLeft: 26, marginTop: 0, justifyContent: 'center', alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ fontSize: 20 }}>{this.state.singer}</Text>
                </View>
                {/* optin-monster */}
                <View>
                    <Slider
                        style={{ width: '90%', marginLeft: 20 }}
                        minimumValue={0}
                        maximumValue={this.state.duration}
                        value={this.state.currentTime}
                        onSlidingComplete={this._seekHandler}
                    ></Slider>
                </View>
                <View style={{ alignItems: 'center' ,marginLeft:15}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                        <Video
                            ref={ref => this.player = ref}
                            source={{ uri: this.state.music }}
                            paused={this.state.playlist}
                            onLoad={this._loadHandler}
                            onProgress={this._progressHandler}
                            onEnd={this._endHandler}
                        ></Video>

                        <TouchableHighlight underlayColor="none" activeOpacity={0.1}
                            onPress={this.last}>
                            {/* name="control-play" */}
                            <SimpleLineIcons style={{ marginBottom: 100, marginRight: 15 }}
                                name='control-start'
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="none" activeOpacity={0.1}
                            onPress={this.stop}>
                            {/* name="control-play" */}
                            <SimpleLineIcons style={{ marginBottom: 100, marginRight: 15 }}
                                name={this.state.name}
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="none" activeOpacity={0.1}
                            onPress={this.next}>
                            {/* name="control-play" */}
                            <SimpleLineIcons style={{ marginBottom: 100, marginRight: 15 }}
                                name='control-end'
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                    </View>
                </View>
            </View>

        )
    }
}
