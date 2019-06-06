import React, { createContext, useReducer } from 'react';

import { initialState, reducer } from './reducer';

const GraffitiContext = createContext(initialState);

const GraffitiProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GraffitiContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GraffitiContext.Provider>
  );
};

export { GraffitiContext, GraffitiProvider };
