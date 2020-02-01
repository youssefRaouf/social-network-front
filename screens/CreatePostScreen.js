import React, { Component } from 'react';
import { Text,View ,Image,TouchableOpacity,TextInput} from 'react-native';
import {AntDesign,Ionicons,Entypo, FontAwesome} from '@expo/vector-icons';
import {createPost} from '../services/Api'
export default  class  CreatePostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text:'' };
  }
  render(){
  return (
    <View style={{backgroundColor:'#1F1F1F',height:300000}}>
    
    <View style={{flexDirection:'row',marginTop:40,borderBottomWidth:2,paddingBottom:5,borderColor:'#555555'}}>
      <TouchableOpacity> 
      <Ionicons style={{marginLeft:30,fontSize:25,color:'white'}} name="md-arrow-round-back"/>
      </TouchableOpacity>
        <Text style={{color:'white' ,fontSize:20 , marginLeft:20}}>Create Post</Text>
        <View style={{flexDirection:'row-reverse',flex:1,alignItems:'center'}}>
       <TouchableOpacity style={{alignItems:'flex-end',marginRight:10,marginTop:0}}
       disabled={this.state.text?false:true}
       onPress={()=>createPost("second post from expo",1)}
       >        
             <Text style={{fontSize:20,color:this.state.text?'white':'grey'}}>Post</Text>
        </TouchableOpacity>
        </View>
    </View>
    <View style={{marginLeft:10,height:50,flexDirection:'row',marginTop:10}}>
        <View>
            <Image source={{uri:'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'}}
            style={{height:50,width:50,borderRadius:25}}/>
        </View>
        <View style={{marginLeft:10,flexDirection:'column'}}>
          <Text style={{fontSize:18,color:'white'}}>Youssef Raouf</Text>
        </View>
        <View style={{flexDirection:'row-reverse',flex:1}}>
       <TouchableOpacity style={{alignItems:'flex-end',marginRight:10,marginTop:0}}>        
        <Entypo style={{fontSize:25,color:'#555555'}} name="dots-three-vertical"/>
        </TouchableOpacity>
        </View>
       </View>
       <View style={{flex:1,marginTop:10,marginLeft:10,marginRight:10}}>
       <TextInput
          style={{color:'white',fontSize:20 }}
          multiline = {true}
          placeholder="What's on your mind, Youssef?"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
    </View>
    </View>
  );
}
}
// CreatePostScreen.navigationOptions = {
//   header: null,
// };