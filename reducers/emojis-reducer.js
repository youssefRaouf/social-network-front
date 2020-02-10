import * as types from '../utils/Consts';

let EMOJIS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
  postId:0
};

function emojis(state = EMOJIS_INITIAL_STATE, action) {
  // console.log("s")
  switch (action.type) {
    

      case types.CREATE_EMOJI:
        // console.log("gwa el reducer")
        return {
          ...state,
          isLoading: true,
          isFetching: true,
        };
      case types.CREATE_EMOJI_SUCCESS:
        // console.log("gwa el reducer2")

        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
      case types.CREATE_EMOJI_FAIL:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
        case types.UPDATE_EMOJI:
          // console.log("gwa el reducer")
          return {
            ...state,
            isLoading: true,
            isFetching: true,
          };
        case types.UPDATE_EMOJI_SUCCESS:
          // console.log("gwa el reducer2")
  
          return {
            ...state,
            isLoading: false,
            isFetching: false,
          };
        case types.UPDATE_EMOJI_FAIL:
          return {
            ...state,
            isLoading: false,
            isFetching: false,
          };
          case types.DELETE_EMOJI:
          // console.log("gwa el reducer")
          return {
            ...state,
            isLoading: true,
            isFetching: true,
          };
        case types.DELETE_EMOJI_SUCCESS:
          // console.log("gwa el reducer2")
  
          return {
            ...state,
            isLoading: false,
            isFetching: false,
          };
        case types.DELETE_EMOJI_FAIL:
          return {
            ...state,
            isLoading: false,
            isFetching: false,
          };
      default:
        return state;

}
}
export default emojis;
