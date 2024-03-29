const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let particlesArray;
class Particle{
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  update() {
    if (this.x > canvas.width || this.x < 0)
      this.directionX = -this.directionX;
    if (this.y > canvas.height || this.y < 0)
      this.directionY = -this.directionY;
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10)
        this.x += 20;
      if (mouse.x > this.x && this.x > this.size * 10)
        this.x -= 10;
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10)
        this.y += 10;
      if (mouse.y > this.y && this.y > this.size * 10)
        this.x -= 10;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}
// ******************** [ S U M M E R   E D I T I O N ] ********************
// Canvas  [S T A R T]
// let mouse = {
//   x:undefined,
//   y:undefined,
//   radius: (canvas.height / 50) * (canvas.width / 50)
// }
// function init() {
//   particlesArray = [];
//   let numberOfParticles = (canvas.width * canvas.height) / 4000;
//   for (let i = 0; i < numberOfParticles; i++){
//     let size = (Math.random() * 2) + 1;
//     let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
//     let y = (Math.random()*((innerHeight - size*2)-(size*2))+size*2)
//     let directionX = (Math.random() * 5) - 2.5;
//     let directionY = (Math.random() * 5) - 2.5;
//     let color = 'white';
//     particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
//   }
// }
// function connect() {
//   let opacity = 1;
//   for (let a = 0; a < particlesArray.length; a++){
//     for (let b = a; b < particlesArray.length; b++){
//       let distance = ((particlesArray[a].x - particlesArray[b].x)
//         * (particlesArray[a].x - particlesArray[b].x))
//         + ((particlesArray[a].y - particlesArray[b].y) *
//           (particlesArray[a].y - particlesArray[b].y));
//       if (distance < (canvas.width / 7) * (canvas.height / 7)) {
//         opacity=1-(distance/20000)
//         ctx.strokeStyle = `rgba(255, 255, 255,${opacity})`;
//         ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
//         ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
//         ctx.stroke();
//       }
//     }
//   }
// }
// function animate() {
//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, innerWidth, innerHeight);
//   for (let i = 0; i < particlesArray.length; i++){
//     particlesArray[i].update();
//   }
//   connect();
// }
// window.addEventListener('resize',
//   function () {
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
//     mouse.radius = ((canvas.width / 50) * (canvas.height / 50));
//     init();
//   }
// );
// Canvas  [E N D]

// ******************** [ W I N T E R   E D I T I O N ] ********************
// Canvas [S T A R T]
let mouse = {
  x:undefined,
  y: undefined,
  radius: (canvas.height / 60) * (canvas.width / 60)
}
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 3000;
  for (let i = 0; i < numberOfParticles; i++){
    let size = (Math.random() * 2) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random()*((innerHeight - size*2)-(size*2))+size*2)
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    let color = 'white';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
  }
}
window.addEventListener('resize',
  function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    mouse.radius = ((canvas.width / 60) * (canvas.height / 60));
    init();
  }
);
// Canvas [E N D]


init();
animate();
canvas.onmousemove = function(e) {
  var rect = this.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  }
canvas.addEventListener('mouseout',
  function () {
    mouse.x = undefined;
    mouse.y = undefined;
  }
);
function openFooter() {
  var footer = document.querySelector('footer');
  footer.style.height = 500;
  document.body.scrollTop = document.body.scrollHeight;
  canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    mouse.radius = ((canvas.width / 60) * (canvas.height / 60));
  init();
  arrow.setAttribute("onClick", "closeFooter()");
  soc.style.display = 'block';
}
function closeFooter() {
  var footer = document.querySelector('footer');
  footer.style.height = 80;
  document.body.scrollTop = document.body.scrollHeight;
  canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    mouse.radius = ((canvas.width / 60) * (canvas.height / 60));
  init();
  arrow.setAttribute("onClick", "openFooter()");
  soc.style.display = 'none';
}