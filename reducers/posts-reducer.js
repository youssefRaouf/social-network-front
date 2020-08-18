import * as types from '../utils/Consts';

let POSTS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  user_id: ''
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
      const list = action.data || [];
      const prevIds = state.list.map(item => item._id);

      // if(list){
      const newItems = list.filter(item => !prevIds.includes(item._id));
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
      let list1 = []
      if (action.offset === 0) {
        list1 = [...action.data]
        return {
          ...state,
          isLoading: false,
          isFetching: false,
          [action.user_id]: {
            ...state[action.user_id],
            list: list1,
            hasMore: false,
          }
        };
      }
      const oldUserPosts = (state[action.user_id] && state[action.user_id].list) || []
      const listPosts = action.data || [];
      const prevIdsPosts = oldUserPosts.map(item => item._id);
      const newUserPosts = listPosts.filter(item => !prevIdsPosts.includes(item._id));
      list1 = [...oldUserPosts, ...newUserPosts].sort((a, b) => b._id - a._id)
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        [action.user_id]: {
          ...state[action.user_id],
          list: list1,
          hasMore: listPosts.length > 0 || false,
        }
      };
    case types.FETCH_POSTS_USER_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    case types.FETCH_POSTS_COUNT_USER_ID_SUCCESS:
      return {
        ...state,
        [action.user_id]: {
          ...state[action.user_id],
          postsCount: action.data,
        }
      }
    case types.FETCH_POSTS_COUNT_USER_ID_FAIL:
      return {
        ...state,
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
      const prevPostsIds = state.list.map(item => item._id);
      if (prevPostsIds.includes(post._id)) {
        return state;
      }
      const newList = [post, ...state.list].sort((a, b) => b._id - a._id);
      return {
        ...state,
        list: newList
      };
    case types.COMMENTS_COUNT_CHANGE:
      let oldUserPosts3 = (state[action.post.user_id] && state[action.post.user_id].list) || []
      const updatedUserPost2 = [...(oldUserPosts3.map(post => {
        if (post._id === action.post._id) {
          post = action.post
          return {
            ...post,
            commentsCount: action.commentsCount
          }
        }
        return post;
      }))]
      const newList1 = [...(state.list.map(post => {
        if (post._id === action.post._id) {
          return {
            ...post,
            commentsCount: action.commentsCount
          }
        }
        return post;
      }))];
      return {
        ...state,
        list: newList1,
        [action.post.user_id]: {
          ...state[action.post.user_id],
          list: updatedUserPost2
        }
      }
    case types.EMOJIS_COUNT_CHANGE:
      let oldUserPosts2 = (state[action.post.user_id] && state[action.post.user_id].list) || []
      const updatedUserPost = [...(oldUserPosts2.map(post => {
        if (post._id === action.post_id) {
          post = action.post
          return {
            ...post,
          }
        }
        return post;
      }))]
      const newList2 = [...(state.list.map(post => {
        if (post._id === action.post_id) {
          post = action.post
          return {
            ...post,
          }
        }
        return post;
      }))];
      return {
        ...state,
        list: newList2,
        [action.post.user_id]: {
          ...state[action.post.user_id],
          list: updatedUserPost
        }
      }
    default:
      return state;

  }
}
export default posts;
