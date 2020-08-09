import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Dimensions
} from 'react-native';
import Post from '../components/Post';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { AntDesign, MaterialIcons, FontAwesome,Ionicons } from '@expo/vector-icons';
import { socket, getMyProfile } from '../services/Api'
import io from "socket.io-client";
import getEnv from '../configs';
import User from '../components/User';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text:''
    };
  }

  componentDidMount() {

  }

  search(offset = 0,text) {
    this.props.findUsers(offset,text)
  }
  renderItem(item) {
    item = item.item
    console.log(item)
    if(item.id!==this.props.user.id){
    return (
      <View style={{ marginTop: 7 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('User', { user: item })}>
          <User user={item} item={null} />
        </TouchableOpacity>
      </View>
    )
  }
  }

  render() {


    this.state.data = this.props.users;
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row',alignItems:'center',marginBottom:20}}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons style={{ marginLeft: 30, fontSize: 25, color: 'white' }} name="md-arrow-round-back" />
          </TouchableOpacity>
          <TextInput
            style={{paddingLeft:15, color: 'white', fontSize: 18, marginLeft: 10 ,height:40, backgroundColor: '#555555',width:Dimensions.get('screen').width-70,borderRadius:20}}
            multiline={true}
            placeholder=" Search ..."
            onChangeText={text => {
              this.setState({ text })
              this.search(0,text)
            }}
            value={this.state.text}
          />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item._id.toString()}
          onEndReached={() => {
            const offset = this.props.users.length;
            this.search(offset,this.state.text);
          }}
        // windowSize={2}
        />

      </View>
    );
  }
}
SearchScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#1F1F1F'
  },
});


const mapStateToProps = ({ user }, props) => {
  return {
    users: user.list,
    user:user.user
  };
};

const mapDispatchToProps = dispatch => ({
  findUsers: (offset, name) => dispatch(actions.findUsers(offset, name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchScreen);
