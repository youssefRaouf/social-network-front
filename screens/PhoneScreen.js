import React, { Component } from 'react';
import { View, Image, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { updateToken } from '../screens/LoginScreen'
import {  createUser } from '../services/Api';
import { connect } from 'react-redux';
import * as actions from '../Actions';
 class PhoneScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { number: 2 };
    }

    async  logIn() {
        console.log(this.props.navigation.state.params.user)
        this.props.createUser(this.state.number, this.props.navigation.state.params.user)
        if(this.props.loading){
            console.log("5lsna creationnnnn")
        this.props.navigation.navigate('Home')
        }
    }

    render() {
        const screeenWidth = Math.round(Dimensions.get('window').width);
        return (
            <View style={{ flex: 1, backgroundColor: '#1F1F1F', justifyContent: 'center',}}>
                <View style={{marginLeft:10, alignItems:'center',backgroundColor: 'rgb(28, 42, 58)', width: screeenWidth - 20, borderRadius: 20, height: 60, justifyContent: 'center',marginBottom:5 }}>
                    <TextInput
                        style={{ color: 'white', fontSize: 18, marginLeft: 5 }}
                        multiline={true}
                        keyboardType='numeric'
                        placeholder="     enter your phone number"
                        onChangeText={text => this.setState({ number:text })}
                        value={this.state.text}
                    />
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={() => this.logIn()} style={{ marginRight:20}}><Text style={{ color: 'white', fontSize: 20 }}>submit</Text></TouchableOpacity>
                </View>

            </View>
        );
    }
}
PhoneScreen.navigationOptions = {
    header: null,
};
const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
    },
});
const mapStateToProps = ({ user }, props) => {
    // const { activePost, isLoading } = posts;
    return {
      user: user.user || null,
      loading:user.loading1
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    createUser: (number,user) => dispatch(actions.createUser(number,user)),
    // postsReceived: post => dispatch(actions.postsReceived(post)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PhoneScreen);
  