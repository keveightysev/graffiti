import { RefObject } from "react";
import { saveAs } from "file-saver";

export default function (canvasRef: RefObject<HTMLCanvasElement>) {
  return () => {
    canvasRef.current!.toBlob((blob) => {
      const reader = new FileReader();
      reader.onload = (readEvent) => {
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
          canvas.toBlob((newBlob) => {
            const blob = newBlob as Blob;
            saveAs(blob, "graffiti-wall.png");
          });
        };
        img.src = reader.result!.toString();
      };
      reader.readAsDataURL(blob!);
    });
  };
}
