import {
  MouseEvent,
  TouchEvent,
  RefObject,
  SetStateAction,
  ComponentState,
} from "react";

export default function (
  e: MouseEvent | TouchEvent,
  canvasRef: RefObject<HTMLCanvasElement>,
  setIsPainting: SetStateAction<ComponentState>,
  setPosition: SetStateAction<ComponentState>
): void {
  let offsetX = 0,
    offsetY = 0;

  if (e.type === "mousedown") {
    const { buttons, nativeEvent } = e as MouseEvent;
    if (buttons === 1) {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }
  } else if (e.type === "touchstart") {
    const { touches } = e as TouchEvent;
    offsetX = touches[0].clientX;
    offsetY = touches[0].clientY;
  }

  const canvas = canvasRef!.current;
  const rect = canvas!.getBoundingClientRect();
  const updateX =
    ((offsetX - rect.left + window.pageXOffset) / rect.width) * canvas!.width;
  const updateY =
    ((offsetY - rect.top + window.pageYOffset) / rect.height) * canvas!.height;
  setIsPainting(true);
  setPosition({
    offsetX: updateX || 0,
    offsetY: updateY || 0,
  });
}
