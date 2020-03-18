import * as types from '../utils/Consts';

let INITIAL_STATE = {
  loading: false,
  loading1:false,
  list: [],
  offset: 1,
  hasMore: true,
  isLoading: false,
  name:''
};

function user(state = INITIAL_STATE, action) {
  // console.log("s")
  switch (action.type) {
    case types.FIND_USERS:
      if(state.name!==action.name){
        state.list=INITIAL_STATE.list;
        state.offset=INITIAL_STATE.offset;
        state.hasMore=INITIAL_STATE.hasMore;
        state.isLoading=INITIAL_STATE.isLoading;
        state.name=action.name;
      }
      return {
        ...state,
        isLoading: action.refresh ? true : action.offset != 1 ? false : true,
        isFetching: true,
        list: action.refresh ? [] : state.list,
        offset: action.offset,
        hasMore: action.refresh ? true : state.hasMore,
      };
    case types.FIND_USERS_SUCCESS:
      const list = action.data||[];
      const prevIds = state.list.map(item => item.id);
      const newItems = list.filter(item => !prevIds.includes(item.id));
      // }
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        list: state.list.concat(newItems),
        hasMore: list.length > 0,
      };
    case types.FIND_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    case types.FETCH_USER_SUCCESS:
    let fetchUser =JSON.parse( action.data[0]) || null;
    let fetchToken = action.data[1] || null;
      return {
        ...state,
        user: fetchUser,
        token: fetchToken,
      };
    case types.FETCH_USER_FAIL:
      return state
    case types.CREATE_USER_SUCCESS:
      let createUser = action.data[0]||'';
      let createToken = action.data[1] || null;
      return {
        ...state,
        user: createUser,
        token: createToken,
        loading1: true
      };
    case types.CREATE_USER_FAIL:
      return state
    case types.CHECK_USER_SUCCESS:
      let user =  action.data[0]|| '';
      let token = action.data[1] || null;
      return {
        ...state,
        user,
        token,
        loading: true
      };
    case types.CHECK_USER_FAIL:
      console.log(action.error)
      return state
    default:
      return state;


  }
}
export default user;
