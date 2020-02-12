import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Button, ScrollView, KeyboardAvoidingView } from 'react-native'
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase';
import Loading from '../components/Loading'
import * as ImageManipulator from 'expo-image-manipulator'
import { AccessoryView } from '../components/AccessoryView'
class CreatePostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', url: '', loading: false, showButton: true, showLoading: false };
  }
  createPost(text) {
    const { createPosts } = this.props;
    createPosts(text, this.state.url);
    // this.socket = io("http://192.168.1.7:4000");
    // this.socket.emit('createPost',text);
    console.log(text)
    this.props.navigation.navigate("Home")
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
  uploadImage = async (uri) => {
    let file = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 400, height: 400 } }], { compress: 0.48 })
    const response = await fetch(file.uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/test3");
    await ref.put(blob)
    const url = ref.getDownloadURL()
    return url
  }
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#1F1F1F' ,flex:1}}>
        <KeyboardAvoidingView behavior="height" enabled>
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
              {this.state.showButton ? <Button title="choose image" onPress={this.onChooseImagePress} /> : <Image source={{ uri: this.state.url }}
                style={{ height: 400, width: 400, resizeMode: 'contain' }}
              />}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  createPosts: (text, url) => dispatch(actions.createPosts(text, url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePostScreen);

// CreatePostScreen.navigationOptions = {
//   header: null,
// };