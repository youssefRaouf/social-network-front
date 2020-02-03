import React from 'react';
import { Text,View ,Image,TouchableOpacity,StyleSheet} from 'react-native';
import {AntDesign,Ionicons,Entypo, FontAwesome} from '@expo/vector-icons';
export default class Comment extends React.Component {

  makeEmoji(text, color, type) {
    this.props.makeEmoji(text, color, type);
  }

  render() {
    return (
        <View style={{marginLeft:10,height:50,flexDirection:'row',marginTop:20,marginBottom:20}}>
        <View>
            <Image source={{uri:'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'}}
            style={{height:50,width:50,borderRadius:25}}/>
        </View>
        <View style={{marginLeft:7,flexDirection:'column',borderRadius:20,paddingRight:10,backgroundColor:'#555555',paddingLeft:10,flex:1,marginRight:10}}>
    <Text style={{fontSize:16,color:'white',borderRadius:5,}}>{this.props.item.user.name}</Text>
          <Text style={{color:'white'}}>{this.props.item.text}</Text>
          <View style={{flexDirection:'row',paddingTop:10}}>
    <Text style={{color:'#555555'}}>{this.props.item.created_at}</Text>
         <TouchableOpacity style={{marginLeft:20}}><Text style={{color:'white'}}>Reply</Text></TouchableOpacity>   
        </View>    
        </View>
       </View>
        
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#1F1F1F',
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
