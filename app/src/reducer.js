export const initialState = {
  color: '#057569',
  size: 50,
  clear: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload };
    case 'CHANGE_SIZE':
      return { ...state, size: Number(action.payload) };
    case 'SET_FUNCTIONS':
      return { ...state, clear: action.payload.clear };
    default:
      return state;
  }
};
