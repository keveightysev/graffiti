import {
  MouseEvent,
  TouchEvent,
  RefObject,
  SetStateAction,
  ComponentState
} from "react";

export const onMouseDown = (
  e: MouseEvent,
  canvasRef: RefObject<HTMLCanvasElement>,
  setIsPainting: SetStateAction<ComponentState>,
  setPosition: SetStateAction<ComponentState>
): void => {
  if (e.buttons === 1) {
    let offsetX = e.nativeEvent.offsetX;
    let offsetY = e.nativeEvent.offsetY;
    const canvas = canvasRef!.current;
    const rect = canvas!.getBoundingClientRect();
    const updateX =
      ((offsetX - rect.left + window.pageXOffset) / rect.width) * canvas!.width;
    const updateY =
      ((offsetY - rect.top + window.pageYOffset) / rect.height) *
      canvas!.height;
    setIsPainting(true);
    setPosition({
      offsetX: updateX || 0,
      offsetY: updateY || 0
    });
  }
};

export const onTouchStart = (
  e: TouchEvent,
  canvasRef: RefObject<HTMLCanvasElement>,
  setIsPainting: SetStateAction<ComponentState>,
  setPosition: SetStateAction<ComponentState>
): void => {
  const { touches } = e as TouchEvent;
  if (e.type === "touchstart") {
    let offsetX = touches[0].clientX;
    let offsetY = touches[0].clientY;
    const canvas = canvasRef!.current;
    const rect = canvas!.getBoundingClientRect();
    const updateX =
      ((offsetX - rect.left + window.pageXOffset) / rect.width) * canvas!.width;
    const updateY =
      ((offsetY - rect.top + window.pageYOffset) / rect.height) *
      canvas!.height;
    setIsPainting(true);
    setPosition({
      offsetX: updateX || 0,
      offsetY: updateY || 0
    });
  }
};
