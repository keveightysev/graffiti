export type GraffitiState = {
  color: string;
  size: number;
  clear: () => void;
  save: () => void;
  width: number;
  height: number;
};

export const graffitiState: GraffitiState = {
  color: "#FC00FF",
  size: 50,
  clear: () => {},
  save: () => {},
  width: window.innerWidth,
  height: window.innerHeight
};

export type GraffitiAction =
  | { type: "CHANGE_COLOR"; payload: string }
  | { type: "CHANGE_SIZE"; payload: number }
  | { type: "SET_FUNCTIONS"; payload: GraffitiFunctions };

type GraffitiFunctions = {
  clear: () => void;
  save: () => void;
};

export const graffitiReducer = (
  state: GraffitiState,
  action: GraffitiAction
): GraffitiState => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_COLOR":
      return { ...state, color: payload as string };
    case "CHANGE_SIZE":
      return { ...state, size: Number(payload) };
    case "SET_FUNCTIONS":
      return { ...state, ...(payload as GraffitiFunctions) };
    default:
      return state;
  }
};
