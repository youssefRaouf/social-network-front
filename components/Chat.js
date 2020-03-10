import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { timeStamp } from '../services/timeStamp';
import User from './User';
export default class Chat extends React.Component {


  render() {
    return (
      <View style={{ marginLeft: 10,marginBottom:30}}>
        <User user={this.props.user} item={null} />
        <View style={{marginTop:-20}}>
     <Text style={{ color: 'white', marginLeft: 70,}}>{this.props.item.lastMessage}</Text>
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
