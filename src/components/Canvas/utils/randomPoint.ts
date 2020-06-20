export const randomPoint = (radius: number) => {
  for (;;) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    if (x * x + y * y <= 1) {
      return { x: x * radius, y: y * radius };
    }
  }
};