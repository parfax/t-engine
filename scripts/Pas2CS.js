function Pascal2CSharp()
{
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
      

      // ...
      .replace(/program (.+?);/i, "public class $1{")
      .replace(/'/gi, "\"")

      // Циклы
      .replace(/\bfor\b(.+?)\bdo\s+begin/gi, "for($1){&$501") // &$501 Временный символ
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
      .replace(/<li>\s*var\s*<\/li>/gi, "\n")
      .replace(/\bvar\b/gi, "")
      .replace(/\btype\b/gi, "Type")
      .replace(/:\s*Integer;<\/li>/gi, ":Integer;</li>\n<li>&$503</li>\n")
      .replace(/:\s*Real;<\/li>/gi, ":Real;</li>\n<li>&$503</li>\n")
      .replace(/:\s*Boolean;<\/li>/gi,":Boolean;</li>\n<li>&$503</li>\n")
      .replace(/:\s*Char;<\/li>/gi, ":Char;</li>\n<li>&$503</li>\n")
      .replace(/:\s*String;<\/li>/gi, ":String;</li>\n<li>&$503</li>\n")

      .replace(/<li>(.+?):\s*Integer;<\/li>\n<li>&\$503<\/li>/gi, "<li>static int $1;</li>")
      .replace(/<li>(.+?):\s*Real;<\/li>\n<li>&\$503<\/li>/gi, "<li>static float $1;</li>")
      .replace(/<li>(.+?):\s*Boolean;<\/li>\n<li>&\$503<\/li>/gi,"<li>static bool $1;</li>")
      .replace(/<li>(.+?):\s*Char;<\/li>\n<li>&\$503<\/li>/gi, "<li>static char $1;</li>")
      .replace(/<li>(.+?):\s*String;<\/li>\n<li>&\$503<\/li>/gi, "<li>static string $1;</li>")

      //.replace(/:(?!&\$500)/g, "")
      // .replace(/<li>&\$503<\/li><li>(.+?)Integer(.+?);<\/li>/gi, "<li>static int $1$2;</li><li>&$503</li>")
      // .replace(/<li>&\$503<\/li><li>(.+?)Real(.+?);<\/li>/gi, "<li>static float $1$2;</li><li>&$503</li>")
      // .replace(/<li>&\$503<\/li><li>(.+?)Boolean(.+?);<\/li>/gi,"<li>static bool $1$2;</li><li>&$503</li>")
      // .replace(/<li>&\$503<\/li><li>(.+?)Char(.+?);<\/li>/gi, "<li>static char $1$2;</li><li>&$503</li>")
      // .replace(/<li>&\$503<\/li><li>(.+?)String(.+?);<\/li>/gi, "<li>static string $1$2;</li><li>&$503</li>")

      //.replace(/&\$503/gi,'')

      // Массивы
      .replace(/<li>(.+?)\barray\s*\[-(.+?)..(.+?)\]\s*of\s*integer;/gi, "<li>int[] $1= new int[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[(.+?)..-(.+?)\]\s*of\s*integer;/gi, "<li>int[] $1= new int[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[-(.+?)..-(.+?)\]\s*of\s*integer;/gi, "<li>int[] $1= new int[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[(.+?)..(.+?)\]\s*of\s*integer;/gi, "<li>int[] $1= new int[$2+$3];")

      .replace(/<li>(.+?)\barray\s*\[-(.+?)..(.+?)\]\s*of\s*real;/gi, "<li>float[] $1= new float[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[(.+?)..-(.+?)\]\s*of\s*real;/gi, "<li>float[] $1= new float[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[-(.+?)..-(.+?)\]\s*of\s*real;/gi, "<li>float[] $1= new float[$2+$3];")
      .replace(/<li>(.+?)\barray\s*\[(.+?)..(.+?)\]\s*of\s*real;/gi, "<li>float[] $1= new float[$2+$3];")
    
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
      .mreplace(/<li>readln\((.+?)\)<\/li>/gi, "Console.ReadLine()")
      .mreplace(/<li>readln\((.+?)\);<\/li>/gi, "Console.ReadLine()")
      .replace(/readln\(\);|readln\(\)|readln;|readln/gi, "Console.ReadLine();") 
      
      // ...
      .replace(/\bend;|\bend(?!.)/gi, "}")

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
      //.replace(/begin/gi, "{")
      .replace(/<>/gm, "!=")
      .replace(/<li>\s*begin(.+?)end.\s*<\/li>/i, 
      `\n<li>public static void Main(string[] args)</li>\n
      <li>{</li>$1<li>}</li>
      `)
    +`<li>}</li>
    <li>}</li>
    `;
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
          .map(function (letter) {
            let string = new RegExp(`\s*${letter}(.+?)string;`, "gi")
            let int = new RegExp(`\s*${letter}(.+?)integer;`, "gi")
            let real = new RegExp(`\s*${letter}(.+?)real;`, "gi")
            
            if (text_area1.innerHTML.match(string))
              return `<li>${letter} = ${res};</li>`
            else if (text_area1.innerHTML.match(int))
              return `<li>${letter} = int.Parse(${res});</li>`
            else if (text_area1.innerHTML.match(real))
              return `<li>${letter} = float.Parse(${res});</li>`
            // if (text_area1.innerHTML.match(int))
            //   return `<li>${letter} = int.Parse(${res});</li>`
          })
          .join('');
      }
    );
  }
  return this;
};