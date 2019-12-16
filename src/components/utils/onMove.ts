import {
  MouseEvent,
  RefObject,
  SetStateAction,
  ComponentState,
  TouchEvent
} from "react";

export const onMouseMove = (
  e: MouseEvent,
  isPainting: boolean,
  clicked: boolean,
  fadeOut: () => void,
  canvasRef: RefObject<HTMLCanvasElement>,
  setPosition: SetStateAction<ComponentState>,
  spray: (canvas: HTMLCanvasElement) => void
) => {
  e.persist();
  if (isPainting && e.buttons === 1) {
    if (!clicked) {
      fadeOut();
    }
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    const canvas = canvasRef!.current!;
    const rect = canvas.getBoundingClientRect();
    const updateX =
      ((offsetX - rect.left + window.pageXOffset) / rect.width) * canvas.width;
    const updateY =
      ((offsetY - rect.top + window.pageYOffset) / rect.height) * canvas.height;
    setPosition({
      offsetX: updateX,
      offsetY: updateY
    });
    spray(canvasRef!.current!);
  }
};

export const onTouchMove = (
  e: TouchEvent,
  isPainting: boolean,
  clicked: boolean,
  fadeOut: () => void,
  canvasRef: RefObject<HTMLCanvasElement>,
  setPosition: SetStateAction<ComponentState>,
  spray: (canvas: HTMLCanvasElement) => void
) => {
  e.persist();
  if (isPainting && e.type === "touchmove") {
    if (!clicked) {
      fadeOut();
    }
    const offsetX = e.touches[0].clientX;
    const offsetY = e.touches[0].clientY;
    const canvas = canvasRef!.current!;
    const rect = canvas.getBoundingClientRect();
    const updateX =
      ((offsetX - rect.left + window.pageXOffset) / rect.width) * canvas.width;
    const updateY =
      ((offsetY - rect.top + window.pageYOffset) / rect.height) * canvas.height;
    setPosition({
      offsetX: updateX,
      offsetY: updateY
    });
    spray(canvas);
  }
};
