import React, { useState, useRef, useContext, useEffect } from 'react';
import background from '../assets/brickwall.jpg';

import { GraffitiContext } from '../context';

import CanvasWrapper from '../styles/Canvas';

const Canvas = () => {
  const { state } = useContext(GraffitiContext);
  const [isPainting, setIsPainting] = useState(false);
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(background);
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.src = background;
    const pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
    e = e || window.event;
    if (e.buttons === 1 || e.type === 'touchstart') {
      let offsetX =
        e.type === 'touchmove' ? e.touches[0].clientX : e.nativeEvent.offsetX;
      let offsetY =
        e.type === 'touchmove' ? e.touches[0].clientY : e.nativeEvent.offsetY;
      const rect = canvasRef.current.getBoundingClientRect();
      const canvas = canvasRef.current;
      const updateX =
        ((offsetX - rect.left + window.pageXOffset) / rect.width) *
        canvas.width;
      const updateY =
        ((offsetY - rect.top + window.pageYOffset) / rect.height) *
        canvas.height;
      setIsPainting(true);
      setPosition({
        offsetX: updateX || 0,
        offsetY: updateY || 0,
      });
    }
  };

  const onMove = e => {
    e.persist();
    if (isPainting && (e.buttons === 1 || e.type === 'touchmove')) {
      const offsetX =
        e.type === 'touchmove' ? e.touches[0].clientX : e.nativeEvent.offsetX;
      const offsetY =
        e.type === 'touchmove' ? e.touches[0].clientY : e.nativeEvent.offsetY;
      const rect = canvasRef.current.getBoundingClientRect();
      const canvas = canvasRef.current;
      const updateX =
        ((offsetX - rect.left + window.pageXOffset) / rect.width) *
        canvas.width;
      const updateY =
        ((offsetY - rect.top + window.pageYOffset) / rect.height) *
        canvas.height;
      setPosition({
        offsetX: updateX,
        offsetY: updateY,
      });
      spray(canvasRef.current);
    }
  };

  const onUp = () => {
    setIsPainting(false);
  };

  const spray = canvas => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = state.color;
    const radius = state.size / 2;
    const area = radius * radius * Math.PI;
    const dots = Math.ceil(area / 30);
    ctx.globalCompositeOperation = 'source-over';
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
        width={window.innerWidth}
        height={window.innerHeight}
        touch-action='none'
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
