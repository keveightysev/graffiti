import { useState, useEffect } from "react";
import styled from "styled-components";
import { Vortex } from "react-burgers";

import Color from "./Color";
import Size from "./Size";
import Clear from "./Clear";
import Save from "./Save";

import { ControlsWrapper } from "../../styles/Controls";

const MobileControls = () => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("um");
  }, []);

  return (
    <MobileView>
      <Vortex
        padding="20px"
        color="#fff"
        active={clicked}
        onClick={() => setClicked(!clicked)}
      />
      {clicked && (
        <ControlsWrapper>
          <Color />
          <Size />
          <Clear />
          <Save />
        </ControlsWrapper>
      )}
    </MobileView>
  );
};

export default MobileControls;

const MobileView = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
