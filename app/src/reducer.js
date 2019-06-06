export const initialState = {
  color: '#000000',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload };
    default:
      return state;
  }
};
