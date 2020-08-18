import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { timeStamp, timeStamp1 } from '../services/timeStamp';
import User from './User';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import io from "socket.io-client";
import getEnv from '../configs';

export class Chat extends React.Component {

  componentDidMount() {
    const rooms = io.connect(getEnv().socket.rooms)
    rooms.on('new_message' + this.props.item._id, (data) => {
      console.log("room socket")
      this.props.updateRoom(data.text, data.room_id)
    })
  }
  render() {
    return (
      <View style={{ marginLeft: 10, marginBottom: 30 }}>
        <User user={this.props.user} item={null} />
        <View style={{ marginTop: -25, flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>
          <Text style={{ color: 'grey', marginLeft: 70, }}>{this.props.item.lastMessage}</Text>
          <Text style={{ color: 'grey', marginLeft: 10, }}> {timeStamp1(this.props.item.update_at)}</Text>
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

const mapStateToProps = ({ }, props) => {
  return {
  };
};
const mapDispatchToProps = dispatch => ({
  updateRoom: (text, roomId) => dispatch(actions.updateRoom(text, roomId)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

