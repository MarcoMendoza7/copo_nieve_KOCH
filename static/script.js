// ====== Parámetros ======
let order = 4; // puedes ajustar con los botones

// ====== Utilidades geométricas ======
function kochPoints(x1, y1, x2, y2, level) {
  if (level === 0) return [[x1, y1], [x2, y2]];

  const dx = (x2 - x1) / 3;
  const dy = (y2 - y1) / 3;

  const ax = x1 + dx,      ay = y1 + dy;
  const bx = x1 + 2*dx,    by = y1 + 2*dy;

  const cos60 = 0.5, sin60 = Math.sqrt(3)/2;
  const px = ax + (dx * cos60 - dy * sin60);
  const py = ay + (dx * sin60 + dy * cos60);

  const s1 = kochPoints(x1, y1, ax, ay, level-1);
  const s2 = kochPoints(ax, ay, px, py, level-1);
  const s3 = kochPoints(px, py, bx, by, level-1);
  const s4 = kochPoints(bx, by, x2, y2, level-1);

  return s1.slice(0,-1).concat(s2.slice(0,-1), s3.slice(0,-1), s4);
}

function snowflakePaths(canvas, level){
  const cw = canvas.width, ch = canvas.height;
  const cx = cw/2, cy = ch/2;
  const side = Math.min(cw, ch) * 0.72;
  const h = side * Math.sqrt(3) / 2;

  const top    = [cx,        cy - (2/3)*h];
  const left   = [cx - side/2, cy + (1/3)*h];
  const right  = [cx + side/2, cy + (1/3)*h];

  const side1 = kochPoints(left[0],  left[1],  right[0], right[1], level);
  const side2 = kochPoints(right[0], right[1], top[0],   top[1],   level);
  const side3 = kochPoints(top[0],   top[1],   left[0],  left[1],  level);

  const fullPath = side1.slice(0,-1).concat(side2.slice(0,-1), side3);

  // Bounding box del copo
  let minX = Infinity, maxX = -Infinity;
  for(const [x,y] of fullPath){ if(x<minX) minX=x; if(x>maxX) maxX=x; }
  const midX = (minX + maxX) / 2;

  return { side1, side2, side3, fullPath, midX };
}

function strokePolyline(ctx, pts, color, lw=1.4){
  if(!pts.length) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
}

// ====== Dibujo ======
function drawFull(){
  const canvas = document.getElementById("canvasFull");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const { side1, side2, side3 } = snowflakePaths(canvas, order);

  strokePolyline(ctx, side1, "#ff8c00", 1.6);
  strokePolyline(ctx, side2, "#ffa500", 1.6);
  strokePolyline(ctx, side3, "#ff8c00", 1.6);
}

function drawHalf(){
  const canvas = document.getElementById("canvasHalf");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const { fullPath, midX } = snowflakePaths(canvas, order);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, midX, canvas.height); // 👉 mantener solo la mitad izquierda
  ctx.clip();

  strokePolyline(ctx, fullPath, "#228b22", 1.6);
  ctx.restore();
}

function drawAll(){
  document.getElementById("orderv").textContent = order;
  drawFull();
  drawHalf();
}

window.addEventListener("load", drawAll);
