import React, { Component } from 'react';
import { Text,View ,Image,TouchableOpacity,TextInput,FlatList} from 'react-native';
import {AntDesign,Ionicons,Entypo, FontAwesome} from '@expo/vector-icons';
import {connect} from 'react-redux';
import Comment from '../components/Comment';
import * as actions from '../Actions';
  class  CommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text:'', };
  }
  componentDidMount() {
    this.getComments();
  }
 
  getComments(offset=0) {
    const {fetchComments} = this.props;
    fetchComments(offset,this.props.navigation.getParam('postId'));
  }
  renderItem(item){
    item=item.item;
    return <Comment item={item} style={{marginTop:30}}></Comment>
  }
  render(){
     let data= this.props.comments;
    // console.log(data,"youssef");
  return (
    <View style={{backgroundColor:'#1F1F1F',height:300000}}>
      <View style={{marginBottom:40}}></View>
    <FlatList
        data={data}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={item =>item.id.toString()}
        onEndReached={() => {
            const offset = this.props.comments.length;
           this.getComments(offset);
        }}
        // windowSize={2}
      />
    </View>
  );
}
}

const mapStateToProps = ({comments}, props) => {
  const {activePost, isLoading} = comments;
  return {
    comments: comments.list,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchComments: (offset,post_id) => dispatch(actions.fetchComments(offset,post_id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentScreen);

// CreatePostScreen.navigationOptions = {
//   header: null,
// };