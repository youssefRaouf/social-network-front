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
    this.state = { show: false, emojiText: "Like", emojiColor: 'white', emoji: null, likes: 0 };
    if(this.props.item.myEmojis!=null){
    if (this.props.item.myEmojis[0]) {
      const type = this.props.item.myEmojis[0].type;
      this.state.emoji = arr[type - 1];
      this.state.emojiText = arrText[type - 1];
      if (type === 1) {
        this.state.emojiColor = 'blue'
      } else if (type == 2 || 6) {
        this.state.emojiColor = 'red'
      }
      else {
        this.state.emojiColor = '#FCDD68'
      }
    }
    for (let i = 0; i < 6; i++) {
      if (this.props.item.emojis[i]) {
        this.state.likes = this.state.likes + this.props.item.emojis[i];
      }
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
    this.setState({
      show: false,
      emojiText: text,
      emojiColor: color,
      emoji: type
    });
    let arrText = ["Like", "Love", "Laugh", "Wow", "Sad", "Angry"]
    const { createEmojis } = this.props;
    console.log(arrText.lastIndexOf(type + "") + 2);
    // console.log(this.props.item.id)
    createEmojis(arrText.lastIndexOf(type + "") + 2, this.props.item.id);
  }

  makeLike = (text, color) => {
    this.setState({
      show: false,
      emojiText: text,
    });
    if (this.state.emojiColor !== 'white') {
      this.setState({
        emojiColor: 'white',
        emoji: null
      });
    } else {
      this.setState({
        emojiColor: color
      });
    }
  }
  render() {
    return (
      <View style={{ backgroundColor: '#1F1F1F', paddingTop: 7 }}>
        <User item={this.props.item} />
        <Text style={{ marginLeft: 10, marginTop: 0, fontSize: 15, color: 'white', marginBottom: 1 }}>{this.props.item.text}</Text>
        <Image source={{ uri: 'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg' }}
          style={{ height: 400 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 20, marginTop: 5, marginLeft: 10, marginRight: 10 }}>
          <Text style={{ color: 'white' }}>{this.state.likes + " likes"}</Text>
          <Text style={{ color: 'white' }}>{this.props.item.comments + " comments"}</Text>
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
              {this.state.emoji !== null ? <this.state.emoji stop={true} style={{ marginRight: 18, height: 30 }} /> : <AntDesign style={{ fontSize: 18, color: this.state.emojiColor }} name="like2" />}
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

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
