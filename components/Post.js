import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import Wow from './emojis/Wow'
import Laugh from './emojis/Laugh'
import Love from './emojis/Love'
import Angry from './emojis/Angry';
import Sad from './emojis/Sad';
import EmojiPlaceholder from './EmojiPlaceholder';
import User from './User'
import { connect } from 'react-redux';
import * as actions from '../Actions';
class Post extends Component {
  constructor(props) {
    super(props);
    let arr = [null, Love, Laugh, Wow, Sad, Angry]
    let arrText = ["Like", "Love", "Laugh", "Wow", "Sad", "Angry"]
    this.state = { show: false, emojiText: "Like", emojiColor: 'white', emoji: null,emojiCountShow:false};
    if (this.props.item.myEmojis != null) {
      if (this.props.item.myEmojis[0]) {
        const type = this.props.item.myEmojis[0].type;
        this.state.emoji = arr[type - 1];
        this.state.emojiText = arrText[type - 1];
        if (type === 1) {
          this.state.emojiColor = 'blue'
        } else if (type === 2 || type === 6) {
          this.state.emojiColor = 'red'
        }
        else {
          this.state.emojiColor = '#FCDD68'
        }
      }
    }
    let emojis = this.props.item.emojis


  }

  componentDidMount() {
    this.props.postSocket.on(`comments_count_${this.props.item.id}`, (commentsCount) => {
      this.props.postCommentsCountChange(this.props.item.id, commentsCount);
    })
    this.props.postSocket.on(`emojis_count_${this.props.item.id}`, (post) => {
      // console.log("connection hna")      
      this.props.postEmojisCountChange(this.props.item.id, post);
    })
   let emojis= this.props.item.emojis
   for(let i=0;i<emojis.length;i++){
     if(emojis[i]!==null){
      //  console.log("s")
       this.setState({
         emojiCountShow:true
       })
     }
   }
  }
  emoji = () => {
    this.setState({
      show: true
    });
  }
  emojiOut = () => {
    setTimeout(() => {
      this.setState({
        show: false
      });
    }, 4000)

  }
  makeEmoji = (text, color, type) => {
    const { createEmojis, updateEmojis } = this.props;
    let arrText = [Love, Laugh, Wow, Sad, Angry]
    if (this.state.emojiColor === 'white') {
      createEmojis(arrText.indexOf(type) + 2, this.props.item.id);
    }
    else {

      updateEmojis(arrText.indexOf(type) + 2, this.props.item.id);
    }
    this.setState({
      show: false,
      emojiText: text,
      emojiColor: color,
      emoji: type
    });
  }

  makeLike = (text, color) => {
    this.setState({
      show: false,
      emojiText: text,
    });
    if (this.state.emojiColor !== 'white') {
      this.props.deleteEmojis(this.props.item.id)
      this.setState({
        emojiColor: 'white',
        emoji: null
      });
    } else {
      this.props.createEmojis(1, this.props.item.id);
      this.setState({
        emojiColor: color
      });
    }
  }
 
  
  render() {
    let emojis = this.props.item.emojis
  //  c
    return (
      <View style={{ backgroundColor: '#1F1F1F', paddingTop: 7 }}>
        <User item={this.props.item} />
        <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 15, color: 'white', marginBottom: 1 }}>{this.props.item.text}</Text>
       {this.props.item.url? <Image source={{ uri: this.props.item.url }}
          style={{ height: 400,width:400,resizeMode:'contain' }} />:null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 20, marginTop: 5, marginLeft: 10, marginRight: 10 }}>
        <View style={{flexDirection:'row'}}>
          {emojis[1] != null ?
            <View style={{marginRight:5,flexDirection:'row'}}>
              <Text style={{ color: 'white',marginRight:2}}>{emojis[1]}</Text>
              <AntDesign style={{ fontSize: 18, color: 'blue' }} name="like2" />
            </View>
            : null
          }
           {emojis[2] != null ?
            <View style={{justifyContent:'center',marginRight:5}}>
              <Text style={{ color: 'white'}}>{emojis[2]}</Text>
              <Love stop={true} style={{marginLeft:15,marginTop:-17,width:10}} />
            </View>
            : null
          }
           {emojis[3] != null ?
            <View style={{justifyContent:'center',marginRight:5}}>
              <Text style={{ color: 'white',}}>{emojis[3]}</Text>
              <Laugh stop={true} style={{marginLeft:15,marginTop:-17,width:10}} height={20}/>
            </View>
            : null
          }
           {emojis[4] != null ?
            <View style={{justifyContent:'center',marginRight:5}}>
              <Text style={{ color: 'white',}}>{emojis[4]}</Text>
              <Wow stop={true} style={{marginLeft:15,marginTop:-17,width:10}} height={18}/>
            </View>
            : null
          }
           {emojis[5] != null ?
            <View style={{justifyContent:'center',marginRight:5}}>
              <Text style={{ color: 'white',}}>{emojis[5]}</Text>
              <Sad stop={true} style={{marginLeft:15,marginTop:-17,width:10}} height={18}/>
            </View>
            : null
          }
           {emojis[6] != null ?
            <View style={{justifyContent:'center',marginRight:5}}>
              <Text style={{ color: 'white',}}>{emojis[6]}</Text>
              <Angry stop={true} style={{marginLeft:15,marginTop:-17,width:10}} height={18}/>
            </View>
            : null
          }
         {this.props.item.emojis.length===0?<Text style={{ color: 'white' }}>{0 + " likes"}</Text>:null}

          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', { postId: this.props.item.id })}>
            <Text style={{ color: 'white' }}>{this.props.item.comments + " comments"}</Text>
          </TouchableOpacity>
        </View>
        {this.state.show ?
          <EmojiPlaceholder makeEmoji={this.makeEmoji} />
          : null
        }
        <View style={{ marginTop: 0, flexDirection: 'row', height: 40, justifyContent: 'space-around', alignItems: 'center' }}>
          <View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
              onLongPress={() => this.emoji()}
              onPressOut={() => this.emojiOut()}
              onPress={() => this.makeLike("Like", 'blue')}
            >
              {this.state.emoji === null ? <AntDesign style={{ fontSize: 18, color: this.state.emojiColor }} name="like2" /> : <this.state.emoji stop={true} style={{ marginRight: 18, height: 30 }} />}
              <Text style={{ fontSize: 18, color: this.state.emojiColor, marginLeft: 3 }}>{this.state.emojiText}</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Comment', { postId: this.props.item.id })}
            >
              <FontAwesome style={{ fontSize: 18, color: 'white' }} name="comment-o" />
              <Text style={{ fontSize: 18, color: 'white', marginLeft: 3 }}>Comment</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons style={{ fontSize: 18, color: 'white' }} name="md-share-alt" />
              <Text style={{ fontSize: 18, color: 'white', marginLeft: 3 }}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 18, backgroundColor: '#161616', marginBottom: 10 }}>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({ emojis }, props) => {
  const { activePost, isLoading } = emojis;
  return {
    emojis: emojis.list,
    isLoading,
  };
};


const mapDispatchToProps = dispatch => ({
  createEmojis: (type, post_id) => dispatch(actions.createEmojis(type, post_id)),
  updateEmojis: (type, post_id) => dispatch(actions.updateEmojis(type, post_id)),
  deleteEmojis: (post_id) => dispatch(actions.deleteEmojis(post_id)),


  postCommentsCountChange: (post_id, commentsCount) => dispatch(actions.postCommentsCountChange(post_id, commentsCount)),
  postEmojisCountChange: (post_id, post) => dispatch(actions.postEmojisCountChange(post_id,post)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
