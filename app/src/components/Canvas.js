import React, { useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
// import short from 'short-uuid';
// import moment from 'moment';
import { saveAs } from 'file-saver';
import background from '../assets/brickwall.jpg';

import { GraffitiContext } from '../context';
// import { storage } from '../firebase';

import CanvasWrapper from '../styles/Canvas';

const Canvas = () => {
  const { state, dispatch } = useContext(GraffitiContext);
  const [isPainting, setIsPainting] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const canvasRef = useRef(null);
  const instructRef = useRef(null);

  useEffect(() => {
    clearCanvas();
    dispatch({
      type: 'SET_FUNCTIONS',
      payload: { clear: clearCanvas, save: saveCanvas },
    });
  }, [dispatch]);

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
      if (!clicked) {
        fadeOut();
      }
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

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.src = background;
    img.onload = () => {
      const pattern = ctx.createPattern(img, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };
  };

  const saveCanvas = () => {
    canvasRef.current.toBlob(blob => {
      const reader = new FileReader();
      reader.onload = readEvent => {
        const img = new Image();
        img.onload = imageEvent => {
          let canvas = document.createElement('canvas'),
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

          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          canvas.toBlob(newBlob => {
            saveAs(newBlob, 'graffiti-wall.png');
            // const imageRef = storage.child(
            //   `${moment().format('MMMDDYYYY')}/${short.generate()}.png`,
            // );
            // const upload = imageRef.put(newBlob, { contentType: 'image/png' });
            // upload.on(
            //   'state_changed',
            //   snap => {
            //     const progress =
            //       (snap.bytesTransferred / snap.totalBytes) * 100;
            //     console.log(`Upload is ${progress}% completed`);
            //   },
            //   err => {
            //     console.log(err);
            //   },
            //   async () => {
            //     const imgUrl = await upload.snapshot.ref.getDownloadURL();
            //     console.log(imgUrl);
            //   },
            // );
          });
        };
        img.src = readEvent.target.result;
      };
      reader.readAsDataURL(blob);
    });
  };

  const fadeOut = () => {
    const element = instructRef.current;
    element.style.opacity = 1;
    (function fade() {
      if ((element.style.opacity -= 0.1) < 0) {
        element.style.display = 'none';
        setClicked(true);
      } else {
        requestAnimationFrame(fade);
      }
    })();
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
      <Instruct
        ref={instructRef}
        onMouseDown={onDown}
        onTouchStart={onDown}
        onMouseUp={onUp}
        onTouchEnd={onUp}
        onClick={fadeOut}
      >
        {window.innerWidth > 500 ? 'Click' : 'Touch'} anywhere and drag{' '}
        {window.innerWidth > 500 ? 'your mouse' : 'your finger'} to begin
        painting!
      </Instruct>
    </>
  );
};

export default Canvas;

const Instruct = styled.h2`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  text-align: center;
  color: white;
  font-family: 'Permanent Marker', cursive;
  user-select: none;

  @media (max-width: 450px) {
    font-size: 1.8rem;
    top: 200px;
  }
`;
