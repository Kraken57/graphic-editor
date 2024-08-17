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
clearCanvas();

const shapes = [];
let route = [];
let rectangle = {};

// to draw a rectangle
myCanvas.addEventListener("pointerdown", function (e) {
  const mousePos = {
    x: e.offsetX,
    y: e.offsetY,
  };
  rectangle.corner1 = mousePos;

  const downCallBack = function (e) {
    const mousePos = {
      x: e.offsetX,
      y: e.offsetY,
    };
    rectangle.corner2 = mousePos;

    clearCanvas();

    for (const shape of [...shapes, rectangle]) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 5;
      const rect = shape;
      const minX = Math.min(rect.corner1.x, rect.corner2.x);
      const minY = Math.min(rect.corner1.y, rect.corner2.y);
      const width = Math.abs(rect.corner1.x - rect.corner2.x);
      const height = Math.abs(rect.corner1.y - rect.corner2.y);
      ctx.rect(minX, minY, width, height);
      ctx.stroke();
    }
  };

  const upCallBack = function (e) {
    myCanvas.removeEventListener("pointermove", downCallBack);
    myCanvas.removeEventListener("pointerup", upCallBack);

    shapes.push(rectangle);
    rectangle = {};
  };

  myCanvas.addEventListener("pointermove", downCallBack);
  myCanvas.addEventListener("pointerup", upCallBack);
});

// to draw a line(Freeform)
// myCanvas.addEventListener("pointerdown", function (e) {
//   const mousePos = {
//     x: e.offsetX,
//     y: e.offsetY,
//   };
//   route.push(mousePos);

//   const downCallBack = function (e) {
//     const mousePos = {
//       x: e.offsetX,
//       y: e.offsetY,
//     };
//     route.push(mousePos);

//     clearCanvas();

//     for (const shape of [...shapes, route]) {
//       ctx.beginPath();
//       ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
//       ctx.lineWidth = 5;
//       ctx.moveTo(shape[0].x, shape[0].y);
//       for (let i = 1; i < shape.length; i++) {
//         ctx.lineTo(shape[i].x, shape[i].y);
//       }

//       ctx.stroke();
//     }
//   };

//   const upCallBack = function (e) {
//     myCanvas.removeEventListener("pointermove", downCallBack);
//     myCanvas.removeEventListener("pointerup", upCallBack);

//     shapes.push(route);
//     route = [];
//   };

//   myCanvas.addEventListener("pointermove", downCallBack);
//   myCanvas.addEventListener("pointerup", upCallBack);
// });

function clearCanvas() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(
    stageProps.left,
    stageProps.top,
    stageProps.width,
    stageProps.height
  );
}
