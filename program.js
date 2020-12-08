TChange();
BoomIt();

function TChange() {
  var slct1 = document.getElementById("slct1");
  var firstTextarea = document.getElementById("1text_area");
  var secndTextarea = document.getElementById("2text_area");
  if (firstTextarea.innerHTML == "")
    firstTextarea.innerHTML += "<li></li>";
  else if (secndTextarea.innerHTML == "")
    secndTextarea.innerHTML += "<li></li>";
}
function BoomIt() {
  var slct1 = document.getElementById("slct1");
  var firstTextarea = document.getElementById("1text_area");
  if (slct1.value == "Pascal") {
    firstTextarea.innerHTML = `
    <li>program Program1;</li>
    <li></li>
    <li>begin</li>
    <li></li>
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
    <li>     </li>
    <li>  }</li>
    <li> }</li>
    <li>}</li>
    `;
  }
}

function TranslateIt(){
  var slct1 = document.getElementById("slct1");
  var slct2 = document.getElementById("slct2");
  var firstTextarea = document.getElementById("1text_area");
  var secndTextarea = document.getElementById("2text_area");

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
      .replace(/:/gi," ")      
      .replace(/program (.+?);/i, "public class $1{")
      .replace(/var/gi, "")
      .replace(/<\/li>(.+?)Integer;/gi, "<li>static int $1;</li>")
      .replace(/<\/li>(.+?)Real;/gi,"<li>static float $1;</li>")
      .replace(/begin/i, 
      `\n<li>public static void Main(string[] args)</li>
      <li>{</li>
      `)
      .replace(/'/gi, "\"")
      .replace(/write(?!ln)/gi, "Console.Write") //write('sad', 'sad', 'sad');
      .replace(/"([^"]+)",/gi, "\"$1\"+") // в write(, менялась на +)
      // .replace(/Write\(([^,]+),/gi, "$1+")
      .replace(/writeln/gi, "Console.WriteLine")
      .replace(/readln\((.+?)\)/gi,"$1 = Console.ReadLine()")     
      .replace(/end;|end.|end/gi, "}")
      .replace(/begin/gi, "{")
    +`<li>}</li>
    <li>}</li>
    `;
  }
}