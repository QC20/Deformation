var canvas = document.createElement("canvas"),
  c = canvas.getContext("2d");
var w = (canvas.width = window.innerWidth),
  h = (canvas.height = window.innerHeight);

var existingCanvas = document.getElementById("canvas");
if (existingCanvas) {
  existingCanvas.remove();
}
document.body.appendChild(canvas);

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.opacity = Math.random() / 2;
    this.dif = Math.random() * 100 + Math.random() * 100;
    this.dd = Math.PI;
  }
  show(mx, my) {
    this.midx = this.x - (this.x - mx) / 2;
    this.midy = this.y - (this.y - my) / 2;
    this.dang = Math.atan2(this.midy - my, this.midx - mx) + Math.PI;

    this.dist = Math.sqrt(Math.pow(this.x - mx, 2) + Math.pow(this.y - my, 2));
    c.beginPath();
    c.arc(this.midx, this.midy, Math.abs((this.dist / 2) - this.dif), this.dang - this.dd, this.dang + this.dd);
    c.strokeStyle = "rgba(255,255,255," + this.opacity + ")";
    c.lineWidth = 0.2;
    c.stroke();
  }
}

var res = 25,
  count = Math.round(w * h / (res * res)),
  p = new Array(count),
  x = w / 2,
  y = h / 2,
  x2 = w / 2,
  y2 = h / 2,
  ex = 0,
  ey = 0,
  t = 0,
  q = 20;

for (var i = 0; i < p.length; i++) {
  p[i] = new Particle();
}

function draw() {
  t += 0.05;
  x2 = w / 2 + (h / 2 - q) * Math.sqrt(2) * Math.cos(t) / (Math.pow(Math.sin(t), 2) + 1);
  y2 = h / 2 + (h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t) / (Math.pow(Math.sin(t), 2) + 1);

  var tx, ty;
  if (mouse.x && mouse.y) {
    tx = mouse.x;
    ty = mouse.y;
  } else {
    tx = x2;
    ty = y2;
  }

  var dist = Math.sqrt(ex * ex + ey * ey);

  ex = tx - x;
  ey = ty - y;

  x += ex / (w / dist);
  y += ey / (w / dist);

  c.fillStyle = "rgba(30,30,30,1)";
  c.fillRect(0, 0, w, h);

  for (var i = 0; i < p.length; i++) {
    p[i].show(x, y);
  }
}

var mouse = { x: false, y: false };

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

canvas.addEventListener("mouseleave", function (e) {
  mouse.x = false;
  mouse.y = false;
});

function loop() {
  requestAnimationFrame(loop);
  draw();
}

window.addEventListener("resize", function () {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  count = Math.round(w * h / (res * res));
  p = new Array(count);
  for (var i = 0; i < p.length; i++) {
    p[i] = new Particle();
  }
});

loop();
