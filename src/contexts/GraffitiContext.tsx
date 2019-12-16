import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  ReactElement
} from "react";

import {
  graffitiState,
  graffitiReducer,
  GraffitiAction,
  GraffitiState
} from "../reducers";

const GraffitiStateContext = createContext<GraffitiState | undefined>(
  undefined
);

type Dispatch = (action: GraffitiAction) => void;

const GraffitiDispatchContext = createContext<Dispatch | undefined>(undefined);

type GraffitiProviderProps = { children: ReactNode };

export const GraffitiProvider = ({
  children
}: GraffitiProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(graffitiReducer, graffitiState);

  return (
    <GraffitiStateContext.Provider value={state}>
      <GraffitiDispatchContext.Provider value={dispatch}>
        {children}
      </GraffitiDispatchContext.Provider>
    </GraffitiStateContext.Provider>
  );
};

export const useGraffitiState = (): GraffitiState => {
  const context = useContext(GraffitiStateContext);
  if (context === undefined) {
    throw new Error("useGraffitiState must be used within a GraffitiProvider");
  }
  return context;
};

export const useGraffitiDispatch = (): Dispatch => {
  const context = useContext(GraffitiDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useGraffitiDispatch must be used within a GraffitiProvider"
    );
  }
  return context;
};
