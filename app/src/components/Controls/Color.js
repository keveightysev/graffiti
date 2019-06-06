import React, { useContext } from 'react';

import { GraffitiContext } from '../../context';

const Color = () => {
  const { state, dispatch } = useContext(GraffitiContext);

  return (
    <input
      type='color'
      value={state.color}
      onChange={e =>
        dispatch({ type: 'CHANGE_COLOR', payload: e.target.value })
      }
    />
  );
};

export default Color;
