import React, { useState } from "react";
import styled from "styled-components";
import { Vortex } from "react-burgers";
import { Icon } from "@iconify/react";
import gearIcon from "@iconify/icons-octicon/gear";

import Color from "./Color";
import Size from "./Size";
import Clear from "./Clear";
import Save from "./Save";

import { ControlsWrapper } from "../../styles/Controls";

const Controls = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <View>
      <GearButton title="Settings">
        <Icon icon={gearIcon} width="40px" color="#fff" />
      </GearButton>
      {/* <Vortex
        padding="20px"
        color="#fff"
        active={clicked}
        onClick={() => setClicked(!clicked)}
      /> */}
      {clicked && (
        <ControlsWrapper>
          <Color />
          <Size />
          <Clear />
          <Save />
        </ControlsWrapper>
      )}
    </View>
  );
};

export default Controls;

const View = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const GearButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  background: #000;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;
