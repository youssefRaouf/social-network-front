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
  TextInput,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { AntDesign, MaterialIcons,Ionicons } from '@expo/vector-icons';
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
    const messages = io.connect(getEnv().socket.messages)
    messages.on('new_message' + this.props.navigation.getParam('id') , (data) => {
     this.props.messagesReceived(data);
    })
    this.getMessages();
  }

  getMessages(offset = 0) {
    const { fetchMessages } = this.props;
    fetchMessages(offset, this.props.navigation.getParam('id'));
  }
  renderItem(item) {
    item = item.item;
    return <Message id={this.props.user._id}item={item} user={this.props.user} user2={this.props.navigation.getParam('user')} />
  }
  createMessages(){
    this.props.createMessage(this.state.text,this.props.user.id,this.props.navigation.getParam('user').id,this.props.navigation.getParam('id'))
    this.setState({
      text: ''
    })
    Keyboard.dismiss();
    // this.props.updateRoom(this.state.text,this.props.navigation.getParam('id'))
  }
  render() {
    const screenHeight = Math.round(Dimensions.get('window').height);
    const screeenWidth = Math.round(Dimensions.get('window').width);
    let data = this.props.messages
    return (
      <KeyboardAvoidingView style={{ backgroundColor: 'black', height: screenHeight, flex: 1 }} behavior="height" enabled>
        <View style={{ paddingTop: 50,flexDirection:'row',alignItems:'center' }}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
            <Ionicons style={{ marginLeft: 30, fontSize: 25, color: 'white' }} name="md-arrow-round-back" />
          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
          <Image source={{uri:this.props.navigation.getParam('user').image_url}}
            style={{height:40,width:40,borderRadius:20,marginRight:10}}/>
          <Text style={{fontSize:16,color:'white'}}>{this.props.navigation.getParam('user').name}</Text>
            </View>
        </View>
        <FlatList
          data={data}
          renderItem={this.renderItem.bind(this)}
          inverted={true}
          // keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            const offset = this.props.messages.length;
            this.getMessages(offset);
          }}
          // style={{ marginTop: 60 }}
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
          onSubmit={this.createMessages.bind(this)}
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


const mapStateToProps = ({ user, messages }, props) => {
  return {
    messages: messages.list || [],
    user: user.user
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMessages: (offset,id) => dispatch(actions.fetchMessages(offset,id)),
  messagesReceived: message => dispatch(actions.messagesReceived(message)),
  updateRoom: (text,roomId) => dispatch(actions.updateRoom(text,roomId)),
  createMessage: (message, from_user,to_user, room_id) => dispatch(actions.createMessage(message, from_user,to_user, room_id)),
  getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserChatScreen);
