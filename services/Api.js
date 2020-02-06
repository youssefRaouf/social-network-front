import io from "socket.io-client";

const apiKey =
  'cda11v2OkqSI1rhQm37PBXKnpisMtlaDzoc4w0U6uNATgZRbJG&fbclid=IwAR0xMMxqpz0NIJwy9L5hq7qKTPrNQZwRaBCebgRVCxIq5fkO4oYIT1wsp2E';
export const baseUrl = 'http://192.168.1.7:4000/';
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

  function  createPost (text,user_id){
 return fetch(baseUrl+'posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      user_id: user_id,
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
   }).then(response=>response.json()).then(response=>console.log(response));
 }
  this.socket = io("http://192.168.1.7:4000");
const socket=this.socket;

export {createPost,getPosts,getCommentsByPostId,createComment,socket};
