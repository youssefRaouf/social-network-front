import * as types from '../utils/Consts';

let FOLLOWERS_INITIAL_STATE = {
  listFollowers: [],
  listFollowings:[],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
  userId:0
};

function followers(state = FOLLOWERS_INITIAL_STATE, action) {
  switch (action.type) {
    
    case types.FETCH_FOLLOWERS:
      // if(state.userId!==action.userId){
      //   state=FOLLOWERS_INITIAL_STATE;
      //   state.userId=action.userId
      // }
      // console.log(action.userId)
      return {
        ...state,
        isLoading: true,
        isFetching: true,      };
    case types.FETCH_FOLLOWERS_SUCCESS:
      const list = action.data;
      const oldFollowers = (state[action.userId]&&state[action.userId].listFollowers) || []
      const prevIds = oldFollowers.map(item => item._id);
     const  newItems = list.filter(item => !prevIds.includes(item._id));
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        [action.userId]: {
          listFollowers: [...oldFollowers, ...newItems],
          listFollowings:(state[action.userId]&&state[action.userId].listFollowings)||[]
        },
        hasMore: list.length > 0,
      };
    case types.FETCH_FOLLOWERS_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
      case types.FETCH_FOLLOWINGS:
        // if(state.userId!==action.userId){
        //   state=FOLLOWERS_INITIAL_STATE;
        //   state.userId=action.userId
        // }
        console.log("followings",action.userId)
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    case types.FETCH_FOLLOWINGS_SUCCESS:
      const list1 = action.data;
      const oldFollowings = (state[action.userId]&&state[action.userId].listFollowings) || []
      const prevIds1 = oldFollowings.map(item => item._id);
     const  newItems1 = list1.filter(item => !prevIds1.includes(item._id));
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        [action.userId]: {
          listFollowings: [...oldFollowings, ...newItems1],
          listFollowers:(state[action.userId]&&state[action.userId].listFollowers)||[],
        },
        hasMore: list1.length > 0,
      };
    case types.FETCH_FOLLOWINGS_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
      case types.CREATE_FOLLOW:
        return {
          ...state,
          isLoading: true,
          isFetching: true,
        };
      case types.CREATE_FOLLOW_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
      case types.CREATE_FOLLOW_FAIL:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
        case types.DELETE_FOLLOW:
        return {
          ...state,
          isLoading: true,
          isFetching: true,
        };
      case types.DELETE_FOLLOW_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
      case types.DELETE_FOLLOW_FAIL:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
      default:
        return state;

}
}
export default followers;
