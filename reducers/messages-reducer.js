import * as types from '../utils/Consts';

let MESSAGES_INITIAL_STATE = {
  list: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
  roomId: 0,
};
function messages(state = MESSAGES_INITIAL_STATE, action) {
  switch (action.type) {

    case types.FETCH_MESSAGES:
    
      if (state.roomId != action.id) {
        console.log("hn3mlha mra w7da isa")
        state=MESSAGES_INITIAL_STATE;
        state.roomId=action.id
      }
      return {
        ...state,
        isLoading: action.refresh ? true : action.offset != 1 ? false : true,
        isFetching: true,
        list: action.refresh ? [] : state.list,
        offset: action.offset,
        hasMore: action.refresh ? true : state.hasMore,
      };
    case types.FETCH_MESSAGES_SUCCESS:
      // console.log("ng7",action.data)
      const list = action.data;
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
    case types.FETCH_MESSAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    case types.CREATE_MESSAGE:
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    case types.CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    case types.CREATE_MESSAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };

    case types.MESSAGES_RECEIVED:
      console.log("hna")
      const message = action.message;
      if (message.room_id != state.roomId ) {
        return state;
      }
      const prevMessagesIds = state.list.map(item => item._id);
      if (prevMessagesIds.includes(message._id)) {
        return state;
      }
      const newList = [message, ...state.list].sort((a, b) => b._id - a._id);
      return {
        ...state,
        list: newList,
      };
    default:
      return state;

  }
}
export default messages;
