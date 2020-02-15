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

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }
 

  render() {
    return (
     <View style={{backgroundColor:'#1F1F1F',flex:1,paddingTop:40}}>
       <Text style={{fontSize:20,color:'white'}}>Profile Screen</Text>
       <Text style={{fontSize:20,color:'white'}}>it is under progress</Text>

     </View>
    );
  }
}
ProfileScreen.navigationOptions = {
  header:null
};

const mapStateToProps = ({ posts }, props) => {
  const { activePost, isLoading } = posts;
  return {
    posts: posts.list || [],
    post: activePost,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  // createPosts: (text, url) => dispatch(actions.createPosts(text, url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);

// CreatePostScreen.navigationOptions = {
//   header: null,
// };