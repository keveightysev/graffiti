export const initialState = {
  color: "#FC00FF",
  size: 50,
  clear: null,
  save: null,
  width: window.innerWidth,
  height: window.innerHeight,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_SIZE":
      return { ...state, size: Number(action.payload) };
    case "SET_FUNCTIONS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
