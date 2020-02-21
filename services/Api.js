import { AsyncStorage } from 'react-native';
const apiKey =
  'cda11v2OkqSI1rhQm37PBXKnpisMtlaDzoc4w0U6uNATgZRbJG&fbclid=IwAR0xMMxqpz0NIJwy9L5hq7qKTPrNQZwRaBCebgRVCxIq5fkO4oYIT1wsp2E';
export const baseUrl = 'http://192.168.1.3:4000/';
// export const baseUrl = 'https://social-network123.herokuapp.com/';
  function doRequest(url, options = {}, data = {}) {
    // console.log(url)
    let headers = {};
    if (options) {
      headers = {
        ...headers,
        ...options.headers,
      };
    }
    const queryString = Object.keys(data)
      .map(key => key + '=' + data[key])
      .join('&');
    return fetch(`${baseUrl}${url}?${queryString}`);
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
 return fetch(baseUrl+'posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

function  createComment (text,post_id,parent_id){
  return fetch(baseUrl+'comments', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
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
    },
    body: JSON.stringify({
      post_id: post_id,
    }),
  }).then(response=>response.json())
}
function  checkUser (email){
  console.log(email)
 return fetch(baseUrl+'checkUsers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email:email,
    }),
  }).then(response=>response.json())
}
const _storeData = async (token) => {
  try {
    await AsyncStorage.setItem('token',token);
  } catch (error) {
    // Error saving data
  }
};

function  createUser (phone,user){
  console.log(user.email)
 return fetch(baseUrl+'Users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // token
    },
    body: JSON.stringify({
      name:user.name,
      email:user.email,
      phone:phone
    }),
  }).then(response=>response.json()).then(response=> _storeData(response))
}
  // this.socket = io("http://192.168.1.7:4000");
// const socket=this.socket;

export {createPost,getPosts,getCommentsByPostId,createComment,createEmoji,updateEmoji,deleteEmoji,checkUser,createUser};
