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
  Alert
} from 'react-native';
import Post from '../components/Post';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { socket, getMyProfile } from '../services/Api'
import io from "socket.io-client";
import getEnv from '../configs';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const posts = io.connect(getEnv().socket.posts)
    const { postsReceived } = this.props;
    posts.on('new_post',(data)=>{
      console.log(data)
      postsReceived(data);
    })
    this.postsRectionsSocket = io.connect(getEnv().socket.reactions)
    this.getPosts();
    console.log(this.props.user.id)
    this.props.getFollowings(0,this.props.user.id);
  }
  
  getPosts(offset = 0) {
    const { fetchPosts } = this.props;
    fetchPosts(offset);
  }
  renderItem(item) {
    item = item.item;
    return <Post postSocket={this.postsRectionsSocket} item={item} navigation={this.props.navigation}></Post>
  }
  
  render() {


    this.state.data = this.props.posts;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            const offset = this.props.posts.length;
            this.getPosts(offset);
          }}
        // windowSize={2}
        />
        <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: 10, backgroundColor: '#555555', borderRadius: 30, height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.props.navigation.navigate("CreatePost")}
        >
          <AntDesign style={{ fontSize: 35, color: 'white' }} name="plus" />
        </TouchableOpacity>
      </View>
    );
  }
}
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#1F1F1F'
  },
});


const mapStateToProps = ({ posts,user }, props) => {
  const { activePost, isLoading } = posts;
  return {
    posts: posts.list || [],
    post: activePost,
    isLoading,
    user:user.user
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
)(HomeScreen);
