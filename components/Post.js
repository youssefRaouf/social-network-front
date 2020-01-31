import React, { Component } from 'react';
import { Text,View ,Image,TouchableOpacity} from 'react-native';
import {AntDesign,Ionicons,Entypo, FontAwesome} from '@expo/vector-icons';
// import Wow from './Wow'
// import Laugh from './emojis/Laugh'
// import Love from './Love'
// import Angry from './Angry';
// import Sad from './Sad';
import EmojiPlaceholder from './EmojiPlaceholder';
export  class  Post extends Component {
  constructor(props) {
    super(props);
    this.state = { show:false,emojiText:"Like",emojiColor:'white',emoji:null };
  }
  emoji =() =>{
    this.setState({
      show:true
    });
  }
  emojiOut =() =>{
    setTimeout(()=>{
      this.setState({
        show:false
      });
    },4000)
    
  }
  makeEmoji=(text,color,type)=>{
    this.setState({
      show:false,
      emojiText:text,
      emojiColor:color,
      emoji:type
    });
  }
  
  makeLike=(text,color)=>{
    this.setState({
      show:false,
      emojiText:text,
    });
    if (this.state.emojiColor!=='white') {
      this.setState({
        emojiColor:'white',
        emoji:null
      });
    }else{
      this.setState({
        emojiColor:color
      });
    }
  }
  render(){
  return (
      <View style={{backgroundColor:'#1F1F1F',paddingTop:5}}>
       <View style={{marginLeft:10,height:50,flexDirection:'row',flex:1}}>
        <View>
            <Image source={{uri:'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'}}
            style={{height:50,width:50,borderRadius:25}}/>
        </View>
        <View style={{marginLeft:10,flexDirection:'column'}}>
          <Text style={{fontSize:18,color:'white'}}>{this.props.userName}</Text>
          <Text style={{color:'#555555'}}>{this.props.created_at}</Text>    
        </View>
        <View style={{flexDirection:'row-reverse',flex:1}}>
       <TouchableOpacity style={{alignItems:'flex-end',marginRight:10,marginTop:0}}>        
        <Entypo style={{fontSize:25,color:'#555555'}} name="dots-three-vertical"/>
        </TouchableOpacity>
        </View>
       </View>
        <Text style={{marginLeft:10,marginTop:5,fontSize:15,color:'white'}}>{this.props.text}</Text>
        <Image source={{uri:'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'}}
            style={{height:400}}/>
        <View style={{flexDirection:'row',justifyContent:'space-between',height:20,marginTop:5,marginLeft:10,marginRight:10}}>
        <Text style={{color:'white'}}>19 likes</Text>
        <Text style={{color:'white'}}>19 comments</Text>
        </View>
        { this.state.show?
          <EmojiPlaceholder makeEmoji={this.makeEmoji}/>
        :null
  }
       <View style={{marginTop:0,flexDirection:'row',height:40,justifyContent:'space-around',alignItems:'center'}}>
        <View>
            <TouchableOpacity style={{flexDirection:'row' ,alignItems:'center'}}
            onLongPress={()=>this.emoji()}
            onPressOut={()=>this.emojiOut()}        
            onPress={() => this.makeLike("Like",'blue')}
            >
            {this.state.emoji!==null? <this.state.emoji stop={true} style={{marginRight: 18,height:30}}/>:<AntDesign style={{fontSize:18,color:this.state.emojiColor}} name="like2"/>}
              <Text style={{fontSize:18,color:this.state.emojiColor,marginLeft:3}}>{this.state.emojiText}</Text>
              </TouchableOpacity>
        </View>
        <View >
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
            <FontAwesome style={{fontSize:18,color:'white'}} name="comment-o"/>
              <Text style={{fontSize:18,color:'white',marginLeft:3}}>Comment</Text>
              </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
        <Ionicons style={{fontSize:18,color:'white'}} name="md-share-alt"/>
          <Text style={{fontSize:18,color:'white',marginLeft:3}}>Share</Text>
          </TouchableOpacity>
        </View>
       </View>
       <View style={{height:18,backgroundColor:'#161616',marginBottom:10}}>
        </View>
    </View>
  );
}
}