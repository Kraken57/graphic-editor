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
    left: canvasProps.center.x - 600/2,
    top: canvasProps.center.y - 480/2,
  };

myCanvas.width = canvasProps.width;
myCanvas.height = canvasProps.height;

const ctx = myCanvas.getContext("2d");
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);


ctx.fillStyle = "white";
ctx.fillRect(stageProps.left, stageProps.top, stageProps.width, stageProps.height);
