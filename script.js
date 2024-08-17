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
let currentRoute = [];
let currentRectangle = { type: "rect" };

// To draw a rectangle
const downCallBackForRect = function (e) {
  const mousePos = {
    x: e.offsetX,
    y: e.offsetY,
  };
  currentRectangle.corner1 = mousePos;

  const moveCallBack = function (e) {
    const mousePos = {
      x: e.offsetX,
      y: e.offsetY,
    };
    currentRectangle.corner2 = mousePos;

    clearCanvas();
    drawShapes([...shapes, currentRectangle]);
  };

  const upCallBack = function () {
    myCanvas.removeEventListener("pointermove", moveCallBack);
    myCanvas.removeEventListener("pointerup", upCallBack);

    shapes.push(currentRectangle);
    currentRectangle = { type: "rect" };
  };

  myCanvas.addEventListener("pointermove", moveCallBack);
  myCanvas.addEventListener("pointerup", upCallBack);
};

// To draw a line (Freeform)
const downCallBackForFreeform = function (e) {
  const mousePos = {
    x: e.offsetX,
    y: e.offsetY,
  };
  currentRoute.push(mousePos);

  const moveCallBack = function (e) {
    const mousePos = {
      x: e.offsetX,
      y: e.offsetY,
    };
    currentRoute.push(mousePos);

    clearCanvas();
    drawShapes([...shapes, { type: "freeform", points: currentRoute }]);
  };

  const upCallBack = function () {
    myCanvas.removeEventListener("pointermove", moveCallBack);
    myCanvas.removeEventListener("pointerup", upCallBack);

    shapes.push({ type: "freeform", points: currentRoute });
    currentRoute = [];
  };

  myCanvas.addEventListener("pointermove", moveCallBack);
  myCanvas.addEventListener("pointerup", upCallBack);
};

myCanvas.addEventListener("pointerdown", downCallBackForFreeform);

function changeTool(tool) {
  myCanvas.removeEventListener("pointerdown", downCallBackForRect);
  myCanvas.removeEventListener("pointerdown", downCallBackForFreeform);
  switch (tool) {
    case "rect":
      myCanvas.addEventListener("pointerdown", downCallBackForRect);
      break;
    case "freeform":
      myCanvas.addEventListener("pointerdown", downCallBackForFreeform);
      break;
  }
}

function drawShapes(shapes) {
  for (const shape of shapes) {
    switch (shape.type) {
      case "rect":
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.lineWidth = 5;
        const minX = Math.min(shape.corner1.x, shape.corner2.x);
        const minY = Math.min(shape.corner1.y, shape.corner2.y);
        const width = Math.abs(shape.corner1.x - shape.corner2.x);
        const height = Math.abs(shape.corner1.y - shape.corner2.y);
        ctx.rect(minX, minY, width, height);
        ctx.stroke();
        break;
      case "freeform":
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.lineWidth = 5;
        ctx.moveTo(shape.points[0].x, shape.points[0].y);
        for (let i = 1; i < shape.points.length; i++) {
          ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }
        ctx.stroke();
        break;
    }
  }
}

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
