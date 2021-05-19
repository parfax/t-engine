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
    if(slct1.value == "Pascal" && slct2.value == "C#")
      Pascal2CSharp();
}