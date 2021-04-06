import styled from "styled-components";

export const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 450px) {
    top: 40px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
`;
