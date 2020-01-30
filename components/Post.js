import React, { Component } from 'react';
import { Text,View ,Image,TouchableOpacity} from 'react-native';
import {AntDesign, EvilIcons, Ionicons,Entypo, FontAwesome} from '@expo/vector-icons';
import Wow from './Wow'
import Laugh from './Laugh'
import Love from './Love'
export  class  Post extends Component {
  constructor(props) {
    super(props);
    this.state = { show:false };
  }
   content=null;
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
    },3000)
    
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
        <View style={{backgroundColor:'#1F1F1F',flexDirection:'row',position:'absolute',bottom:70,justifyContent:'space-between',borderRadius:10,borderWidth:2,borderColor:'grey',left:10}}>
    <TouchableOpacity style={{width:40}}><Laugh/></TouchableOpacity>
    <TouchableOpacity style={{width:40}}><Laugh/></TouchableOpacity>
    <TouchableOpacity style={{width:40}}><Wow/></TouchableOpacity>
    <TouchableOpacity style={{width:40}}><Wow/></TouchableOpacity>
    <TouchableOpacity style={{width:40}}><Love/></TouchableOpacity>
        </View>
        :null
  }
        {/* { this.state.show?<Laugh/>:null} */}
        {/* { this.state.show?<Angry/>:null} */}
       <View style={{marginTop:5,flexDirection:'row',height:40,justifyContent:'space-around'}}>
        <View>
            <TouchableOpacity style={{flexDirection:'row' ,alignItems:'center'}}
            onLongPress={()=>this.emoji()}
            onPressOut={()=>this.emojiOut()}        
            onPress={() => alert('hello')}
            >
              <AntDesign style={{fontSize:18,color:'white'}} name="like2"/>
              <Text style={{fontSize:18,color:'white',marginLeft:3}}>Like</Text>
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
         {/* <Like></Like> */}
         {/* <Laugh/> */}
        </View>
    </View>
  );
}
}