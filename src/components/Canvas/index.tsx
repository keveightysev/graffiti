import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import background from "../assets/brickwall.jpg";

import { useGraffitiState, useGraffitiDispatch } from "../../contexts/";

import { onMouseDown, onTouchStart, onMouseMove, onTouchMove } from "./utils";

import CanvasWrapper from "../../styles/Canvas";

const Canvas = () => {
  const state = useGraffitiState();
  const dispatch = useGraffitiDispatch();
  const [isPainting, setIsPainting] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const canvasRef = useRef(document.createElement("canvas"));
  const instructRef = useRef(document.createElement("h2"));

  const randomPoint = (radius: number) => {
    for (;;) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      if (x * x + y * y <= 1) {
        return { x: x * radius, y: y * radius };
      }
    }
  };

  useEffect(() => {
    clearCanvas();
    dispatch({
      type: "SET_FUNCTIONS",
      payload: { clear: clearCanvas, save: saveCanvas }
    });
  }, [dispatch]);

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

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    const img: HTMLImageElement = new Image();
    img.src = background;
    img.onload = () => {
      const pattern = ctx!.createPattern(img, "repeat") as CanvasPattern;
      ctx!.fillStyle = pattern;
      ctx!.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };
  };

  const saveCanvas = () => {
    canvasRef.current.toBlob(blob => {
      const reader = new FileReader();
      reader.onload = readEvent => {
        const img = new Image() as HTMLImageElement;
        img.onload = () => {
          let canvas = document.createElement("canvas"),
            maxSize = 1000,
            width = img.width,
            height = img.height;

          if (width > height && width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          } else if (height > width && height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx!.drawImage(img, 0, 0, width, height);
          canvas.toBlob(newBlob => {
            const blob = newBlob as Blob;
            saveAs(blob, "graffiti-wall.png");
          });
        };
        img.src = reader.result!.toString();
      };
      reader.readAsDataURL(blob!);
    });
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
        onMouseDown={(e: React.MouseEvent) =>
          onMouseDown(e, canvasRef, setIsPainting, setPosition)
        }
        onTouchStart={(e: React.TouchEvent) => {
          onTouchStart(e, canvasRef, setIsPainting, setPosition);
        }}
        onMouseMove={(e: React.MouseEvent) => {
          onMouseMove(
            e,
            isPainting,
            clicked,
            fadeOut,
            canvasRef,
            setPosition,
            spray
          );
        }}
        onTouchMove={(e: React.TouchEvent) => {
          onTouchMove(
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
        onMouseDown={(e: React.MouseEvent) =>
          onMouseDown(e, canvasRef, setIsPainting, setPosition)
        }
        onTouchStart={(e: React.TouchEvent) => {
          onTouchStart(e, canvasRef, setIsPainting, setPosition);
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
