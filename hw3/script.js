// 定義變數
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = [50,100,200] , y = [50,100,150];
let dx = [5,5,5] , dy = [5,5,5];
let r = [30,30,30], color = ["red","blue","green"];

// 畫圓形
function drawBall(x, y, r, color)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // arc(圓心x, 圓心y, 半徑, 起始角, 結束角)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function changecolor(){
  if(color[0])  color = "rgb(255,0,0)";
  if(color[1])  color = "rgb(0,0,255)";
  if(color[2])  color = "rgb(0,255,0)";
}
// 更新畫布
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 3; i++)
    {
        x[i] = x[i] + dx[i];
        y[i] = y[i] + dy[i];
    }

    // TODO: 如果發生碰撞(畫布寬canvas.width, 畫布高canvas.height)，則改變速度(dx, dy)和顏色(color)
    // ...
    for (let i = 0; i < 3; i++)
    {
      if(x[i] + r[i] > canvas.width || x[i] - r[i] < 0) dx[i] = -dx[i]; 
      if(y[i] + r[i] > canvas.height || y[i] - r[i] < 0) dy[i] = -dy[i];
      
    }
  
    for(let i = 0; i < 3; i++)
      for(let j = i+1; j < 3; j++)
      {
        if(((x[i]-x[j])*(x[i]-x[j]) + (y[i]-y[j])*(y[i]-y[j])) < (r[i]+r[j])*(r[i]+r[j]))
        {
          [[dx[i], dx[j]], [dy[i], dy[j]]] = [[dx[j], dx[i]], [dy[j], dy[i]]]; 
        } 
      }

    for (let i = 0; i < 3; i++)
    {
        drawBall(x[i], y[i], r[i], color[i]);
    }
    
    requestAnimationFrame(draw);
}
draw();