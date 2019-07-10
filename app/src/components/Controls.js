import React from 'react';

import Color from './Controls/Color';
import Size from './Controls/Size';

import { ControlsWrapper } from '../styles/Controls';

const Controls = () => {
  return (
    <ControlsWrapper>
      <Color />
      <Size />
    </ControlsWrapper>
  );
};

export default Controls;
