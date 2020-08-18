import * as types from '../utils/Consts';

let ROOMS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
  roomId: 0
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
      const list = action.data;
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
    case types.FETCH_ROOMS_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    case types.CREATE_ROOM:
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    case types.CREATE_ROOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        roomId: action.data.id

      };
    case types.CREATE_ROOM_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };

    case types.UPDATE_ROOM:
      const newList1 = [...(state.list.map(item => {
        if (item._id === action.roomId) {
          return {
            ...item,
            text: action.text,
            update_at: new Date().getTime()
          }
        } else {
          return item;
        }
      }))];
      // newList1.push(itemNew);
      for (let i = 0; i < newList1.length; i++) {
        if (newList1[i]._id === action.roomId) {
          for (let j = i; j > 0; j--) {
            let temp = newList1[j];
            newList1[j] = newList1[j - 1];
            newList1[j - 1] = temp;
          }
        }
      }
      //  let newList2= [...newList1].sort((a,b)=>b.update_at-a.update_at)
      return {
        ...state,
        list: newList1,
      };
    default:
      return state;

  }
}
export default rooms;
