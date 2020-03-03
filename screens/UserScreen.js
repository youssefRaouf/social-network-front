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
import io from "socket.io-client";
import getEnv from '../configs';
import User from '../components/User';

const { width } = Dimensions.get('window');

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      followers: [],
      followings: [],
      selectPosts: 1,
      follow:'Follow',
      user: ''
    };
  }

  componentDidMount() {
    this.setState({ user: this.props.navigation.getParam('user') })
    this.getPosts();
    this.getFollowers();
    this.getFollowings();
    this.postsRectionsSocket = io.connect(getEnv().socket.reactions)
  }
  getPosts(offset = 0) {
    const { fetchPostsByUserId } = this.props;
    fetchPostsByUserId(offset, this.props.navigation.getParam('user').id);
  }
  getFollowers(offset = 0) {
    const { getFollowers } = this.props;
    getFollowers(offset, this.props.navigation.getParam('user').id);
  }
  getFollowings(offset = 0) {
    const { getFollowings } = this.props;
    getFollowings(offset, this.props.navigation.getParam('user').id)
  }
  renderItem(item) {
    item = item.item
    return <Post item={item} postSocket={null} navigation={this.props.navigation}></Post>
  }
  renderFollowersUser(item) {
    item = item.item.from
    // console.log(item)
    if (this.props.user.id === item.id) {
      return (
        <View style={{ marginTop: 7 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile', { user: item })}>
            <User user={item} item={null} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{ marginTop: 7 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.push('User', { user: item })}>
            <User user={item} item={null} />
          </TouchableOpacity>
        </View>
      )
    }
  }
  renderFollowingsUser(item) {
    item = item.item.to
    // console.log(item)
    if (this.props.user.id === item.id) {
      return (
        <View style={{ marginTop: 7 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile', { user: item,})}>
            <User user={item} item={null} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{ marginTop: 7 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.push('User', { user: item ,})}>
            <User user={item} item={null} />
          </TouchableOpacity>
        </View>
      )
    }
  }
  follow(){
    const {createFollow}= this.props;
    createFollow(this.props.navigation.getParam('user').id);
  }
  render() {
    this.state.data = this.props.posts;
    this.state.followers = this.props.followers
    this.state.followings = this.props.followings
    return (
      <View style={{ backgroundColor: '#1F1F1F', flex: 1, paddingTop: 40 }}>
        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
          <Image source={{ uri: this.state.user.image_url }}
            style={{ height: 100, width: 100, borderRadius: 50 }} />
          <View style={{ flexDirection: 'column', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: width - 100 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white' }}>2,536</Text>
                <Text style={{ color: 'white' }}>posts</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white' }}>2,536</Text>
                <Text style={{ color: 'white' }}>followers</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white' }}>2,536</Text>
                <Text style={{ color: 'white' }}>following</Text>
              </View>
            </View>
            <View style={{ marginRight: 20, flexDirection: 'row', width: width - 100 }}>
              <TouchableOpacity style={{ flexDirection: 'column', width: (width - 110) / 2 }}
               onPress={()=>this.follow()}>
                <Text style={{ color: 'white' }}>{this.state.follow}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'column', width: (width - 110) / 2 }}>
                <Text style={{ color: 'white' }}>message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>{this.state.user.name}</Text>
          <Text style={{ color: 'white', fontWeight: 'normal' }}>About :</Text>
          <Text style={{ color: 'white', marginRight: 15 }}>{this.state.user.email}</Text>
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
            data={this.state.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={item => item.id.toString()}
            onEndReached={() => {
              const offset = this.props.posts.length;
              this.getPosts(offset);
            }}
          />
          : this.state.selectPosts === 2 ?
            <View style={{}}>
              <FlatList
                data={this.state.followers}
                renderItem={this.renderFollowersUser.bind(this)}
                keyExtractor={item => item.id.toString()}
                onEndReached={() => {
                  const offset = this.props.followers.length;
                  this.getFollowers(offset);
                }}
              />
            </View>
            :
            <View style={{}}>
              <FlatList
                data={this.state.followings}
                renderItem={this.renderFollowingsUser.bind(this)}
                keyExtractor={item => item.id.toString()}
                onEndReached={() => {
                  const offset = this.props.followings.length;
                  this.getFollowings(offset);
                }}
              />
            </View>
        }
      </View>
    );
  }
}
UserScreen.navigationOptions = {
  header: null
};
const mapStateToProps = ({ posts, user, followers }, props) => {
  const { activePost, isLoading } = posts;
  const userId = props.navigation.getParam('user').id
  return {
    posts: (posts[userId] && posts[userId].list) || [],
    post: activePost,
    user:user.user,
    followers: (followers[userId] && followers[userId].listFollowers) || [],
    followings: (followers[userId] && followers[userId].listFollowings) || [],
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPostsByUserId: (offset, user_id) => dispatch(actions.fetchPostsByUserId(offset, user_id)),
  getFollowers: (offset, userId) => dispatch(actions.getFollowers(offset, userId)),
  getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
  createFollow: (toUser) => dispatch(actions.createFollow( toUser)),
  postsReceived: post => dispatch(actions.postsReceived(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserScreen);
// CreatePostScreen.navigationOptions = {
//   header: null,
// };