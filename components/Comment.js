import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { timeStamp, timeStamp1 } from '../services/timeStamp'
export default class Comment extends React.Component {

  makeEmoji(text, color, type) {
    this.props.makeEmoji(text, color, type);
  }

  render() {
    return (
      <View style={{ paddingTop: 20, paddingBottom: 20, borderBottomColor: 'grey', borderWidth: 0.5 }}>
        <View style={{ position: 'absolute', right: 10, top: 0 }}>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            iconLeft
            transparent
          >
            <Ionicons
              name="ios-more"
              style={{ color: 'grey', fontSize: 25 }}
            // style={[optionsIcon, { display: hideMoreBtn ? 'none' : 'flex' }]}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Image source={{ uri: this.props.item.user.image_url }}
            style={{ height: 35, width: 35, borderRadius: 17.5 }} />
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', }}>{this.props.item.user.name}</Text>
              <Text style={{ color: 'grey', marginLeft: 20, fontSize: 13 }}>{timeStamp(this.props.item.created_at)}</Text>
            </View>
            <Text style={{ color: 'grey', fontSize: 16 }}>{this.props.item.text}</Text>
          </View>
        </View>
        <TouchableOpacity iconLeft transparent style={{ marginLeft: 55, marginTop: 10 }}    >
          {/* <Image source={require('../assets/images/comment.jpeg')}
        /> */}
          <FontAwesome style={{ fontSize: 18, color: 'white' }} name="comment-o" />
        </TouchableOpacity>
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
