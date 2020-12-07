import React, { useEffect } from "react";

import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

import { Global } from "./styles/Global";

function App() {
  useEffect(() => {
    let prevent = false;
    const touchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        return;
      }

      const scrollY =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;

      prevent = scrollY === 0;
    };

    const touchMove = (e: TouchEvent) => {
      if (prevent) {
        prevent = false;
        e.preventDefault();
      }
    };
    document.addEventListener("touchstart", touchStart);

    document.addEventListener("touchmove", touchMove);

    return () => {
      document.removeEventListener("touchstart", touchStart);
      document.removeEventListener("touchmove", touchMove);
    };
  }, []);
  return (
    <>
      <Global />
      <Canvas />
      <Controls />
    </>
  );
}

export default App;
