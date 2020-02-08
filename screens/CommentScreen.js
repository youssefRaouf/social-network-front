import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, FlatList, Dimensions, KeyboardAvoidingView, InputAccessoryView, Button, Keyboard } from 'react-native';
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Comment from '../components/Comment';
import * as actions from '../Actions';
import { AccessoryView } from '../components/AccessoryView';
import { createComment } from '../services/Api'
import io from "socket.io-client";
class CommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', };
  }
  componentDidMount() {
    const postId = this.props.navigation.getParam('postId');
    this.getComments();
    this.comments = io.connect('http://192.168.1.3:4500/posts/comments')
    const { commentsReceived } = this.props;
    this.comments.on('new_comment' + postId, (data) => {
      console.log("youssef raouf", data)
      commentsReceived(data);
    })
    
  }

  componentWillUnmount(){
    this.comments.disconnect()
  }

  getComments(offset = 0) {
    const { fetchComments } = this.props;
    fetchComments(offset, this.props.navigation.getParam('postId'));
  }
  renderItem(item) {
    item = item.item;
    return <Comment item={item} style={{ marginTop: 30 }}></Comment>
  }
  onCommentSubmit() {
    const { createComments } = this.props;
    createComments(this.state.text, this.props.navigation.getParam('postId'));
    this.setState({
      text: ''
    })
    Keyboard.dismiss();
  }
  render() {
    // console.log("Sd")
    let data = this.props.comments;
    const screenHeight = Math.round(Dimensions.get('window').height);
    const screeenWidth = Math.round(Dimensions.get('window').width);
    return (
      <KeyboardAvoidingView style={{ backgroundColor: 'black', height: screenHeight, flex: 1 }} behavior="height" enabled>
        <View style={{ marginBottom: 40 }}></View>
        <View style={{ alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 16 }}>Comments</Text></View>

        <FlatList
          data={data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            const offset = this.props.comments.length;
            this.getComments(offset);
          }}

        // windowSize={2}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', width: screeenWidth, height: 100, backgroundColor: 'rgb(26, 33, 42)', borderTopColor: 'black' }}>
          <View style={{ backgroundColor: 'rgb(28, 42, 58)', width: screeenWidth - 20, borderRadius: 20, height: 60, justifyContent: 'center', position: 'relative', }}>
            <TextInput
              inputAccessoryViewID={'youssef'}
              style={{ color: 'white', fontSize: 18, marginLeft: 5 }}
              multiline={true}
              placeholder=" Write a comment..."
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </View>
        </View>
        <AccessoryView
          onSubmit={this.onCommentSubmit.bind(this)}
          textInserted={this.state.text}
          id={'youssef'}
        />
      </KeyboardAvoidingView>

    );
  }
}

const mapStateToProps = ({ comments }, props) => {
  const { activePost, isLoading } = comments;
  return {
    comments: comments.list,
    isLoading,
  };
};


const mapDispatchToProps = dispatch => ({
  createComments: (text, post_id, parent_id) => dispatch(actions.createComments(text, post_id, parent_id)),
  fetchComments: (offset, post_id) => dispatch(actions.fetchComments(offset, post_id)),
  commentsReceived: comment => dispatch(actions.commentsReceived(comment)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentScreen);

// CreatePostScreen.navigationOptions = {
//   header: null,
// };