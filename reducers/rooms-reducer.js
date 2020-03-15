import * as types from '../utils/Consts';

let ROOMS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
  roomId:0
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
    case types.CREATE_ROOM:
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    case types.CREATE_ROOM_SUCCESS:
      console.log("reducer",action.data.id)
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        roomId:action.data.id
        
      };
    case types.CREATE_ROOM_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };

    case types.UPDATE_ROOM:
   console.log(action);
   let itemNew;
    const newList1 = [...(state.list.map(item => {
        if(item.id === action.roomId){
          return {
            ...item,
            text: action.text,
            update_at: new Date().getTime()
          }
        }else{
        return item;
        }
      }))];
      // console.log("hna aho ya 3m",itemNew)
      // newList1.push(itemNew);
     let newList2= [...newList1].sort((a,b)=>b.update_at-a.update_at)
      return {
        ...state,
        list: newList2,
      };
    default:
      return state;

  }
}
export default rooms;
