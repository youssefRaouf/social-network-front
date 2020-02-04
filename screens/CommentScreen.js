import React, { Component } from 'react';
import { Text,View ,Image,TouchableOpacity,TextInput,FlatList,Dimensions,KeyboardAvoidingView} from 'react-native';
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
  updateEmail = e => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  };
  render(){
    // console.log("Sd")
     let data= this.props.comments;
     const screenHeight = Math.round(Dimensions.get('window').height);
     const screeenWidth = Math.round(Dimensions.get('window').width);
  return (
    <KeyboardAvoidingView style={{backgroundColor:'black',height:screenHeight,flex:1}} behavior="height" enabled>
      <View style={{marginBottom:40}}></View>
      <View style={{alignItems:'center'}}><Text style={{color:'white',fontSize:16}}>Comments</Text></View>

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
     <View style={{justifyContent:'center',alignItems:'center',width:screeenWidth,height:100,backgroundColor: 'rgb(26, 33, 42)',borderTopColor:'black'}}>
          <View style={{backgroundColor: 'rgb(28, 42, 58)',width:screeenWidth-20,borderRadius:20,height:60,justifyContent:'center',position:'relative',}}>
        <TextInput
            
          style={{color:'white',fontSize:20,marginLeft:5 }}
          multiline = {true}
          placeholder="Write a comment..."
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
          </View>
        </View>
    </KeyboardAvoidingView>
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