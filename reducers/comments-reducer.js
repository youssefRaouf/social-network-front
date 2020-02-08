import * as types from '../utils/Consts';

let COMMENTS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  offset: 1,
  hasMore: true,
  activeEvent: {},
  postId:0
};

function comments(state = COMMENTS_INITIAL_STATE, action) {
  switch (action.type) {
    
    case types.FETCH_COMMENTS:
      if(state.postId!==action.post_id){
        // console.log("el id",action.post_id)
        state=COMMENTS_INITIAL_STATE;
      }
      return {
        ...state,
        isLoading: action.refresh ? true : action.offset != 1 ? false : true,
        isFetching: true,
        list: action.refresh ? [] : state.list,
        offset: action.offset,
        hasMore: action.refresh ? true : state.hasMore,
        postId:action.post_id
      };
    case types.FETCH_COMMENTS_SUCCESS:
      // console.log("ng7",action.data)
      const list = action.data;
      const prevIds = state.list.map(item => item.id);
     
      // if(list){
     const  newItems = list.filter(item => !prevIds.includes(item.id));
      // }
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        list: state.list.concat(newItems),
        hasMore: list.length > 0,
      };
    case types.FETCH_COMMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
      case types.CREATE_COMMENT:
        return {
          ...state,
          isLoading: true,
          isFetching: true,
        };
      case types.CREATE_COMMENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };
      case types.CREATE_COMMENT_FAIL:
        return {
          ...state,
          isLoading: false,
          isFetching: false,
        };

        case types.COMMENTS_RECEIVED:
          const comment = action.comment;
          if(comment.post_id != state.postId){
            return state;
          }
          const prevCommentsIds = state.list.map(item => item.id);
          if(prevCommentsIds.includes(comment.id)){
            return state;
          }
          const newList = [comment, ...state.list].sort((a,b)=>a.id-b.id); 
          return {
            ...state,
            list: newList
          };
      default:
        return state;

}
}
export default comments;
