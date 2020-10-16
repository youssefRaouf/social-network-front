import * as types from '../utils/Consts';

let FOLLOWERS_INITIAL_STATE = {
  listFollowers: [],
  listFollowings: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
  userId: 0
};

function followers(state = FOLLOWERS_INITIAL_STATE, action) {
  switch (action.type) {

    case types.FETCH_FOLLOWERS:
      // if(state.userId!==action.userId){
      //   state=FOLLOWERS_INITIAL_STATE;
      //   state.userId=action.userId
      // }
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    case types.FETCH_FOLLOWERS_SUCCESS:
      const list = action.data;
      const oldFollowers = (state[action.userId] && state[action.userId].listFollowers) || []
      const prevIds = oldFollowers.map(item => item._id);
      const newItems = list.filter(item => !prevIds.includes(item._id));
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        [action.userId]: {
          ...state[action.userId],
          listFollowers: [...oldFollowers, ...newItems],
          listFollowings: (state[action.userId] && state[action.userId].listFollowings) || []
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
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    case types.FETCH_FOLLOWINGS_SUCCESS:
      const list1 = action.data;
      const oldFollowings = (state[action.userId] && state[action.userId].listFollowings) || []
      const prevIds1 = oldFollowings.map(item => item._id);
      const newItems1 = list1.filter(item => !prevIds1.includes(item._id));
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        [action.userId]: {
          ...state[action.userId],
          listFollowings: [...oldFollowings, ...newItems1],
          listFollowers: (state[action.userId] && state[action.userId].listFollowers) || [],
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
      const oldFollowers1 = (state[action.toUser] && state[action.toUser].listFollowers) || []
      let newItems2 = [...oldFollowers1];
      newItems2.push(action.data)
      const oldFollowings1 = (state[action.fromUser] && state[action.fromUser].listFollowings) || []
      let newItems5=[...oldFollowings1];
      newItems5.push(action.data);
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        [action.toUser]: {
          ...state[action.toUser],
          listFollowers: newItems2,
          followersCount: state[action.toUser].followersCount+1,
        },
        [action.fromUser]: {
          ...state[action.fromUser],
          listFollowings: newItems5,
          followingsCount: (state[action.fromUser]&&state[action.fromUser].followingsCount)+1,
        },
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
      const oldFollowers2 = (state[action.toUser] && state[action.toUser].listFollowers) || []
      const newItems3 = oldFollowers2.filter(item => item.from_user_id!=action.fromUser);
      const oldFollowings2 = (state[action.fromUser] && state[action.fromUser].listFollowings) || []
      const newItems4 = oldFollowings2.filter(item => item.to_user_id!=action.toUser);
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        [action.toUser]: {
          ...state[action.toUser],
          listFollowers: newItems3,
          followersCount: state[action.toUser].followersCount-1,
        },
        [action.fromUser]: {
          ...state[action.fromUser],
          listFollowings: newItems4,
          followingsCount: (state[action.fromUser]&&state[action.fromUser].followingsCount)-1,
        },
      };
    case types.DELETE_FOLLOW_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    case types.FETCH_FOLLOWERS_COUNT_USER_ID_SUCCESS:
      return {
        ...state,
        [action.user_id]: {
          ...state[action.user_id],
          followersCount: action.data,
        }
      }
    case types.FETCH_FOLLOWERS_COUNT_USER_ID_FAIL:
      return {
        ...state,
      };
    case types.FETCH_FOLLOWINGS_COUNT_USER_ID_SUCCESS:
      return {
        ...state,
        [action.user_id]: {
          ...state[action.user_id],
          followingsCount: action.data,
        }
      }
    case types.FETCH_FOLLOWINGS_COUNT_USER_ID_FAIL:
      return {
        ...state,
      };
    default:
      return state;

  }
}
export default followers;
