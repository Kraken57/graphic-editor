const canvasProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  center: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
};

const stageProps = {
  width: 600,
  height: 480,
  left: canvasProps.center.x - 600 / 2,
  top: canvasProps.center.y - 480 / 2,
};

myCanvas.width = canvasProps.width;
myCanvas.height = canvasProps.height;

const ctx = myCanvas.getContext("2d");
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

ctx.fillStyle = "white";
ctx.fillRect(
  stageProps.left,
  stageProps.top,
  stageProps.width,
  stageProps.height
);

const route = [];

myCanvas.addEventListener("pointerdown", function (e) {
  const mousePos = {
    x: e.offsetX,
    y: e.offsetY,
  };
  route.push(mousePos);
});

myCanvas.addEventListener("pointermove", function (e) {
  const mousePos = {
    x: e.offsetX,
    y: e.offsetY,
  };
  route.push(mousePos);
});

myCanvas.addEventListener("pointerup", function (e) {
  ctx.beginPath();
  ctx.moveTo(route[0].x, route[0].y);
  route.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
});
