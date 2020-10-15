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
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
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
    posts.on('new_post', (data) => {
      postsReceived(data);
    })
    this.postsRectionsSocket = io.connect(getEnv().socket.reactions)
    this.getPosts();
    // this.props.getFollowings(0, this.props.user._id);
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontSize: 25, color: 'white', marginLeft: 20 }} >Deal</Text>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
            <FontAwesome style={{ fontSize: 25, color: 'white', marginRight: 20 }} name="search" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.data}
          refreshing={false}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item._id.toString()}
          onRefresh={()=>{
            this.getPosts(0);
          }}
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
)(HomeScreen);
