import styled from 'styled-components';

export const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ColorInput = styled.input.attrs({
  type: 'color',
})`
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin: 20px 0 0 20px;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border: none;
    border-radius: 50%;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 2px #fff;
  }
`;
