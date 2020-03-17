
const envName = 'dev';
const env = {
    dev:{
        baseUrl: 'http://192.168.1.6:4000/',
        socket: {
            comments: 'http://192.168.1.6:4000/posts/comments',
            posts: 'http://192.168.1.6:4000/posts',
            reactions: 'http://192.168.1.6:4000/posts/reactions' ,
            messages: 'http://192.168.1.6:4000/chat'  ,
            rooms: 'http://192.168.1.6:4000/room'    

        }
    },
    production: {
        baseUrl: 'https://social-network123.herokuapp.com/',
        socket: {
            comments: 'https://social-network123.herokuapp.com/posts/comments',
            posts: 'https://social-network123.herokuapp.com/posts',
            reactions: 'https://social-network123.herokuapp.com/posts/reactions' ,
            messages: 'https://social-network123.herokuapp.com/chat'    

        }
    }
}

const getEnv = ()=>{
    return env[envName];
}

export default getEnv;