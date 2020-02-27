import { AsyncStorage } from 'react-native';
import getEnv from '../configs';
import { connect } from 'react-redux';

export const baseUrl = getEnv().baseUrl;
let Token 
 async function doRequest(url, options = {}, data = {}) {
  let dataUser= await fetchUser()
   Token = dataUser[1]
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
  const getPostsByUserId = (offset,user_id) => {
    const limit =15;
    const eventsRequest = () => {
        return doRequest('users/'+user_id+'/posts', {method: 'GET'}, {offset,limit});
    };
    return eventsRequest()
      .then(response => response.json())
  };

  function  createPost (text,url,videoName){
   console.log(Token)
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

async function  createComment (text,post_id,parent_id){

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
  async function  createEmoji (type,post_id){
 
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

  async function  updateEmoji (type,post_id){
  
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
 async function  deleteEmoji (post_id){
 
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
async function  checkUser (email){
  // console.log(email)
  // console.log(Token)
  let data= await fetch(baseUrl+'checkUsers', {
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
  console.log("el data ely rg3a ml check",data)

  await _storeData(data[0],data[1])
  console.log("5lsna saving")
  // if(data[0]!==null){await _storeData(data[0],data[1])
  // console.log("lol",data[1])
// return data;}
  return data;
}
const _storeData = async (user,token) => {
  try {
    console.log("bnsyev")
    if(user!==null&&token!==null){
    const strData = JSON.stringify(user);
    await AsyncStorage.setItem('user',strData);
    await AsyncStorage.setItem('token',token);
    console.log("syvna")
    }
  } catch (error) {
    // Error saving data
    console.log(error)
  }
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
async function  createUser (phone,user){
  console.log(phone)
 let data= await fetch(baseUrl+'Users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token:'null'
    },
    body: JSON.stringify({
      name:user.name,
      email:user.email,
      phone:phone,
      image_url:user.picture.data.url
    }),
  }).then(response=>response.json())
  console.log(data)
  await _storeData(data[0],data[1])
  return data;
}
async function  getMyProfile (){

 return fetch(baseUrl+'users/profile/myProfile', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token:Token
    },
  }).then(response=>response.json())
} 
 async function fetchUser() {
  try {
    let token = await AsyncStorage.getItem('token');
    let user = await AsyncStorage.getItem('user');
    // user=JSON.parse(user)
    return [user,token];
  } catch (error) {
    // Error retrieving data
  }
};


export {createPost,getPosts,getCommentsByPostId,createComment,createEmoji,updateEmoji,deleteEmoji,checkUser,createUser,getUserbyEmail,getMyProfile,getPostsByUserId,fetchUser};
