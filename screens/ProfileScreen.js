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
  Dimensions
} from 'react-native';
import Post from '../components/Post';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { socket, getMyProfile } from '../services/Api'
import io from "socket.io-client";
import getEnv from '../configs';
import User from '../components/User';

const { width } = Dimensions.get('window');

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectPosts: 1,
      user: ''
    };
  }

  componentDidMount() {
    this.setState({ user: this.props.user })
    this.getPostsCount()
    this.getPosts();
    this.getFollowers();
    this.getFollowersCount();
    this.getFollowings();
    this.getFollowingsCount();
    this.postsRectionsSocket = io.connect(getEnv().socket.reactions)
  }

  getPosts(offset = 0) {
    const { fetchPostsByUserId } = this.props;
    fetchPostsByUserId(offset, this.props.user._id);
  }

  getPostsCount() {
    const { fetchPostsCountByUserId } = this.props;
    fetchPostsCountByUserId(this.props.user._id);
  }

  getFollowersCount() {
    const { fetchFollowersCountByUserId } = this.props;
    fetchFollowersCountByUserId(this.props.user._id);
  }

  getFollowingsCount() {
    const { fetchFollowingsCountByUserId } = this.props;
    fetchFollowingsCountByUserId(this.props.user._id);
  }

  getFollowers(offset = 0) {
    const { getFollowers } = this.props;
    getFollowers(offset, this.props.user._id);
  }

  getFollowings(offset = 0) {
    const { getFollowings } = this.props;
    getFollowings(offset, this.props.user._id)
  }

  renderItem(item) {
    item = item.item
    return <Post item={item} postSocket={this.postsRectionsSocket} navigation={this.props.navigation}></Post>
  }

  renderFollowersUser(item) {
    item = item.item.from
    return (
      <View style={{ marginTop: 7 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('User', { user: item })}>
          <User user={item} item={null} />
        </TouchableOpacity>
      </View>
    )
  }
  renderFollowingsUser(item) {
    item = item.item.to
    // console.log(item)

    return (
      <View style={{ marginTop: 7 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('User', { user: item })}>
          <User user={item} item={null} />
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <View style={{ backgroundColor: '#1F1F1F', flex: 1, paddingTop: 40 }}>
        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
          <Image source={{ uri: this.props.user.image_url }}
            style={{ height: 100, width: 100, borderRadius: 50 }} />
          <View style={{ flexDirection: 'column', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width - 100 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white' }}>{this.props.postsCount}</Text>
                <Text style={{ color: 'white' }}>posts</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white' }}>{this.props.followersCount || 0}</Text>
                <Text style={{ color: 'white' }}>followers</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white' }}>{this.props.followingsCount || 0}</Text>
                <Text style={{ color: 'white' }}>following</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>{this.props.user.name}</Text>
          <Text style={{ color: 'white', fontWeight: 'normal' }}>About :</Text>
          <Text style={{ color: 'white', marginRight: 15 }}>{this.props.user.email}</Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row', margin: 7, padding: 2 }} >
            <TouchableOpacity style={{ paddingBottom: 3, flex: 0.5, alignItems: 'center', borderColor: 'grey', borderBottomWidth: this.state.selectPosts === 1 ? 2 : 0 }} onPress={() => this.setState({ selectPosts: 1 })}>
              <Text style={{ color: this.state.selectPosts === 1 ? 'white' : 'grey', fontSize: 18 }}>posts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingBottom: 3, flex: 0.5, alignItems: 'center', borderColor: 'grey', borderBottomWidth: this.state.selectPosts === 2 ? 2 : 0 }} onPress={() => this.setState({ selectPosts: 2 })}>
              <Text style={{ color: this.state.selectPosts === 2 ? 'white' : 'grey', fontSize: 18 }}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingBottom: 3, flex: 0.5, alignItems: 'center', borderColor: 'grey', borderBottomWidth: this.state.selectPosts === 3 ? 2 : 0 }} onPress={() => this.setState({ selectPosts: 3 })}>
              <Text style={{ color: this.state.selectPosts === 3 ? 'white' : 'grey', fontSize: 18 }}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.selectPosts === 1 ?
          <FlatList
            refreshing={false}
            onRefresh={() => {
              this.getPostsCount();
              const offset = 0;
              this.getPosts(offset);
            }}
            data={this.props.posts}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={item => item._id.toString()}
            onEndReached={() => {
              const offset = this.props.posts.length;
              this.getPosts(offset);
            }}
          />
          : this.state.selectPosts === 2 ?
            <FlatList
              data={this.props.followers}
              renderItem={this.renderFollowersUser.bind(this)}
              keyExtractor={item => item._id.toString()}
              refreshing={false}
              onRefresh={() => {
                const offset = 0;
                this.getFollowers(offset);
                this.getFollowersCount();
              }}
              onEndReached={() => {
                const offset = this.props.followers.length;
                this.getFollowers(offset);
              }}
            />
            :
            <FlatList
              data={this.props.followings}
              renderItem={this.renderFollowingsUser.bind(this)}
              keyExtractor={item => item._id.toString()}
              refreshing={false}
              onRefresh={() => {
                const offset = 0;
                this.getFollowings(offset);
                this.getFollowingsCount();
              }}
              onEndReached={() => {
                const offset = this.props.followings.length;
                this.getFollowings(offset);
              }}
            />
        }
      </View>
    );
  }
}
ProfileScreen.navigationOptions = {
  header: null
};
const mapStateToProps = ({ posts, user, followers }, props) => {
  // console.log()
  const userId = user.user._id;
  return {
    posts: (posts[userId] && posts[userId].list) || [],
    postsCount: (posts[userId] && posts[userId].postsCount),
    user: user.user,
    followers: (followers[userId] && followers[userId].listFollowers) || [],
    followings: (followers[userId] && followers[userId].listFollowings) || [],
    followersCount: (followers[userId] && followers[userId].followersCount),
    followingsCount: (followers[userId] && followers[userId].followingsCount),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPostsByUserId: (offset, user_id) => dispatch(actions.fetchPostsByUserId(offset, user_id)),
  fetchPostsCountByUserId: (user_id) => dispatch(actions.fetchPostsCountByUserId(user_id)),
  fetchFollowersCountByUserId: (user_id) => dispatch(actions.fetchFollowersCountByUserId(user_id)),
  fetchFollowingsCountByUserId: (user_id) => dispatch(actions.fetchFollowingsCountByUserId(user_id)),
  getFollowers: (offset, userId) => dispatch(actions.getFollowers(offset, userId)),
  getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
  postsReceived: post => dispatch(actions.postsReceived(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
