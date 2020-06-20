import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
} from "react";
import styled from "styled-components";

import { useGraffitiState, useGraffitiDispatch } from "../../contexts/";

import {
  sprayMove,
  startSpray,
  randomPoint,
  clearCanvas,
  saveCanvas,
} from "./utils";

import CanvasWrapper from "../../styles/Canvas";

const Canvas = () => {
  const state = useGraffitiState();
  const dispatch = useGraffitiDispatch();
  const [isPainting, setIsPainting] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const canvasRef = useRef(document.createElement("canvas"));
  const instructRef = useRef(document.createElement("h2"));

  useEffect(() => {
    clearCanvas(canvasRef)();
    dispatch({
      type: "SET_FUNCTIONS",
      payload: { clear: clearCanvas(canvasRef), save: saveCanvas(canvasRef) },
    });
  }, [dispatch, canvasRef]);

  const onUp = () => {
    setIsPainting(false);
  };

  const spray = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    ctx!.fillStyle = state.color;
    const radius = state.size / 2;
    const area = radius * radius * Math.PI;
    const dots = Math.ceil(area / 30);
    ctx!.globalCompositeOperation = "source-over";
    for (let i = 0; i < dots; i++) {
      const offset = randomPoint(radius);
      ctx!.fillRect(
        position.offsetX + offset.x,
        position.offsetY + offset.y,
        1,
        1
      );
    }
  };

  const fadeOut = () => {
    const element = instructRef.current;
    element.style.opacity = "1";
    (function fade() {
      if (Number(element.style.opacity) < 0) {
        element.style.display = "none";
        setClicked(true);
      } else {
        element.style.opacity = (
          Number(element.style.opacity) - 0.1
        ).toString();
        requestAnimationFrame(fade);
      }
    })();
  };

  return (
    <>
      <CanvasWrapper
        ref={canvasRef}
        width={state.width}
        height={state.height}
        touch-action="none"
        data-testid="graffiti-canvas"
        onMouseDown={(e: MouseEvent) =>
          startSpray(e, canvasRef, setIsPainting, setPosition)
        }
        onTouchStart={(e: TouchEvent) => {
          startSpray(e, canvasRef, setIsPainting, setPosition);
        }}
        onMouseMove={(e: MouseEvent) => {
          sprayMove(
            e,
            isPainting,
            clicked,
            fadeOut,
            canvasRef,
            setPosition,
            spray
          );
        }}
        onTouchMove={(e: TouchEvent) => {
          sprayMove(
            e,
            isPainting,
            clicked,
            fadeOut,
            canvasRef,
            setPosition,
            spray
          );
        }}
        onMouseUp={onUp}
        onTouchEnd={onUp}
      />
      <Instruct
        ref={instructRef}
        onMouseDown={(e: MouseEvent) =>
          startSpray(e, canvasRef, setIsPainting, setPosition)
        }
        onTouchStart={(e: TouchEvent) => {
          startSpray(e, canvasRef, setIsPainting, setPosition);
        }}
        onMouseUp={onUp}
        onTouchEnd={onUp}
        onClick={fadeOut}
      >
        {state.width > 500 ? "Click" : "Touch"} anywhere and drag{" "}
        {state.height > 500 ? "your mouse" : "your finger"} to begin painting!
      </Instruct>
    </>
  );
};

export default Canvas;

const Instruct = styled.h2`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  text-align: center;
  color: white;
  font-family: "Permanent Marker", cursive;
  user-select: none;

  @media (max-width: 450px) {
    font-size: 1.8rem;
    top: 200px;
  }
`;
