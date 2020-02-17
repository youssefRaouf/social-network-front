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
import { socket } from '../services/Api'
import io from "socket.io-client";
const { width } = Dimensions.get('window');

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectPosts:1
    };
  }

  componentDidMount() {
    // const posts = io.connect('https://social-network123.herokuapp.com/posts')
    // const { postsReceived } = this.props;
    // posts.on('new_post',(data)=>{
    //   console.log(data)
    //   postsReceived(data);
    // })
    // this.postsRectionsSocket = io.connect('https://social-network123.herokuapp.com/posts/reactions')

    this.getPosts();
  }
  getPosts(offset = 0) {
    const { fetchPosts } = this.props;
    fetchPosts(offset);
  }
  renderItem(item) {
    item = item.item;
    return <Post postSocket={null} item={item} navigation={this.props.navigation}></Post>
  }
  render() {
    this.state.data = this.props.posts;
    return (
      <View style={{ backgroundColor: '#1F1F1F', flex: 1, paddingTop: 40 }}>
        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
          <Image source={{ uri: 'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg' }}
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
          </View>
        </View>
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>Mina Makar</Text>
          <Text style={{ color: 'white', fontWeight: 'normal' }}>About :</Text>
          <Text style={{ color: 'white', marginRight: 15 }}>i am a software engineer making this application with expo </Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row',margin:7,padding:2}} >
              <TouchableOpacity style={{ paddingBottom:3,flex: 0.5, alignItems: 'center',borderColor:'grey',borderBottomWidth:this.state.selectPosts===1?2:0}} onPress={()=>this.setState({selectPosts:1})}>
                <Text style={{ color: this.state.selectPosts===1?'white':'grey', fontSize: 18 }}>posts</Text>
              </TouchableOpacity>
            <TouchableOpacity style={{ paddingBottom:3,flex: 0.5, alignItems: 'center',borderColor:'grey',borderBottomWidth:this.state.selectPosts===2?2:0 }} onPress={()=>this.setState({selectPosts:2})}>
              <Text style={{ color:this.state.selectPosts===2?'white': 'grey', fontSize: 18 }}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingBottom:3, flex: 0.5, alignItems: 'center',borderColor:'grey',borderBottomWidth:this.state.selectPosts===3?2:0 }} onPress={()=>this.setState({selectPosts:3})}>
              <Text style={{ color:this.state.selectPosts===3?'white': 'grey', fontSize: 18 }}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.selectPosts===1?
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            const offset = this.props.posts.length;
            this.getPosts(offset);
          }}
        />
       :this.state.selectPosts===2?<Text style={{color:'white'}}>under progress</Text>
       :<Text style={{color:'white'}}>under</Text> }
      </View>
    );
  }
}
ProfileScreen.navigationOptions = {
  header: null
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
  fetchPosts: offset => dispatch(actions.fetchPosts(offset)),
  postsReceived: post => dispatch(actions.postsReceived(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
// CreatePostScreen.navigationOptions = {
//   header: null,
// };