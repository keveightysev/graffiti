import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import { GraffitiContext } from '../../context';

const Size = () => {
  const { state, dispatch } = useContext(GraffitiContext);
  const sizeRef = useRef(null);
  const [size, setSize] = useState(state.size);

  const randomPoint = radius => {
    for (;;) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      if (x * x + y * y <= 1) {
        return { x: x * radius, y: y * radius };
      }
    }
  };

  useEffect(() => {
    const ctx = sizeRef.current.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, 105, 105);
    const radius = size / 2;
    const area = radius * radius * Math.PI;
    const dots = Math.ceil(area);
    const { left } = sizeRef.current.getBoundingClientRect();
    const center = left + 30 / 2;
    for (let i = 0; i < dots; i++) {
      const offset = randomPoint(radius);
      ctx.fillRect(center + offset.x, center + offset.y, 1, 1);
    }
  }, [size]);

  const handleChange = e => {
    setSize(e.target.value);
    dispatch({ type: 'CHANGE_SIZE', payload: size });
  };

  return (
    <SizePicker>
      <h2>Choose Size</h2>
      <canvas width='105' height='105' ref={sizeRef} />
      <Range
        color={state.color}
        min='10'
        max='100'
        value={size}
        onChange={e => handleChange(e)}
      />
    </SizePicker>
  );
};

export default Size;

const SizePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 0 20px;

  h2 {
    color: white;
    font-family: 'Permanent Marker', cursive;
    font-size: 1.2rem;
    margin-bottom: 10px;
    user-select: none;
  }
`;

const Range = styled.input.attrs({
  type: 'range',
})`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 10px;
  background: #fff;
  outline: none;
  transition: all 0.2s;
  border-radius: 5px;
  border: 1px solid #000;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${({ color }) => color};
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid #000;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${({ color }) => color};
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid #000;
  }
`;
