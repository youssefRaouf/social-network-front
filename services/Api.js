import { AsyncStorage } from 'react-native';
import {Token} from '../screens/LoginScreen'
import getEnv from '../configs';
export const baseUrl = getEnv().baseUrl;
//  async function _retrieveData  () {
//      try {
//        const value = await AsyncStorage.getItem('token');
//        return value;
//      } catch (error) {
//        // Error retrieving data
//      }
//    };
//       let token=  await _retrieveData();
// export const baseUrl = 'https://social-network123.herokuapp.com/';
  function doRequest(url, options = {}, data = {}) {
    // console.log("ya 3mmmyy feeen 3mo el hearder",Token)
    const queryString = Object.keys(data)
      .map(key => key + '=' + data[key])
      .join('&');
    return fetch(`${baseUrl}${url}?${queryString}`,{headers:{  Accept: 'application/json',
    'Content-Type': 'application/json',
    token: Token}});
  }

  const getPosts = (offset) => {
    const limit =15;
    const eventsRequest = () => {
        return doRequest('posts', {method: 'GET'}, {offset,limit});
    };
    return eventsRequest()
      .then(response => response.json())
  };

  function  createPost (text,url,videoName){
    console.log("fel create",Token)
 return fetch(baseUrl+'posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: Token
    },
    body: JSON.stringify({
      text: text,
      url: url,
      video_name:videoName,
    }),
  }).then(response=>response.json());
}
const getCommentsByPostId = (offset,post_id) => {
  const limit =15;
  const eventsRequest = () => {
      return doRequest(`${'posts/'}${post_id}${'/comments'}`, {method: 'GET'}, {offset,limit});
  };
  return eventsRequest()
    .then(response => response.json())
};
async function getUserbyEmail(email) {
  console.log("d5lna gwa el user")
 const session =await fetch(baseUrl+'users/'+email, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token:'null'
  },
}).then(response=>response.json())
await _storeData(session)
  return session;
}
function  createComment (text,post_id,parent_id){
  return fetch(baseUrl+'comments', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       token:Token
     },
     body: JSON.stringify({
       text: text,
       post_id: post_id,
       parent_id:parent_id
     }),
   }).then(response=>response.json())
 }
 function  createEmoji (type,post_id){
   console.log("yoyou",post_id)
  return fetch(baseUrl+'emojis', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       token:Token
     },
     body: JSON.stringify({
       type: type,
       post_id: post_id,
     }),
   }).then(response=>response.json())
 }

 function  updateEmoji (type,post_id){
  console.log(type,post_id)
 return fetch(baseUrl+'emojis', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token:Token
    },
    body: JSON.stringify({
      type: type,
      post_id: post_id,
    }),
  }).then(response=>response.json()).then(response=> console.log(response))
}
function  deleteEmoji (post_id){
  // console.log("yoyou",post_id)
 return fetch(baseUrl+'emojis', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token:Token
    },
    body: JSON.stringify({
      post_id: post_id,
    }),
  }).then(response=>response.json())
}
function  checkUser (email){
  // console.log(email)
  // console.log(Token)
 return fetch(baseUrl+'checkUsers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token:null
    },
    body: JSON.stringify({
      email:email,
    }),
  }).then(response=>response.json())
}
const _storeData = async (token) => {
  try {
    console.log("el token ya 3moo",token)
    await AsyncStorage.setItem('token',token);
  } catch (error) {
    // Error saving data
  }
};

async function  createUser (phone,user){
  // console.log(user.email)
 const session= await fetch(baseUrl+'Users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // token
    },
    body: JSON.stringify({
      name:user.name,
      email:user.email,
      phone:phone,
      image_url:user.picture.data.url
    }),
  }).then(response=>response.json())
  // console.log(Token)
 await _storeData(session);
  return session;
}
function  getMyProfile (){
 return fetch(baseUrl+'users/profile/myProfile', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token:Token
    },
  }).then(response=>response.json())
}
  // this.socket = io("http://192.168.1.7:4000");
// const socket=this.socket;

export {createPost,getPosts,getCommentsByPostId,createComment,createEmoji,updateEmoji,deleteEmoji,checkUser,createUser,getUserbyEmail,getMyProfile};
