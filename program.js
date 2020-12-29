TChange();
BoomIt();

// Canvas   S T A R T
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let particlesArray;
let mouse = {
  x:undefined,
  y: undefined,
  radius: (canvas.height / 60) * (canvas.width / 60)
}
canvas.onmousemove = function(e) {
  var rect = this.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  }
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
        this.x += 10;
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
init();
animate();
window.addEventListener('resize',
  function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    mouse.radius = ((canvas.width / 60) * (canvas.height / 60));
    init();
  }
);
canvas.addEventListener('mouseout',
  function () {
    mouse.x = undefined;
    mouse.y = undefined;
  }
);
// Canvas   E N D

// Добавляет строку с цифрой
function TChange() {
  slct1 = document.getElementById("slct1");
  firstTextarea = document.getElementById("1text_area");
  secndTextarea = document.getElementById("2text_area");
  if (firstTextarea.innerHTML == "")
    firstTextarea.innerHTML += "<li></li>";
  else if (secndTextarea.innerHTML == "")
    secndTextarea.innerHTML += "<li></li>";
}

// Меняет стартовое значение
function BoomIt() {
  slct1 = document.getElementById("slct1");
  firstTextarea = document.getElementById("1text_area");
  if (slct1.value == "Pascal") {
    firstTextarea.innerHTML = `
    <li>program Program1;</li>
    <li></li>
    <li>begin</li>
    <li>writeln('Hello World');</li>
    <li>end.</li>
    `;
  }
  if (slct1.value == "C#") {
    firstTextarea.innerHTML = `
    <li>using System;</li>
    <li>using System.Collections.Generic;</li>
    <li>using System.Linq;</li>
    <li>using System.Text.RegularExpressions;</li>
    <li>     </li>
    <li>namespace ConsoleApp1</li>
    <li>{</li>
    <li> public class Program</li>
    <li> {</li>
    <li>  public static void Main(string[] args)</li>
    <li>  {</li>
    <li>     Console.WriteLine("Hello World");</li>
    <li>  }</li>
    <li> }</li>
    <li>}</li>
    `;
  }
}

// Auto Save версия 2
txt_area = document.getElementById('1text_area')
firstSelect = document.getElementById('slct1')
secondSelect = document.getElementById('slct2')
function go_AS() {
  if (localStorage.getItem('check_autosave') == "true")
    localStorage.setItem("autosave", txt_area.innerHTML)
}
function open_AS() {
  txt_area.innerHTML = localStorage.getItem("autosave")
  firstSelect.value=localStorage.getItem("firstSelect")
  secondSelect.value=localStorage.getItem("secondSelect")
}
function save_language() {
  if (localStorage.getItem('check_autosave') == "true"){
      localStorage.setItem("firstSelect", firstSelect.value)
      localStorage.setItem("secondSelect", secondSelect.value)
  }
}

// Copy System
function copy() {
  txt_area = document.getElementById("2text_area");
       window.setTimeout(function() {
        var sel, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(txt_area);
            sel = window.getSelection();
            sel.removeAllRanges();
          sel.addRange(range);
          document.execCommand("copy");
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(txt_area);
          range.select();
          document.execCommand("copy");
        }
    }, 1);

  tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied &#10003";
}
function outFunc() {
  tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}

// Сам переводчик
function TranslateIt(){
  slct1 = document.getElementById("slct1");
  slct2 = document.getElementById("slct2");
  firstTextarea = document.getElementById("1text_area");
  secndTextarea = document.getElementById("2text_area");

  if (slct1.value == "Pascal" && slct2.value == "C#") {
    secndTextarea.innerHTML =
      `<li>using System;</li>
       <li>using System.Collections.Generic;</li>
       <li>using System.Linq;</li>
       <li>using System.Text.RegularExpressions;</li>
       <li>     </li>
       <li>namespace ConsoleApp1</li>
       <li>{</li>
  `
    + firstTextarea.innerHTML
      .replace(/uses(.+?);/gi,"")
      .replace(/\bif\b(.+?)=(.+?)then/gi, "if $1==$2 then")
      .replace(/\bif\b\s*\((.+?)\)/gi, "if $1")
      .replace(/and\s*\((.+?)=(.+?)\)/gi, "&& $1==$2")
      .replace(/and\s*\((.+?)\)/gi, "&& $1")
      .replace(/or\s*\((.+?)=(.+?)\)/gi, "| $1==$2")
      .replace(/or\s*\((.+?)\)/gi, "|| $1")
      .replace(/\bif\b(.+?)then/gi, "if ($1)")
      .replace(/&lt;&gt;/g,"!=")
      .replace(/{(.+?)}/gi, "//$1")
      .replace(/:/g, "")
      .replace(/program (.+?);/i, "public class $1{")
      .replace(/\bvar\b/gi, "<li></li>")
      .replace(/<li><\/li>(.+?)Integer;/gi, "<li>static int $1;</li><li></li>")
      .replace(/<li><\/li>(.+?)Real;/gi, "<li>static float $1;</li><li></li>")
      .replace(/<li><\/li>(.+?)Boolean;/gi,"<li>static bool $1;</li><li></li>")
      .replace(/<li><\/li>(.+?)Char;/gi, "<li>static char $1;</li><li></li>")
      
      .replace(/<li><\/li>(.+?)Integer(.+?);/gi, "<li>static int $1$2;</li><li></li>")
      .replace(/<li><\/li>(.+?)Real(.+?);/gi, "<li>static float $1$2;</li><li></li>")
      .replace(/<li><\/li>(.+?)Boolean(.+?);/gi,"<li>static bool $1$2;</li><li></li>")
      .replace(/<li><\/li>(.+?)Char(.+?);/gi,"<li>static char $1$2;</li><li></li>")
      .replace(/begin/i, 
      `\n<li>public static void Main(string[] args)</li>
      <li>{</li>
      `)
      .replace(/'/gi, "\"")
      .replace(/repeat(.+?)until(.+?);/gi, "do{\n$1\n}while($2);")
      .replace(/while\((.+?)=(.+?)\)/g,"while($1!=$2)")
      .replace(/clrscr;/gi,"Console.Clear();")
      .replace(/random\((.+?)\)/gi,"rnd.Next($1)")
      .replace(/randomize;/gi,"Random rnd = new Random();")
      .replace(/write(?!ln)/gi, "Console.Write") //write('sad', 'sad', 'sad');
      .replace(/"([^"]+)"\s*,/gi, "\"$1\"+") // в write(, менялась на +)
      .replace(/,\s*"(.+?)"/gi, "+ \"$1\"")
      .replace(/writeln;/gi, "Console.WriteLine();")
      .replace(/writeln/gi, "Console.WriteLine")
      .replace(/readln();|readln;|readln/gi,"Console.ReadLine();")  
      .replace(/readln\((.+?)\)/gi,"$1 = Console.ReadLine()")     
      .replace(/end;|end.|end/gi, "}")
      .replace(/\bmod\b/gi, "%")
      .replace(/read();|read;/gi,"Console.Read();") 
      .replace(/read\((.+?)\)/gi,"$1 = Console.Read()") 
      .replace(/<li><\/li>(.+?)Char(.+?);/gi,"<li>static char $1 $2;</li><li></li>")
      .replace(/char (.+?)\s*=\s*"(.+?)"/gi, "char $1 = '$2'")
      .replace(/begin/gi, "{")
      .replace(/<>/gm, "!=")
    +`<li>}</li>
    <li>}</li>
    `;
  }
}