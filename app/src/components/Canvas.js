import React, { useState, useRef, useContext } from 'react';
import io from 'socket.io-client';

import { GraffitiContext } from '../context';

import CanvasWrapper from '../styles/Canvas';

const socket = io('http://localhost');

const Canvas = () => {
  const { state } = useContext(GraffitiContext);
  const [isPainting, setIsPainting] = useState(false);
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const canvasRef = useRef(null);

  socket.on('another spray', data => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imgArr = new Uint8ClampedArray(data.imgArr);
    const imgData = new ImageData(imgArr, data.width);
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.putImageData(
      imgData,
      ((data.x - rect.left) / (rect.right - rect.left)) * canvas.width,
      ((data.y - rect.top) / (rect.bottom - rect.top)) * canvas.height,
      // data.dirtyX,
      // data.dirtyY,
      // data.width,
      // data.width,
    );
  });

  socket.on('fresh', data => {
    const img = new Image();
    const ctx = canvasRef.current.getContext('2d');
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0);
    });
    img.src = data.img;
  });

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
      const touch = e.touches[0] || e.changedTouches[0];
      let offsetX =
        e.type === 'touchmove' ? touch.clientX : e.nativeEvent.offsetX;
      let offsetY =
        e.type === 'touchmove' ? touch.clientY : e.nativeEvent.offsetY;
      const rect = canvasRef.current.getBoundingClientRect();
      const canvas = canvasRef.current;
      const updateX =
        ((offsetX - rect.left) / (rect.right - rect.left)) * canvas.width;
      const updateY =
        ((offsetY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
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
      const touch = e.touches[0] || e.changedTouches[0];
      const offsetX =
        e.type === 'touchmove' ? touch.clientX : e.nativeEvent.offsetX;
      const offsetY =
        e.type === 'touchmove' ? touch.clientY : e.nativeEvent.offsetY;
      const rect = canvasRef.current.getBoundingClientRect();
      const canvas = canvasRef.current;
      const updateX =
        ((offsetX - rect.left) / (rect.right - rect.left)) * canvas.width;
      const updateY =
        ((offsetY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
      setPosition({
        offsetX: updateX,
        offsetY: updateY,
      });
      spray(canvasRef.current);
    }
  };

  const onUp = () => {
    setIsPainting(false);
    canvasRef.current.toBlob(blob => {
      socket.emit('save', { blob });
    });
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
    const data = ctx.getImageData(
      position.offsetX - radius,
      position.offsetY + radius,
      state.size,
      state.size,
    );
    const imgArr = Array.from(data.data);
    socket.emit('spray', {
      imgArr,
      x: position.offsetX,
      y: position.offsetY,
      width: state.size,
      dirtyX: position.offsetX - radius,
      dirtyY: position.offsetY + radius,
    });
  };

  return (
    <>
      <CanvasWrapper
        ref={canvasRef}
        width='1500'
        height='768'
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
