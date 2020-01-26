import React from 'react';
import { Text,View ,Image} from 'react-native';

export function Post(props) {
  return (
      <View style={{marginLeft:20,marginRight:20}}>
       <View style={{height:50,flexDirection:'row'}}>
        <View>
            <Image source={{uri:'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'}}
            style={{height:50,width:50,borderRadius:25}}/>
        </View>
        <View style={{marginLeft:10,flexDirection:'column'}}>
        <Text style={{fontSize:18}}>youssef raouf</Text>
        <Text>6 hr</Text>    
        </View>   
       </View>
       <Text style={{marginTop:5,fontSize:15}}>this is my first post ever </Text>
       <Image source={{uri:'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg'}}
            style={{height:300}}/>
       <View style={{flexDirection:'row',height:40}}>
        <View>
            <Text>Like</Text>
        </View>
        <View></View>
        <View></View>
       </View>
    </View>
  );
}
