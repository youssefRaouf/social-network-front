import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { timeStamp } from '../services/timeStamp';
import User from './User';
export default class Message extends React.Component {


  render() {
    return (
      <View style={{ marginLeft:10,marginBottom:15,marginRight:10,alignSelf:this.props.item.from_user===this.props.id?'flex-end':'flex-start'}}>
    <Text style={{ color: 'white',backgroundColor:'rgb(26, 33, 42)',borderRadius:20,padding:5}}>{this.props.item.text}</Text>
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
