import React, { Component } from 'react';
import { View,Image, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Linking } from 'expo';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { checkUser } from '../services/Api';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
     this.state={userInfo:null};
    }

    async  logIn() {
        try {
            await Facebook.initializeAsync('626219424879904');
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile','email'],
            });
            console.log("youssef",type)
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),email`);
                const userInfo = await response.json();
              const user= await checkUser(userInfo.email);
            //   console.log(user)
              if(user===null){
                  this.props.navigation.navigate('Phone',{user:userInfo})
              }else{
                  this.props.navigation.navigate('Home')
              }
                // this.setState({ userInfo });
                // console.log(userInfo)
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    componentDidMount(){
     const token=  this._retrieveData();

    }
     _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          return value;
        } catch (error) {
          // Error retrieving data
        }
      };

    render() {

        return (
            <View style={{ marginTop: 40 ,flex:1}}>
                <TouchableOpacity style={{backgroundColor:'blue',width:200}} onPress={() => this.logIn()} >
                    <Text style={{ color: 'white', fontSize: 18 }}>login with Facebook</Text>
                </TouchableOpacity>
               {/* {this.state.userInfo!==null?<Image style={{height:200,width:200}} source={{ uri: this.state.userInfo.picture.data.url }}
                   
                />:null} */}
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