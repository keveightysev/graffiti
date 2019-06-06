import React, { useContext } from 'react';

import { GraffitiContext } from '../../context';

import { ColorInput } from '../../styles/Controls';

const Color = () => {
  const { state, dispatch } = useContext(GraffitiContext);

  return (
    <ColorInput
      type='color'
      value={state.color}
      onChange={e =>
        dispatch({ type: 'CHANGE_COLOR', payload: e.target.value })
      }
    />
  );
};

export default Color;
