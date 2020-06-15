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
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default class Buy extends React.Component {
    constructor() {
        super()
        this.player = null
        this.state = {
            playlist: true,
            name: 'controller-play',
            albums: [],
            music: '',
            size: 50,
            duration: 1,
            currentTime: 0
        }
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
            let videoPath = this.props.route.params.audioPath
            let singerPath = this.props.route.params.name
            let imgPath = this.props.route.params.imagePath
            this.setState({ playlist: false, name: 'controller-paus', music: videoPath, singer: singerPath, img: imgPath })
        } else {
            this.setState({ playlist: true, name: 'controller-play' })
        }
    }

    next = () => {
        // alert(2)
        p++
        let videoPath = this.props.route.params.audioPath
        let singerPath = this.props.route.params.name
        let imgPath = this.props.route.params.imagePath
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
                    <Image style={{ width: '80%', height: 150, borderRadius: 18 }} source={{ uri: this.props.route.params.imagePath }} />
                </View>
                <View style={{ height: 180, margin: 0, paddingLeft: 26, marginTop: 0, justifyContent: 'center', alignItems: 'center', marginRight: 50 }}>
                    <Text style={{ fontSize: 20 }}>{this.props.route.params.name}</Text>
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
                            <Entypo style={{ marginBottom: 10, marginRight: 15 }}
                                name='controller-jump-to-start'
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="none" activeOpacity={0.1}
                            onPress={this.stop}>
                            {/* name="control-play" */}
                            <Entypo style={{ marginBottom: 10, marginRight: 15 }}
                                name={this.state.name}
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="none" activeOpacity={0.1}
                            onPress={this.next}>
                            {/* name="control-play" */}
                            <Entypo style={{ marginBottom: 10, marginRight: 15 }}
                                name='controller-next'
                                size={this.state.size} color="black" />
                        </TouchableHighlight>

                    </View>
                </View>
            </View>

        )
    }
}
