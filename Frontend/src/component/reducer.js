const reducer = (state, action) => {
  switch (action.type) {
    case "GET_QUESTION":
      return {
        ...state,
        questions: action.payload,
      };
    case "GET_MEMBERS":
      return {
        ...state,
        members: action.payload,
      };
    case "GET_TIMER":
      return {
        ...state,
        timer: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
