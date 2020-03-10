import * as types from '../utils/Consts';

let ROOMS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
};
function rooms(state = ROOMS_INITIAL_STATE, action) {
  switch (action.type) {

    case types.FETCH_ROOMS:
      return {
        ...state,
        isLoading: action.refresh ? true : action.offset != 1 ? false : true,
        isFetching: true,
        list: action.refresh ? [] : state.list,
        offset: action.offset,
        hasMore: action.refresh ? true : state.hasMore,
      };
    case types.FETCH_ROOMS_SUCCESS:
      // console.log("ng7",action.data)
      const list = action.data;
      const prevIds = state.list.map(item => item.id);

      // if(list){
      const newItems = list.filter(item => !prevIds.includes(item.id));
      // }
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        list: state.list.concat(newItems),
        hasMore: list.length > 0,
      };
    case types.FETCH_ROOMS_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    // case types.CREATE_MESSAGE:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     isFetching: true,
    //   };
    // case types.CREATE_MESSAGE_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isFetching: false,
    //   };
    // case types.CREATE_MESSAGE_FAIL:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isFetching: false,
    //   };

    // case types.MESSAGES_RECEIVED:
    //   console.log("hna")
    //   const message = action.message;
    //   let from;
    //   let to;
    //   if (message.from_user < message.to_user) {
    //     from = message.from_user;
    //     to = message.to_user;
    //   } else {
    //     to = message.from_user;
    //     from = message.to_user;
    //   }
    //   if (from != state.fromUser || to != state.toUser) {
    //     return state;
    //   }
    //   const prevMessagesIds = state.list.map(item => item.id);
    //   if (prevMessagesIds.includes(message.id)) {
    //     return state;
    //   }
    //   const newList = [message, ...state.list].sort((a, b) => b.id - a.id);
    //   return {
    //     ...state,
    //     list: newList,
    //   };
    default:
      return state;

  }
}
export default rooms;
