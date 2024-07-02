new p5();

var canvas = document.createElement("canvas"),
  c = canvas.getContext("2d");
var w = (canvas.width = window.innerWidth),
  h = (canvas.height = window.innerHeight);

document.body.appendChild(canvas);

class particle {
  constructor(coun, ind, reso) {
    //this.x = Math.floor(ind%(w/reso))*reso;
    //this.y = Math.floor(ind/(w/reso))*reso;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.opacity = Math.random()/2;
    this.dif = Math.random() * 40+Math.random() * 40;
    this.dd = Math.PI;//Math.random()*Math.PI*1.1;
  }
  show(mx, my) {
    this.midx = this.x - (this.x - mx) / 2;
    this.midy = this.y - (this.y - my) / 2;
    this.dang = Math.atan2(this.midy-my,this.midx-mx)+Math.PI;

    // c.beginPath();
    // c.lineTo(this.x,this.y);
    // c.lineTo(mx,my);
    // c.strokeStyle="rgba(255,255,255,"+this.opacity+")";
    // c.lineWidth="0.2";
    // c.stroke();

    this.dist = Math.sqrt(Math.pow(this.x - mx, 2) + Math.pow(this.y - my, 2));
    c.beginPath();
    //for more effects divide this.dist by bigger or smaller number.
    c.arc(this.midx, this.midy, Math.abs((this.dist / 2)-this.dif), this.dang-this.dd, this.dang+this.dd);
    c.strokeStyle = "rgba(255,255,255," + this.opacity + ")";
    c.lineWidth = "0.2";
    c.stroke();
  }
}

var res = 20,
  count = Math.round(w * h / (res * res)),
  p = new Array(count),
  x = w / 2,
  y = h / 2,
  x2 = w / 2,
  y2 = h / 2,
  ex = 0,
  ey = 0,
  t = 0,
  r1 = 10,
  dist = 0,
  q = 20;

for (var i = 0; i < p.length; i++) {
  p[i] = new particle(count, i, res);
}

function draw1() {
  t += 0.05;
  x2 =
    w / 2 +
    (h / 2 - q) * Math.sqrt(2) * Math.cos(t) / (Math.pow(Math.sin(t), 2) + 1);
  y2 =
    h / 2 +
    (h / 2 - q) *
      Math.sqrt(2) *
      Math.cos(t) *
      Math.sin(t) /
      (Math.pow(Math.sin(t), 2) + 1);

  if (mouse.x && mouse.y) {
    tx = mouse.x;
    ty = mouse.y;
  } else {
    tx = x2;
    ty = y2;
  }

  dist = Math.sqrt(ex * ex + ey * ey);

  ex = tx - x;
  ey = ty - y;

  x += ex / (w / dist);
  y += ey / (w / dist);

  for (var i = 0; i < p.length; i++) {
    p[i].show(x, y);
  }
}

var mouse = { x: false, y: false };
var last_mouse = { x: w / 2, y: h / 2 };

canvas.addEventListener(
  "mousemove",
  function(e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  },
  false
);

canvas.addEventListener("mouseleave", function(e) {
  mouse.x = false;
  mouse.y = false;
});

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function loop1() {
  setTimeout(function() {
    window.requestAnimFrame(loop1);
    c.fillStyle = "rgba(30,30,30,1)";
    c.fillRect(0, 0, w, h);
    draw1();
  }, 1000 / 60);
}

window.addEventListener("resize", function() {
  window.requestAnimFrame(loop1);
  (w = canvas.width = window.innerWidth),
    (h = canvas.height = window.innerHeight);
  c.fillStyle = "rgba(30,30,30,1)";
  c.fillRect(0, 0, w, h);
});

loop1();
