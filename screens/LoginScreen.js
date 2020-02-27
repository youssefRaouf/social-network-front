import React, { Component } from 'react';
import { View, Image, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Linking } from 'expo';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { checkUser, getUserbyEmail } from '../services/Api';
import { AsyncStorage } from 'react-native';
import * as actions from '../Actions';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
let userInfo;
// export let Token;
export const updateToken = (token) => {
    Token = token
}
class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { userInfo: null };
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
                permissions: ['public_profile', 'email'],
            });
            console.log("youssef", type)
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),email`);
                userInfo = await response.json();
                await this.props.checkUser(userInfo.email)

                //   if(this.props.user===null){
                //       console.log(userInfo.picture.data.url)
                //       this.props.navigation.navigate('Phone',{user:userInfo})
                //   }else{
                //     //  Token=await getUserbyEmail(userInfo.email)   
                //     //  console.log(Token)              
                //       this.props.navigation.navigate('Home')
                //   }
                // this.setState({ userInfo });
                // console.log(userInfo)
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    async  componentDidMount() {
        this.props.fetchUser();
    }
    //  const  Token = await this._retrieveData();
    //     console.log(Token);
    //      if(Token){
    //          console.log(Token)
    //          this.props.navigation.navigate('Home')
    //      }
    //     }
    //      _retrieveData = async () => {
    //         try {
    //           let value = await AsyncStorage.getItem('token');
    //           console.log("el token",value)
    //           return value;
    //         } catch (error) {
    //           // Error retrieving data
    //         }
    //       };

    render() {
        if (this.props.token === null||this.props.token===undefined) {

        } else {
            console.log(this.props.token)
            this.props.navigation.navigate('Home')
        }
        if (this.props.loading === true) {
            console.log(this.props.token)
            if (this.props.token === null) {
                // console.log(userInfo.picture.data.url)
                this.props.navigation.navigate('Phone', { user: userInfo })
            } else {
                //  Token=await getUserbyEmail(userInfo.email)   
                //  console.log(Token)              
                this.props.navigation.navigate('Home')
            }
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#1F1F1F', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', height: 200, width: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 100, marginTop: -100, marginBottom: 100 }}>
                    <Text style={{ color: 'black', fontSize: 70 }}>LOGO</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#3B5999', flexDirection: 'row', alignItems: 'center', height: 30 }} onPress={() => this.logIn()} >
                    <FontAwesome name="facebook-official" style={{ fontSize: 20, color: 'white', marginLeft: 5 }} />
                    <Text style={{ color: 'white', fontSize: 18, marginLeft: 15, marginRight: 15 }}>login with Facebook</Text>
                </TouchableOpacity>
                {/* {this.state.userInfo!==null?<Image style={{height:200,width:200}} source={{ uri: this.state.userInfo.picture.data.url }}
                   
                />:null} */}
            </View>
        );
    }
}
LoginScreen.navigationOptions = {
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
        token: user.token,
        loading: user.loading
    };
};

const mapDispatchToProps = dispatch => ({
    checkUser: email => dispatch(actions.checkUser(email)),
    fetchUser: () => dispatch(actions.fetchUser()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreen);
