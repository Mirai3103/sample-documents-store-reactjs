const initState = {
  data: [],
  allTags: [],
  searchData: []
};
function init(data) {
  return { ...data };
}
const SET_DATA = 'SET_DATA';
const SET_ALL_TAGS = 'SET_ALL_TAGS';
const SET_SEARCH_DATA = 'SET_SEARCH_DATA';
const setSearchData = (data) => ({
  type: SET_SEARCH_DATA,
  data
});
const setAllTags = (allTags) => ({
  type: SET_ALL_TAGS,
  payload: allTags
});
const setData = (payload) => ({
  type: SET_DATA,
  payload
});

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
        searchData: []
      };

    case SET_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload,
        searchData: []
      };
    case SET_SEARCH_DATA:
      return {
        ...state,
        searchData: action.data
      };
    default:
      return state;
  }
};
export { initState, setData, setAllTags, setSearchData, init };
export default reducer;
