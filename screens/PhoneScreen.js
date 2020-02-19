import React, { Component } from 'react';
import { View,Image, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Linking } from 'expo';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { checkUser, createUser } from '../services/Api';

export default class PhoneScreen extends Component {
    constructor(props) {
        super(props)
     this.state={number:2};
    }

    async  logIn() {
        console.log(this.props.navigation.state.params.user)
       createUser(this.state.number,this.props.navigation.state.params.user)
    }

    render() {

        return (
            <View style={{ marginTop: 40 ,flex:1}}>
                 <TextInput
            // inputAccessoryViewID={'raoufwadie'}
            style={{ color: 'white', fontSize: 20 }}
            keyboardType={'numeric'}
            multiline={true}
            placeholder="enter your phone number"
            onChangeText={number => this.setState({ number })}
            value={this.state.number}
          />
          <TouchableOpacity onPress={()=>this.logIn()}><Text style={{color:'black'}}>enter</Text></TouchableOpacity>
            </View>
        );
    }
}
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