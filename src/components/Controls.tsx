import React from "react";

import Color from "./Controls/Color";
import Size from "./Controls/Size";
import Clear from "./Controls/Clear";
import Save from "./Controls/Save";
import MobileControls from "./Controls/MobileControls";

import { ControlsWrapper } from "../styles/Controls";

const Controls = () => {
  return window.innerWidth > 450 ? (
    <ControlsWrapper>
      <Color />
      <Size />
      <Clear />
      <Save />
    </ControlsWrapper>
  ) : (
    <MobileControls />
  );
};

export default Controls;
