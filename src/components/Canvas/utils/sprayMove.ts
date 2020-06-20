import {
  MouseEvent,
  RefObject,
  SetStateAction,
  ComponentState,
  TouchEvent,
} from "react";

export default function (
  e: MouseEvent | TouchEvent,
  isPainting: boolean,
  clicked: boolean,
  fadeOut: () => void,
  canvasRef: RefObject<HTMLCanvasElement>,
  setPosition: SetStateAction<ComponentState>,
  spray: (canvas: HTMLCanvasElement) => void
) {
  e.persist();
  if (!clicked) {
    fadeOut();
  }
  let offsetX = 0,
    offsetY = 0;
  if (isPainting && e.type === "mousemove") {
    const { buttons, nativeEvent } = e as MouseEvent;
    if (buttons === 1) {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }
  } else if (isPainting && e.type === "touchmove") {
    const { touches } = e as TouchEvent;
    offsetX = touches[0].clientX;
    offsetY = touches[0].clientY;
  }

  const canvas = canvasRef!.current!;
  const rect = canvas.getBoundingClientRect();
  const updateX =
    ((offsetX - rect.left + window.pageXOffset) / rect.width) * canvas.width;
  const updateY =
    ((offsetY - rect.top + window.pageYOffset) / rect.height) * canvas.height;
  setPosition({
    offsetX: updateX,
    offsetY: updateY,
  });
  spray(canvas);
}
