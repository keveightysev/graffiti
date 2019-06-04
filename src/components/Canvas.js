import React, { useState, useRef, useEffect } from 'react';

const Canvas = () => {
  const [isPainting, setIsPainting] = useState(false);
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const canvasRef = useRef(null);

  const randomPoint = radius => {
    for (;;) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      if (x * x + y * y <= 1) {
        return { x: x * radius, y: y * radius };
      }
    }
  };

  const onDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsPainting(true);
    setPosition({ offsetX, offsetY });
  };

  const onMove = ({ nativeEvent }) => {
    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      setPosition({ offsetX, offsetY });
      spray(canvasRef.current);
      console.log(position);
    }
  };

  const onUp = () => {
    setIsPainting(false);
  };

  const spray = canvas => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 100;
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
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={onDown}
        onPointerDown={onDown}
        onTouchStart={onDown}
        onMouseMove={onMove}
        onPointerMove={onMove}
        onTouchMove={onMove}
        onMouseUp={onUp}
        onPointerUp={onUp}
        onTouchEnd={onUp}
      />
    </>
  );
};

export default Canvas;
