import { RefObject } from "react";
import background from "../../../assets/brickwall.jpg";

export default function (canvasRef: RefObject<HTMLCanvasElement>) {
  return () => {
    const ctx = canvasRef.current!.getContext("2d");
    const img: HTMLImageElement = new Image();
    img.src = background;
    img.onload = () => {
      const pattern = ctx!.createPattern(img, "repeat") as CanvasPattern;
      ctx!.fillStyle = pattern;
      ctx!.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    };
  };
}
