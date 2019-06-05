import React, { useState, useRef, useEffect } from 'react';
import CanvasWrapper from '../styles/Canvas';

const Canvas = () => {
  const [isPainting, setIsPainting] = useState(false);
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const canvasRef = useRef(null);

  const reader = new FileReader();

  useEffect(() => {
    const getData = async () => {
      const url = localStorage.getItem('blob');
      const res = await fetch(url);
      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0);
      });
      img.src = imageUrl;
      // const img = new Image();
      // const ctx = canvasRef.current.getContext('2d');
      // img.src = blob;
      // console.log(res);
      //
    };
    getData();
  }, []);

  const randomPoint = radius => {
    for (;;) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      if (x * x + y * y <= 1) {
        return { x: x * radius, y: y * radius };
      }
    }
  };

  const onDown = e => {
    let { offsetX, offsetY } = e.nativeEvent;
    const rect = canvasRef.current.getBoundingClientRect();
    const canvas = canvasRef.current;
    offsetX = ((offsetX - rect.left) / (rect.right - rect.left)) * canvas.width;
    offsetY = ((offsetY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
    setIsPainting(true);
    setPosition({ offsetX, offsetY });
  };

  const onMove = e => {
    if (isPainting && e.buttons === 1) {
      let { offsetX, offsetY } = e.nativeEvent;
      const rect = canvasRef.current.getBoundingClientRect();
      const canvas = canvasRef.current;
      offsetX =
        ((offsetX - rect.left) / (rect.right - rect.left)) * canvas.width;
      offsetY =
        ((offsetY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
      setPosition({
        offsetX,
        offsetY,
      });
      spray(canvasRef.current);
      canvasRef.current.toBlob(blob => {
        reader.onload = () => {
          localStorage.setItem('blob', reader.result);
        };
        reader.readAsDataURL(blob);
      }, 'image/png');
    }
  };

  const onUp = () => {
    setIsPainting(false);
  };

  const spray = canvas => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#00ff00';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 50;
    const radius = ctx.lineWidth / 2;
    const area = radius * radius * Math.PI;
    const dots = Math.ceil(area / 30);
    for (let i = 0; i < dots; i++) {
      const offset = randomPoint(radius);
      ctx.fillRect(
        position.offsetX + offset.x,
        position.offsetY + offset.y,
        1,
        1,
      );
    }
  };

  return (
    <>
      <CanvasWrapper
        ref={canvasRef}
        width='1400'
        height='768'
        onMouseDown={onDown}
        onTouchStart={onDown}
        onMouseMove={onMove}
        onTouchMove={onMove}
        onMouseUp={onUp}
        onTouchEnd={onUp}
      />
    </>
  );
};

export default Canvas;
