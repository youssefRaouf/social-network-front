
const envName = 'dev';
const env = {
    dev:{
        baseUrl: 'http://192.168.1.5:4000/',
        socket: {
            comments: 'http://192.168.1.5:4000/posts/comments',
            posts: 'http://192.168.1.5:4000/posts',
            reactions: 'http://192.168.1.5:4000/posts/reactions'    
        }
    },
    production: {
        baseUrl: 'https://social-network123.herokuapp.com/',
        socket: {
            comments: 'https://social-network123.herokuapp.com/posts/comments',
            posts: 'https://social-network123.herokuapp.com/posts',
            reactions: 'https://social-network123.herokuapp.com/posts/reactions'    
        }
    }
}

const getEnv = ()=>{
    return env[envName];
}

export default getEnv;