import React from "react";
import styled from "styled-components";

import { useGraffitiState } from "../../contexts";

const Save = () => {
  const state = useGraffitiState();
  return (
    <SaveText onClick={state.save} color={state.color}>
      Save Wall
    </SaveText>
  );
};

export default Save;

const SaveText = styled.h2`
  color: white;
  font-family: "Permanent Marker", cursive;
  font-size: 1.2rem;
  margin-bottom: 10px;
  user-select: none;
  cursor: pointer;
  margin: 20px 0 0 35px;
  transition: all 0.2s;

  &:hover {
    color: ${({ color }) => color};
  }
  @media (max-width: 450px) {
    margin-left: 0;
  }

  @media (max-width: 450px) {
    margin-left: 0;
  }
`;
