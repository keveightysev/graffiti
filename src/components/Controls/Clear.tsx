import React from "react";
import styled from "styled-components";

import { useGraffitiState } from "../../contexts";

const Clear = () => {
  const state = useGraffitiState();
  return (
    <ClearText onClick={state.clear} color={state.color}>
      Clear Wall
    </ClearText>
  );
};

export default Clear;

const ClearText = styled.h2`
  color: white;
  font-family: "Permanent Marker", cursive;
  font-size: 1.2rem;
  margin-bottom: 10px;
  user-select: none;
  cursor: pointer;
  margin: 20px 0 0 30px;
  transition: all 0.2s;

  &:hover {
    color: ${({ color }) => color};
  }

  @media (max-width: 450px) {
    margin-left: 0;
  }
`;
