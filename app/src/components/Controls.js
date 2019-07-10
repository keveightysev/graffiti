import React from 'react';

import Color from './Controls/Color';
import Size from './Controls/Size';
import Clear from './Controls/Clear';

import { ControlsWrapper } from '../styles/Controls';

const Controls = () => {
  return (
    <ControlsWrapper>
      <Color />
      <Size />
      <Clear />
    </ControlsWrapper>
  );
};

export default Controls;
