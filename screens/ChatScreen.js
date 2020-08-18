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
import Chat from '../components/Chat';
class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
    
    this.getRooms();
  }

  getRooms(offset = 0) {
    const { fetchRooms } = this.props;
    fetchRooms(offset, this.props.user._id);
  }
  renderItem(item) {
    item = item.item;
    return (
      <TouchableOpacity style={{marginTop:8}} onPress={() => this.props.navigation.navigate('UserChat', { id:item._id,user:this.props.user._id===item.user1._id?item.user2:item.user1 })}>
        <Chat user={this.props.user._id===item.user1._id?item.user2:item.user1} item={{_id:item._id,update_at:item.update_at, lastMessage: item.text }} />
      </TouchableOpacity>
    )
  }

  render() {
    let data = this.props.rooms
    return (
      <View style={styles.container}>

        <FlatList
          data={data}
          style={{marginTop:0}}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item._id.toString()}
          onEndReached={() => {
            const offset = this.props.rooms.length;
            this.getRooms(offset);
          }}
        />
      
      </View>
    );
  }
}
ChatScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    // paddingTop:10,
    backgroundColor: '#1F1F1F'
  },
});


const mapStateToProps = ({ user, rooms }, props) => {
  return {
    rooms: rooms.list || [],
    user: user.user
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: offset => dispatch(actions.fetchPosts(offset)),
  postsReceived: post => dispatch(actions.postsReceived(post)),
  fetchRooms: (offset, id) => dispatch(actions.fetchRooms(offset, id)),
  updateRoom: (text,roomId) => dispatch(actions.updateRoom(text,roomId)),
  getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
