import styled from 'styled-components';
import background from '../assets/brickwall.jpg';

const CanvasWrapper = styled.canvas`
  background: url(${background});
  touch-action: none;
  postion: absolute;
  top: 0;
  left: 0;
`;

export default CanvasWrapper;
