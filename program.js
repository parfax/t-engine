TChange();
BoomIt();

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
function go_AS() {
  if (localStorage.getItem('check_autosave') == "true")
    localStorage.setItem("autosave", txt_area.innerHTML)
}
function open_AS() {
  txt_area.innerHTML=localStorage.getItem("autosave")
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
      .replace(/\bif\b(.+?)=(.+?)then/gi, "if $1==$2 then")
      .replace(/\bif\b\s*\((.+?)\)/gi, "if $1")
      .replace(/and\s*\((.+?)=(.+?)\)/gi, "&& $1==$2")
      .replace(/and\s*\((.+?)\)/gi, "&& $1")
      .replace(/or\s*\((.+?)=(.+?)\)/gi, "| $1==$2")
      .replace(/or\s*\((.+?)\)/gi, "| $1")
      .replace(/\bif\b(.+?)then/gi, "if ($1)")
      .replace(/&lt;&gt;/g,"!=")
      .replace(/{(.+?)}/gi, "//$1")
      .replace(/:/gi, "")
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
      .replace(/write(?!ln)/gi, "Console.Write") //write('sad', 'sad', 'sad');
      .replace(/"([^"]+)"\s*,/gi, "\"$1\"+") // в write(, менялась на +)
      .replace(/,\s*"(.+?)"/gi, "+ \"$1\"")
      .replace(/writeln;/gi, "Console.WriteLine();")
      .replace(/writeln/gi, "Console.WriteLine")
      .replace(/readln();|readln;/gi,"Console.ReadLine();")  
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