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
let currentShape = null;
let currentRectangle = { type: "rect" };

// To draw a rectangle
const downCallBackForRect = function (e) {
  const mousePos = {
    x: e.offsetX,
    y: e.offsetY,
  };
  currentShape = new Rect(mousePos);

  const moveCallBack = function (e) {
    const mousePos = {
      x: e.offsetX,
      y: e.offsetY,
    };
    currentShape.setCorner2(mousePos);

    clearCanvas();
    drawShapes([...shapes, currentShape]);
  };

  const upCallBack = function () {
    myCanvas.removeEventListener("pointermove", moveCallBack);
    myCanvas.removeEventListener("pointerup", upCallBack);

    shapes.push(currentShape);
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
  currentShape = new Freeform([mousePos]);

  const moveCallBack = function (e) {
    const mousePos = {
      x: e.offsetX,
      y: e.offsetY,
    };
    currentShape.addPoint(mousePos);

    clearCanvas();
    drawShapes([...shapes, currentShape]);
  };

  const upCallBack = function () {
    myCanvas.removeEventListener("pointermove", moveCallBack);
    myCanvas.removeEventListener("pointerup", upCallBack);

    shapes.push(currentShape);
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
    shape.draw(ctx);
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
