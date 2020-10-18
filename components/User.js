import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { timeStamp } from '../services/timeStamp';
import { connect } from 'react-redux';
import * as actions from '../Actions';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    return (
      <View style={{ marginLeft: 10, height: 50, flexDirection: 'row', marginTop: -7 }}>
        <View>
          <Image source={{ uri: this.props.user.image_url }}
            style={{ height: 50, width: 50, borderRadius: 25 }} />
        </View>
        <View style={{ marginLeft: 7, flexDirection: 'column' }}>
          <Text style={{ fontSize: 16, color: 'white' }}>{this.props.user.name}</Text>
          {this.props.item !== null ? <Text style={{ color: '#555555' }}>{timeStamp(this.props.item.created_at)}</Text> : null}
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

const mapStateToProps = ({ user }, props) => {
  return {
    _id: user.user._id
  };
};


const mapDispatchToProps = dispatch => ({
  createPosts: (text, url, videoName) => dispatch(actions.createPosts(text, url, videoName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);

