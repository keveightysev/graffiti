import { useEffect } from "react";

import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

import { Global } from "./styles/Global";

function App() {
  useEffect(() => {
    let prevent = false;
    const root = document.querySelector("#root");
    root.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) {
        return;
      }

      const scrollY =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;

      prevent = scrollY === 0;
    });

    root.addEventListener("touchmove", (e) => {
      if (prevent) {
        prevent = false;
        e.preventDefault();
      }
    });
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
