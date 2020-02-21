import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Button, SafeAreaView, KeyboardAvoidingView, Dimensions } from 'react-native'
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase';
import Loading from '../components/Loading'
import * as ImageManipulator from 'expo-image-manipulator'
import { Video } from 'expo-av';
import ActionSheet from 'react-native-actionsheet'
import { uploadUrl } from '../services/VideoApi';

class CreatePostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', url: '', loading: false, loadingVideo: false, showLoading: false, showLoadingVideo: false, videoName: '' };
  }
  createPost(text) {
    const { createPosts } = this.props;
    createPosts(text, this.state.url,this.state.videoName);
    // this.socket = io("http://192.168.1.7:4000");
    // this.socket.emit('createPost',text);
    console.log(text)
    this.props.navigation.navigate("Home")
  }
  onChooseVideoPress = async () => {

    ImagePicker.MediaTypeOptions.Videos;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Videos'
    })
    if (!result.cancelled) {
      this.setState({
        showButton: false,
        showLoadingVideo: true,
        Loading: false
      })
      console.log(result)
      console.log("youssef", this.state.showButton)
      this.uploadVideo(result.uri).
        then((res) => {
          this.setState({
            showLoadingVideo: false,
            loadingVideo: true
          })
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })

        ;
    }
  }
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.setState({
        showButton: false,
        showLoading: true,
        Loading: false
      })
      console.log("youssef", this.state.showButton)
      this.uploadImage(result.uri).
        then((res) => {
          this.setState({
            url: res,
            showLoading: false,
            loading: true
          })
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })

        ;
    }
  }

  chooseImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.setState({
        showButton: false,
        showLoading: true,
        Loading: false
      })
      this.uploadImage(result.uri).
        then((res) => {
          this.setState({
            url: res,
            showLoading: false,
            loading: true
          })
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })

        ;
    }
  }

  uploadImage = async (uri) => {
    let file = await ImageManipulator.manipulateAsync(uri, [{ resize: { height: 400, resizeMode: 'contain' } }], { compress: 0.48 })
    const response = await fetch(file.uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + new Date().getTime());
    await ref.put(blob)
    const url = ref.getDownloadURL()
    return url
  }
  uploadVideo = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    this.setState({ videoName: new Date().getTime() })
    var ref = firebase.storage().ref().child("videos/" + this.state.videoName);
    await ref.put(blob)
    const url = ref.getDownloadURL()
    return url
  }
  shouldPlay = () => {
    this.setState({
      shouldPlay: !this.state.shouldPlay
    })
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {
    return (
      <SafeAreaView style={{ flexDirection: 'column', flex: 1, backgroundColor: '#1F1F1F' }}>
        {/* <KeyboardAvoidingView behavior="height" enabled> */}
        <View style={{ flexDirection: 'row', marginTop: 40, borderBottomWidth: 2, paddingBottom: 5, borderColor: '#555555' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons style={{ marginLeft: 30, fontSize: 25, color: 'white' }} name="md-arrow-round-back" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>Create Post</Text>
          <View style={{ flexDirection: 'row-reverse', flex: 1, alignItems: 'center' }}>
            <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 0 }}
              disabled={this.state.text ? false : true}
              onPress={() => this.createPost(this.state.text)
                // this.props.navigation.navigate("Home")
              }
            >
              <Text style={{ fontSize: 20, color: this.state.text ? 'white' : 'grey' }}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: 10, height: 50, flexDirection: 'row', marginTop: 10 }}>
          <View>
            <Image source={{ uri: 'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg' }}
              style={{ height: 50, width: 50, borderRadius: 25 }} />
          </View>
          <View style={{ marginLeft: 10, flexDirection: 'column' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Youssef Raouf</Text>
          </View>
          <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
            <TouchableOpacity style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 0 }}>
              <Entypo style={{ fontSize: 25, color: '#555555' }} name="dots-three-vertical" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
          <TextInput
            // inputAccessoryViewID={'raoufwadie'}
            style={{ color: 'white', fontSize: 20 }}
            multiline={true}
            placeholder="What's on your mind, Youssef?"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />


          <View style={{ alignItems: 'center' }}>
            {this.state.loading ? <Image source={{ uri: this.state.url }}
              style={{ height: 400, width: 400, resizeMode: 'contain' }}
            /> : this.state.showLoading ?
                <View style={{ position: 'relative' }}>
                  <Loading />
                </View> : null}
            {this.state.loadingVideo ? <Video
              source={{ uri: 'https://videostream777.herokuapp.com/video?path=' + this.state.videoName }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode='contain'
              isLooping={true}
              useNativeControls={true}
              style={{ width: 300, height: 300 }}
            /> : this.state.showLoadingVideo ?
                <View style={{ position: 'relative' }}>
                  <Loading />
                </View>
                : null}
          </View>
        </View>

        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={-10}
          enabled
        >
          <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 40 }}>
            <TouchableOpacity onPress={this.showActionSheet.bind(this)} style={{ alignItems: 'center', flexDirection: 'row', height: 30, width: 58 }} >
              <FontAwesome name="photo" style={{ marginLeft: 10, marginRight: 15, fontSize: 25, color: 'grey' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onChooseVideoPress.bind(this)} style={{ alignItems: 'center', flexDirection: 'row', height: 30 }} >
              <Entypo name="video" style={{ marginLeft: 10, marginRight: 15, fontSize: 30, color: 'grey' }} />
            </TouchableOpacity>
            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={'Choose an image'}
              options={['Choose from camera', 'Choose from library', 'cancel']}
              cancelButtonIndex={2}
              onPress={(index) => {
                if (index === 0) {
                  this.onChooseImagePress()
                } else if (index === 1) {
                  this.chooseImageFromLibrary()
                }
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({ posts }, props) => {
  const { activePost, isLoading } = posts;
  return {
    posts: posts.list || [],
    post: activePost,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  createPosts: (text, url,videoName) => dispatch(actions.createPosts(text, url,videoName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePostScreen);

// CreatePostScreen.navigationOptions = {
//   header: null,
// };