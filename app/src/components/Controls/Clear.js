import React, { useContext } from 'react';
import styled from 'styled-components';

import { GraffitiContext } from '../../context';

const Clear = () => {
  const { state } = useContext(GraffitiContext);
  return (
    <ClearText onClick={state.clear} color={state.color}>
      Clear Wall
    </ClearText>
  );
};

export default Clear;

const ClearText = styled.h2`
  color: white;
  font-family: 'Permanent Marker', cursive;
  font-size: 1.2rem;
  margin-bottom: 10px;
  user-select: none;
  cursor: pointer;
  margin: 20px 0 0 30px;
  transition: all 0.2s;

  &:hover {
    color: ${({ color }) => color};
  }
`;
