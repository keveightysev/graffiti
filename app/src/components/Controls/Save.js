import React, { useContext } from 'react';
import styled from 'styled-components';

import { GraffitiContext } from '../../context';

const Save = () => {
  const { state } = useContext(GraffitiContext);
  return (
    <SaveText onClick={state.save} color={state.color}>
      Save Wall
    </SaveText>
  );
};

export default Save;

const SaveText = styled.h2`
  color: white;
  font-family: 'Permanent Marker', cursive;
  font-size: 1.2rem;
  margin-bottom: 10px;
  user-select: none;
  cursor: pointer;
  margin: 20px 0 0 35px;
  transition: all 0.2s;

  &:hover {
    color: ${({ color }) => color};
  }
`;
