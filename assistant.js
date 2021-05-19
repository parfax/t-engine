var count = 1;

if (!localStorage.getItem('Бывалый')) {
    document.write(`
    <div class="background">
        <div class="red-back">
            <div class="dialogue flex-container">
               <img id="картинка" src="./images/assistant1.png">
               <div class="dcontent">
               <p id="речь" class="dcontent">Hi, I'm Amber, your assistant. How can I call you?</p>

               <input id="ответ" type="text"class="assisInp dcontent" placeholder='Name' maxlength="16"/>
                <button id="кнопка" class="dcontent" onclick='letsGo()'>Answer</button>
            </div>
        </div>
    </div></div><div id="анимация">
    `)
}
const bg = document.querySelector('.background'),
    rb = document.querySelector('.red-back'),
    диалог = document.querySelector('.dialogue');
    
function letsGo() {
    count++;
    switch (count) {
        case 2:
            if (ответ.value != "") {
                anim();
                картинка.src = "./images/assistant2.png";
                речь.innerHTML = `Okay ${ответ.value}, before you start working with TE, I will give you a short tour of the interface`
                localStorage.setItem("Name", ответ.value)
                localStorage.setItem("Бывалый", 1)
                кнопка.style.float = "right"
                кнопка.innerHTML = "OK, Let's start"
                ответ.remove()
            } else {
                alert("Please enter your real name")
                count--;
            }
            break;
        case 3:
            anim();
            картинка.src = "./images/assistant3.png";
            break;
        case 4:
            bg.remove();
            анимация.className = 'slide';
            анимация.onanimationend = () => {
                анимация.style.overflow="auto"
            };
            break;
    }
    
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function anim() {
  речь.style.opacity = 0;
    картинка.style.opacity = 0;
    кнопка.style.opacity = 0;
  for (let i = 0; i < 11; i++) {
    await sleep(50);
    речь.style.opacity = i * .1;
    картинка.style.opacity = i * .1;
    кнопка.style.opacity = i * .1;
  }
}