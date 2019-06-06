import React from 'react';

import Canvas from './components/Canvas';
import Controls from './components/Controls';

import { Global } from './styles/Global';

function App() {
  return (
    <>
      <Global />
      <Canvas />
      <Controls />
    </>
  );
}

export default App;
