TChange();
BoomIt();

// Добавляет строку с цифрой
function TChange() {
  if (text_area1.innerHTML == "")
    text_area1.innerHTML += "<li></li>";
  else if (text_area2.innerHTML == "")
    text_area2.innerHTML += "<li></li>";
}

// Меняет стартовое значение
function BoomIt() {
  if (slct1.value == "Pascal") {
    text_area1.innerHTML = `
    <li>program Program1;</li>
    <li></li>
    <li>begin</li>
    <li>writeln('Hello World');</li>
    <li>end.</li>
    `;
  }
  if (slct1.value == "C#") {
    text_area1.innerHTML = `
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
function go_AS() {
  if (localStorage.getItem('check_autosave') == "true")
    localStorage.setItem("autosave", text_area1.innerHTML)
}
function open_AS() {
  text_area1.innerHTML = localStorage.getItem("autosave")
  slct1.value=localStorage.getItem("slct1")
  slct2.value=localStorage.getItem("slct2")
}
function save_language() {
  if (localStorage.getItem('check_autosave') == "true"){
      localStorage.setItem("slct1", slct1.value)
      localStorage.setItem("slct2", slct2.value)
  }
}

// Copy System
function copy() {
       window.setTimeout(function() {
        var sel, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(text_area2);
            sel = window.getSelection();
            sel.removeAllRanges();
          sel.addRange(range);
          document.execCommand("copy");
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text_area2);
          range.select();
          document.execCommand("copy");
        }
    }, 1);

  tooltip.innerHTML = "Copied &#10003";
}
function outFunc() { tooltip.innerHTML = "Copy to clipboard"; }

// File Input
// function checkFile(fileInput) {
//   var curFiles = fileInput.files;
//   if (curFiles.length === 0) {
//     for (var i = 0; i < curFiles.length; i++) {
//       if (checkFileType(curFiles[i])) {
//   alert(':фіа)');
//       }
//       else {
        
//   alert(':)');
//       }
//     }
//   }
// }
// var fileTypes = [
//   'image/*',
//   'video/*'
// ]
// function checkFileType(file) {
//   for(var i = 0; i < fileTypes.length; i++) {
//     if(file.type === fileTypes[i]) {
//       return true;
//     }
//   }
//   return false;
// }

// Сам переводчик
function TranslateIt(){
  if (slct1.value == "Pascal" && slct2.value == "C#") {
    text_area2.innerHTML =
      `<li>using System;</li>
       <li>using System.Collections.Generic;</li>
       <li>using System.Linq;</li>
       <li>using System.Text.RegularExpressions;</li>
       <li>     </li>
       <li>namespace ConsoleApp1</li>
       <li>{</li>
  `
    + text_area1.innerHTML
      .replace(/uses(.+?);/gi, "")

      // Операторы
      .replace(/\bif\b(.+?)=(.+?)then/gi, "if $1==$2 then")
      .replace(/\bif\b\s*\((.+?)\)/gi, "if $1")
      .replace(/and\s*\((.+?)=(.+?)\)/gi, "&& $1==$2")
      .replace(/and\s*\((.+?)\)/gi, "&& $1")
      .replace(/or\s*\((.+?)=(.+?)\)/gi, "| $1==$2")
      .replace(/or\s*\((.+?)\)/gi, "|| $1")
      .replace(/\bif\b(.+?)then/gi, "if ($1)")
      .replace(/&lt;&gt;/g,"!=")
      .replace(/{(.+?)}/g, "/* $1 */")
      .replace(/'(.+?):(.+?)'/g, "\'$1:&$500$2\'") // &$500 Временный символ
      .replace(/:(?!&\$500)/g, "")

      // ...
      .replace(/program (.+?);/i, "public class $1{")
      .replace(/begin/i, 
      `\n<li>public static void Main(string[] args)</li>
      <li>{</li>
      `)
      .replace(/'/gi, "\"")

      // Циклы
      .replace(/\bfor\b(.+?)\bdo\b/gi, "for($1)&$501") // &$501 Временный символ
      .replace(/for\((.+?)=(.+?)\bto\b(.+?)\)&\$501/gi,"for($1=$2; $1<$3; $1++)&$501")
      .replace(/for\((.+?)=(.+?)\bdownto\b(.+?)\)&\$501/gi, "for($1=$2; $1>$3; $1--)&$501")
      .replace(/for\((.+?)\)&\$501/gi,"for($1)")
      .replace(/\brepeat(.+?)until(.+?);/gi, "do{\n$1\n}while($2);")
      .replace(/\bwhile\((.+?)=(.+?)\)/g, "while($1!=$2)")
      .replace(/\bforeach\b(.+?) \binteger(.+?)\bdo\b/gi, "foreach(int $1$2)")
      .replace(/\bforeach\b(.+?) \bstring(.+?)\bdo\b/gi, "foreach(string $1$2)")
      .replace(/\bforeach\b(.+?) \binteger(.+?)\bdo\b/gi, "foreach(int $1$2)")
      .replace(/\bforeach\s*var\b(.+?)\bdo\b/gi, "foreach(&$501var$1)")

      // Data-Types
      .replace(/\bvar\b/gi, "&$503")
      .replace(/\btype\b/gi, "Type&$503")
      .replace(/&\$503<\/li><li>(.+?)Integer;<\/li>/gi, "<li>static int $1;&$503</li>")
      .replace(/&\$503<\/li><li>(.+?)Real;<\/li>/gi, "<li>static float $1;&$503</li>")
      .replace(/&\$503<\/li><li>(.+?)Boolean;<\/li>/gi,"<li>static bool $1;&$503</li>")
      .replace(/&\$503<\/li><li>(.+?)Char;<\/li>/gi, "<li>static char $1;&$503</li>")
      .replace(/&\$503<\/li><li>(.+?)String;<\/li>/gi, "<li>static string $1;&$503</li>")
      
      .replace(/&\$503<li>(.+?)Integer(.+?);<\/li>/gi, "<li>static int $1$2;</li>&$503")
      .replace(/&\$503<li>(.+?)Real(.+?);<\/li>/gi, "<li>static float $1$2;</li>&$503")
      .replace(/&\$503<li>(.+?)Boolean(.+?);<\/li>/gi,"<li>static bool $1$2;</li>&$503")
      .replace(/&\$503<li>(.+?)Char(.+?);<\/li>/gi, "<li>static char $1$2;</li>&$503")
      .replace(/&\$503<li>(.+?)String(.+?);<\/li>/gi, "<li>static string $1$2;</li>&$503")

      .replace(/&\$503/gi,'')

      // Массивы
      .replace(/<li>(.+?)\barray\s*\[-(.+?)..(.+?)\]\s*of\s*integer;/gi, "<li>$1int[] = new int[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[(.+?)..-(.+?)\]\s*of\s*integer;/gi, "<li>$1int[] = new int[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[-(.+?)..-(.+?)\]\s*of\s*integer;/gi, "<li>$1int[] = new int[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[(.+?)..(.+?)\]\s*of\s*integer;/gi, "<li>$1int[] = new int[$2+$3];")

      .replace(/<li>(.+?)\barray\s*\[-(.+?)..(.+?)\]\s*of\s*real;/gi, "<li>$1float[] = new float[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[(.+?)..-(.+?)\]\s*of\s*real;/gi, "<li>$1float[] = new float[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[-(.+?)..-(.+?)\]\s*of\s*real;/gi, "<li>$1float[] = new float[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[(.+?)..(.+?)\]\s*of\s*real;/gi, "<li>$1float[] = new float[$2+$3];")
    
      // Циклы
      .replace(/foreach\(&\$501var(.+?)\)/gi, "foreach(var$1)")

      // ...
      .replace(/clrscr;/gi,"Console.Clear();")
      .replace(/random\((.+?)\)/gi,"random.Next($1)")
      .replace(/randomize;/gi, "Random random = new Random();")
      
      // Write & Read
      .replace(/write(?!ln)/gi, "Console.Write") //write('sad', 'sad', 'sad');
      .replace(/"([^"]+)"\s*,/gi, "\"$1\"+") // в write(, менялась на +)
      .replace(/,\s*"(.+?)"/gi, "+ \"$1\"")
      .replace(/writeln;/gi, "Console.WriteLine();")
      .replace(/writeln/gi, "Console.WriteLine")
      .mreplace(/<li>readln\((.+?)\)<\/li>/gi, " = Console.ReadLine();")
      .mreplace(/<li>readln\((.+?)\);<\/li>/gi, " = Console.ReadLine();")
      .replace(/readln\(\);|readln\(\)|readln;|readln/gi, "Console.ReadLine();") 
      
      // ...
      .replace(/end;|end.|end/gi, "}")

      // Операторы, operators
      .replace(/\bdiv\b/gi, "/")
      .replace(/\bmod\b/gi, "%")

      // Функции, functions
      .replace(/\bSqr\s*\((.+?)\)/gi, "$1*$1")
      .replace(/\bAbs\s*\((.+?)\)/gi, "Math.Abs($1)")
      .replace(/\bSqrt\s*\((.+?)\)/gi, "Math.Sqrt($1)")
      .replace(/\bSin\s*\((.+?)\)/gi, "Math.Sin($1)")
      .replace(/\bCos\s*\((.+?)\)/gi, "Math.Cos($1)")
      .replace(/\bArctan\s*\((.+?)\)/gi, "Math.Atan($1)")
      .replace(/\bLn\s*\((.+?)\)/gi, "Math.Log($1)")
      .replace(/\bExp\s*\((.+?)\)/gi, "Math.Exp($1)")
      .replace(/\bPi\b/gi, "Math.Pi")
      
      // ...
      .mreplace(/<li>read\((.+?)\)<\/li>/gi, " = Console.Read();")
      .mreplace(/<li>read\((.+?)\);<\/li>/gi, " = Console.Read();")
      .replace(/\bread\(\);|\bread\(\)|read;|\bread\b/gi,"Console.Read();")
      .replace(/<li><\/li>(.+?)Char(.+?);/gi,"<li>static char $1 $2;</li><li></li>")
      .replace(/char (.+?)\s*=\s*"(.+?)"/gi, "char $1 = '$2'")
      .replace(/begin/gi, "{")
      .replace(/<>/gm, "!=")
    +`<li>}</li>
    <li>}</li>
    `;
  }
}

// О чудо, слава Украине оно работает
String.prototype.mreplace = function(reg, res) { 
  if (this.match(reg)) {
    return this.replace(
      reg,
      (fullMatch, subgroup) => {
        subgroup = subgroup.replace(/ /g, "")
        return subgroup
                .split(',')
                .map(letter => `<li>${letter}${res}</li>`)
                .join('');
      }
    );
  }
  return this;
};