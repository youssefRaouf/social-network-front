import * as types from '../utils/Consts';

let POSTS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
  user_id:''
};

function posts(state = POSTS_INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        isLoading: action.refresh ? true : action.offset != 1 ? false : true,
        isFetching: true,
        list: action.refresh ? [] : state.list,
        offset: action.offset,
        hasMore: action.refresh ? true : state.hasMore,
      };
    case types.FETCH_POSTS_SUCCESS:
      const list = action.data||[];
      const prevIds = state.list.map(item => item.id);
     
      // if(list){
     const  newItems = list.filter(item => !prevIds.includes(item.id));
      // }
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        list: state.list.concat(newItems),
        hasMore: list.length > 0,
      };
      case types.FETCH_POSTS_USER_ID:
        return {
          ...state,
          isLoading: true,
          isFetching: true,
        };
      case types.FETCH_POSTS_USER_ID_SUCCESS:
        // console.log("lolll",action.user_id)
        const oldUserPosts = (state[action.user_id]&&state[action.user_id].list) || []
        const listPosts = action.data||[];
        const prevIdsPosts = oldUserPosts.map(item => item.id);
       
        // if(list){
       const  newUserPosts = listPosts.filter(item => !prevIdsPosts.includes(item.id));
        // }
        return {
          ...state,
          isLoading: false,
          isFetching: false,
          [action.user_id]: {
            list: [...oldUserPosts, ...newUserPosts],
            hasMore: listPosts.length > 0
          }
        };
      case types.FETCH_POSTS_USER_ID_FAIL:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
  
    case types.FETCH_POSTS_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
      case types.CREATE_POST:
        return {
          ...state,
          isLoading: true,
          isFetching: true,
        };
      case types.CREATE_POST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
      case types.CREATE_POST_FAIL:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
      case types.POSTS_RECEIVED:
          const post = action.post;
          const prevPostsIds = state.list.map(item => item.id);
          if(prevPostsIds.includes(post.id)){
            return state;
          }
          const newList = [post, ...state.list].sort((a,b)=>b.id-a.id); 
          return {
            ...state,
            list: newList
          };
      case types.COMMENTS_COUNT_CHANGE:
        const newList1 = [...(state.list.map(post => {
          if(post.id === action.post_id){
            return {
              ...post,
              comments: action.commentsCount
            }
          }
          return post;
        }))];
        // console.log(newList1)
        return{
          ...state,
          list: newList1
        }    
        case types.EMOJIS_COUNT_CHANGE:
      
          const newList2 = [...(state.list.map(post => {
            if(post.id === action.post_id){
              post=action.post
              return {
                ...post,
                // emojisCount: action.emojisCount
              }
            }
            return post;
          }))];
          // console.log(newList1)
          return{
            ...state,
            list: newList2
          }    
      default:
        return state;

}
}
export default posts;
