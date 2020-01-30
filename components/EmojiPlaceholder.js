import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Laugh from './Laugh';
import Sad from './Sad';
import Wow from './Wow';
import Angry from './Angry';
import Love from './Love';

export default class EmojiPlaceholder extends React.Component {

  makeEmoji(text,color,type){
    this.props.makeEmoji(text, color, type);
  }

  render() {
    return (
      <View style={{height:50,backgroundColor:'#1F1F1F',flexDirection:'row',position:'absolute',bottom:70,justifyContent:'space-evenly',borderRadius:20,borderWidth:2,borderColor:'#1F1F1',marginLeft:10,paddingLeft:10,paddingRight:-5}}>
        <Laugh height={30} onPress={()=>this.makeEmoji("Haha",'#FCDD68',Laugh)} style={{width:40}}/>
        <Sad height={30} onPress={()=>this.makeEmoji("Sad",'#FCDD68',Sad)} style={{width:40}}/>
        <Wow height={30} onPress={()=>this.makeEmoji("Wow",'#FCDD68',Wow)} style={{width:40}}/>
        <Angry height={30} onPress={()=>this.makeEmoji("Angry","red",Angry)} style={{width:40}}/>
        <Love height={30} onPress={()=>this.makeEmoji("Love",'red',Love)} style={{width:40}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#1F1F1F',
    height:30,
    width:30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
