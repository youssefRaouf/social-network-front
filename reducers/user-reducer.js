import * as types from '../utils/Consts';

let INITIAL_STATE = {
  loading: false,
  loading1:false
};

function user(state = INITIAL_STATE, action) {
  // console.log("s")
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
    let fetchUser =JSON.parse( action.data[0]) || null;
    console.log("d5lna el fetch", fetchUser)
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
      console.log("creation be nga7")
      return {
        ...state,
        user: createUser,
        token: createToken,
        loading1: true
      };
    case types.CREATE_USER_FAIL:
      console.log("lol",action.error)
      return state
    case types.CHECK_USER_SUCCESS:
      let user =  action.data[0]|| '';
      let token = action.data[1] || null;
      console.log("ya rb tesht8l", user, token)
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
