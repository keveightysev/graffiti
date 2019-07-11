import React, { useContext, useState } from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';

import { GraffitiContext } from '../../context';

const Color = () => {
  const [clicked, setClicked] = useState(false);
  const { state, dispatch } = useContext(GraffitiContext);

  return (
    <ColorPicker>
      <h2>Choose Color</h2>
      <CurrentColor color={state.color} onClick={() => setClicked(!clicked)} />
      <Sketch
        color={state.color}
        disableAlpha
        clicked={clicked}
        onChange={({ hex }) => dispatch({ type: 'CHANGE_COLOR', payload: hex })}
      />
      <Cover clicked={clicked} onMouseDown={() => setClicked(false)} />
    </ColorPicker>
  );
};

export default Color;

const CurrentColor = styled.div`
  width: 75px;
  height: 75px;
  background: ${({ color }) => color};
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  z-index: 2;
`;

const Sketch = styled(SketchPicker)`
  margin: 10px 0 0 20px;
  position: absolute;
  top: 105px;
  left: 20px;
  display: ${({ clicked }) => (clicked ? 'block' : 'none')};
`;

const ColorPicker = styled.div`
  position: relative;
  display: flex;
  z-index: 3;
  flex-direction: column;
  margin: 20px 0 0 20px;
  align-items: center;

  @media (max-width: 450px) {
    margin-left: 0;
  }

  h2 {
    color: white;
    font-family: 'Permanent Marker', cursive;
    font-size: 1.2rem;
    margin-bottom: 10px;
    user-select: none;
  }
`;

const Cover = styled.div`
  position: absolute;
  z-index: -1;
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  display: ${({ clicked }) => (clicked ? 'block' : 'none')};
`;
