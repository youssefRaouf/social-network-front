import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
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
import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'
import { ScreenOrientation } from 'expo';
const { width } = Dimensions.get('window');

class Post extends Component {
  constructor(props) {
    super(props);
    let arr = [null, Love, Laugh, Wow, Sad, Angry]
    let arrText = ["Like", "Love", "Laugh", "Wow", "Sad", "Angry"]
    this.state = { showView: false, show: false, emojiText: "Like", emojiColor: 'white', emoji: null, emojiCountShow: false, videoHeight: 400, height: 400, width, fullScreen: false };
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
  }

  componentDidMount() {
    if (this.props.postSocket !== null) {
      this.props.postSocket.on(`comments_count_${this.props.item._id}`, (commentsCount) => {
        this.props.postCommentsCountChange(this.props.item, commentsCount);
      })
      this.props.postSocket.on(`emojis_count_${this.props.item._id}`, (post) => {
        let post2 = {}
        post2 = post._doc
        post2.myEmojis = post.myEmojis
        this.props.postEmojisCountChange(this.props.item._id, post2);
        this.checkMyEmojis()
      })
    }
  }

  sharePost() {
    const { createPosts } = this.props;
    createPosts(this.props.item.text, this.props.item.url, this.props.item.video_name);
  }

  showView() {
    if (this.state.showView) {
      this.setState({ showView: false })
    } else {
      this.setState({ showView: true })
    }
  }

  checkMyEmojis() {
    let arr = [null, Love, Laugh, Wow, Sad, Angry]
    let arrText = ["Like", "Love", "Laugh", "Wow", "Sad", "Angry"]
    if (this.props.item.myEmojis != null) {
      if (this.props.item.myEmojis[0]) {
        const type = this.props.item.myEmojis[0].type;
        this.setState({ emoji: arr[type - 1], emojiText: arrText[type - 1] })
        if (type === 1) {
          this.setState({ emojiColor: 'blue' })
        } else if (type === 2 || type === 6) {
          this.setState({ emojiColor: 'red' })
        }
        else {
          this.setState({ emojiColor: '#FCDD68' })
        }
      }
      else {
        this.setState({
          emojiColor: 'white',
          emoji: null,
          emojiText: "Like"
        });
      }
    } else {
      this.setState({
        emojiColor: 'white',
        emoji: null
      });
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
      createEmojis(arrText.indexOf(type) + 2, this.props.item._id);
    }
    else {
      updateEmojis(arrText.indexOf(type) + 2, this.props.item._id, this.state.emojiText.toLowerCase());
    }
    this.setState({
      show: false,
      emojiText: text,
      emojiColor: color,
      emoji: type
    });
  }

  makeLike = (text, color) => {

    if (this.state.emojiColor !== 'white') {
      this.props.deleteEmojis(this.props.item._id, this.state.emojiText)
      this.setState({
        emojiColor: 'white',
        emoji: null,
        show: false,
        emojiText: text,
      });
    } else {
      this.props.createEmojis(1, this.props.item._id);
      this.setState({
        emojiColor: color,
        show: false,
        emojiText: text,
      });
    }
  }

  onUserPress = () => {
    if (this.props.user._id === this.props.item.user._id) {
      this.props.navigation.navigate('Profile')
      return;
    }
    this.props.navigation.navigate('User', { user: this.props.item.user })
  }

  deletePost(){
  this.props.deletePost(this.props.item._id)
  this.showView()
  }

  render() {
    return (
      <View style={{ backgroundColor: '#1F1F1F', paddingTop: 7 }}>
        <TouchableOpacity onPress={this.onUserPress}>
          <User user={this.props.item.user} item={this.props.item} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row-reverse', flex: 1, position: 'absolute', right: 0 }}>
          <TouchableOpacity onPress={() => this.showView()} style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 0 }}>
            <Entypo style={{ fontSize: 20, color: '#555555' }} name="dots-three-vertical" />
          </TouchableOpacity>
        </View>
        {this.state.showView ?
          <View on style={{ justifyContent:'center',alignItems:'center',width:100,backgroundColor: '#555555', position: 'absolute', right: 20, top: 22,elevation:100,borderColor:'grey' }}>
            {this.props.user._id === this.props.item.user._id ?
              <TouchableOpacity onPress={()=>this.deletePost()} style={{height:30}}>
                <Text style={{ color: 'white' }}>Delete Post</Text>
              </TouchableOpacity>
              :
              null
            }
            <TouchableOpacity style={{height:30}}>
              <Text style={{ color: 'white' }}>Report Post</Text>
            </TouchableOpacity>
          </View>
          : null
        }
        <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 15, color: 'white', marginBottom: 1 }}>{this.props.item.text}</Text>
        {this.props.item.url ? <Image source={{ uri: this.props.item.url }}
          style={{ height: this.state.height, resizeMode: 'contain', }}
          onLoad={(e) => {
            const ratio = e.nativeEvent.source.width / 400
            const newHeight = width / ratio
            this.setState({ height: newHeight, width })
          }}
        /> : null}
        {this.props.item.video_name ?
          <View style={{ alignItems: 'center' }}>
            <Video
              source={{ uri: 'https://videostream777.herokuapp.com/video?path=' + this.props.item.video_name }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode='contain'
              isLooping={false}
              useNativeControls={true}
              style={{ width: Dimensions.get('window').width, aspectRatio: 1 }}
            />
            {/* source={{ uri: 'https://videostream777.herokuapp.com/video?path=' + this.props.item.video_name }} */}
            {/* <VideoPlayer
              videoProps={{
                // onFullscreenUpdate:()=>{this.setState({fullScreen:!fullScreen})},
                shouldPlay: false,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: {
                 uri: 'https://videostream777.herokuapp.com/video?path=' + this.props.item.video_name ,
                },
              }}
              height={500}
              inFullscreen={this.state.fullScreen}
              showFullscreenButton={false}
              showControlsOnLoad={true}
              switchToLandscape={()=>{ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
                this.setState({fullScreen:!this.state.fullScreen})
                }}
              switchToPortrait={()=>{ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
                this.setState({fullScreen:!this.state.fullScreen})
              }} */}
            {/* /> */}
          </View> : null
        }
        {/* <WebView
            source={{html: `<iframe src=\"http://www.dailymotion.com/embed/video/x26m1j4\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=true allow=\"autoplay\""></iframe>`}}
            style={{ width, height: 0.6*width, backgroundColor: 'black'}}
          /> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 20, marginTop: 5, marginLeft: 10, marginRight: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            {this.props.item.like !== 0 ?
              <View style={{ marginRight: 5, flexDirection: 'row' }}>
                <Text style={{ color: 'white', marginRight: 2 }}>{this.props.item.like}</Text>
                <AntDesign style={{ fontSize: 18, color: 'blue' }} name="like2" />
              </View>
              : null
            }
            {this.props.item.love !== 0 ?
              <View style={{ justifyContent: 'center', marginRight: 5 }}>
                <Text style={{ color: 'white' }}>{this.props.item.love}</Text>
                <Love stop={true} style={{ marginLeft: 15, marginTop: -17, width: 10 }} />
              </View>
              : null
            }
            {this.props.item.laugh !== 0 ?
              <View style={{ justifyContent: 'center', marginRight: 5 }}>
                <Text style={{ color: 'white', }}>{this.props.item.laugh}</Text>
                <Laugh stop={true} style={{ marginLeft: 15, marginTop: -17, width: 10 }} height={20} />
              </View>
              : null
            }
            {this.props.item.wow !== 0 ?
              <View style={{ justifyContent: 'center', marginRight: 5 }}>
                <Text style={{ color: 'white', }}>{this.props.item.wow}</Text>
                <Wow stop={true} style={{ marginLeft: 15, marginTop: -17, width: 10 }} height={18} />
              </View>
              : null
            }
            {this.props.item.sad !== 0 ?
              <View style={{ justifyContent: 'center', marginRight: 5 }}>
                <Text style={{ color: 'white', }}>{this.props.item.sad}</Text>
                <Sad stop={true} style={{ marginLeft: 15, marginTop: -17, width: 10 }} height={18} />
              </View>
              : null
            }
            {this.props.item.angry !== 0 ?
              <View style={{ justifyContent: 'center', marginRight: 5 }}>
                <Text style={{ color: 'white', }}>{this.props.item.angry}</Text>
                <Angry stop={true} style={{ marginLeft: 15, marginTop: -17, width: 10 }} height={18} />
              </View>
              : null
            }
            {this.props.item.like === 0 && this.props.item.love === 0 && this.props.item.laugh === 0 && this.props.item.wow === 0 && this.props.item.sad === 0 && this.props.item.angry === 0 ? <Text style={{ color: 'white' }}>{0 + " likes"}</Text> : null}

          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', { postId: this.props.item._id })}>
            <Text style={{ color: 'white' }}>{this.props.item.commentsCount + " comments"}</Text>
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
              <Text style={{ fontSize: 15, color: this.state.emojiColor, marginLeft: 3 }}>{this.state.emojiText}</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Comment', { postId: this.props.item._id })}
            >
              <FontAwesome style={{ fontSize: 18, color: 'white' }} name="comment-o" />
              <Text style={{ fontSize: 15, color: 'white', marginLeft: 3 }}>Comment</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.sharePost()} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons style={{ fontSize: 18, color: 'white' }} name="md-share-alt" />
              <Text style={{ fontSize: 15, color: 'white', marginLeft: 3 }}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 18, backgroundColor: '#161616', marginBottom: 10 }}>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({ emojis, user }, props) => {
  const { activePost, isLoading } = emojis;
  return {
    emojis: emojis.list,
    isLoading,
    user: user.user
  };
};


const mapDispatchToProps = dispatch => ({
  createEmojis: (type, post_id) => dispatch(actions.createEmojis(type, post_id)),
  updateEmojis: (type, post_id, prevType) => dispatch(actions.updateEmojis(type, post_id, prevType)),
  deleteEmojis: (post_id, type) => dispatch(actions.deleteEmojis(post_id, type)),
  postCommentsCountChange: (post, commentsCount) => dispatch(actions.postCommentsCountChange(post, commentsCount)),
  postEmojisCountChange: (post_id, post) => dispatch(actions.postEmojisCountChange(post_id, post)),
  createPosts: (text, url, videoName) => dispatch(actions.createPosts(text, url, videoName)),
  deletePost: (id) => dispatch(actions.deletePost(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
