import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
}

html, body, #root {
    width: 100%;
    height: 100%;
    touch-action: none;
    overflow: hidden;
}
`;
