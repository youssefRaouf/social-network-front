import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  TextInput
} from 'react-native';
import Post from '../components/Post';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { socket, getMyProfile } from '../services/Api'
import io from "socket.io-client";
import getEnv from '../configs';
import Message from '../components/Message';
import { AccessoryView } from '../components/AccessoryView';
import User from '../components/User'
class UserChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: ''
    };
  }

  componentDidMount() {
    // const posts = io.connect(getEnv().socket.posts)
    // const { postsReceived } = this.props;
    // posts.on('new_post',(data)=>{
    //   console.log(data)
    //   postsReceived(data);
    // })
    // this.postsRectionsSocket = io.connect(getEnv().socket.reactions)
    // this.getPosts();
    // console.log(this.props.user.id)
    // this.props.getFollowings(0,this.props.user.id);
  }

  getPosts(offset = 0) {
    const { fetchPosts } = this.props;
    fetchPosts(offset);
  }
  renderItem(item) {
    item = item.item;
    return <Message user={{ name: 'Youssef Raouf', image_url: 'https://tinyjpg.com/images/social/website.jpg' }} item={{ lastMessage: 'this is a dummy message for testing' }} />

  }

  render() {
    const screenHeight = Math.round(Dimensions.get('window').height);
    const screeenWidth = Math.round(Dimensions.get('window').width);
  let  data = [1,2,3,4]
    return (
      <KeyboardAvoidingView style={{ backgroundColor: 'black',height:screenHeight ,flex: 1 }} behavior="height" enabled>
        <View style={{paddingTop:50}}></View>
        <User user={{ name: 'Youssef Raouf', image_url: 'https://tinyjpg.com/images/social/website.jpg' }} item={null} />
        <FlatList
        data={data}
          renderItem={this.renderItem.bind(this)}
          // keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            // const offset = this.props.comments.length;
            // console.log(offset)
            // this.getComments(offset);
          }}
style={{marginTop:60}}
        // windowSize={2}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', width: screeenWidth, height: 100, backgroundColor: 'rgb(26, 33, 42)', borderTopColor: 'black' }}>
          <View style={{ backgroundColor: 'rgb(28, 42, 58)', width: screeenWidth - 20, borderRadius: 20, height: 60, justifyContent: 'center', position: 'relative', }}>
            <TextInput
              inputAccessoryViewID={'youssef'}
              style={{ color: 'white', fontSize: 18, marginLeft: 5 }}
              multiline={true}
              placeholder=" Type a message..."
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </View>
        </View>
        <AccessoryView
          textInserted={this.state.text}
          id={'youssef'}
        />
      </KeyboardAvoidingView>
    );
  }
}
UserChatScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#1F1F1F'
  },
});


const mapStateToProps = ({ posts, user }, props) => {
  const { activePost, isLoading } = posts;
  return {
    posts: posts.list || [],
    post: activePost,
    isLoading,
    user: user.user
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: offset => dispatch(actions.fetchPosts(offset)),
  postsReceived: post => dispatch(actions.postsReceived(post)),
  getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserChatScreen);
