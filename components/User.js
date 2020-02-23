import React from 'react';
import { Text,View ,Image,TouchableOpacity,StyleSheet} from 'react-native';
import {AntDesign,Ionicons,Entypo, FontAwesome} from '@expo/vector-icons';
import { timeStamp } from '../services/timeStamp';
export default class User extends React.Component {

  makeEmoji(text, color, type) {
    this.props.makeEmoji(text, color, type);
  }

  render() {
    return (
        <View style={{marginLeft:10,height:50,flexDirection:'row',flex:1,marginTop:-7}}>
        <View>
            <Image source={{uri:this.props.item.user.image_url}}
            style={{height:50,width:50,borderRadius:25}}/>
        </View>
        <View style={{marginLeft:7,flexDirection:'column'}}>
          
          <Text style={{fontSize:16,color:'white'}}>{this.props.item.user.name}</Text>
    <Text style={{color:'#555555'}}>{timeStamp(this.props.item.created_at)}</Text>   
        </View>
        <View style={{flexDirection:'row-reverse',flex:1}}>
       <TouchableOpacity style={{alignItems:'flex-end',marginRight:10,marginTop:0}}>        
        <Entypo style={{fontSize:20,color:'#555555'}} name="dots-three-vertical"/>
        </TouchableOpacity>
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
