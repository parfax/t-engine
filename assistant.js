var count = 1;



if (!localStorage.getItem('Бывалый')) {
    document.write(`
    <div class="background">
        <div class="red-back">
            <div class="dialogue">
               <img id="ai" src="./images/assistant1.png">
               <div class="dcontent">
               <p id="речь" class="dcontent">Hi, I'm ..., your assistant. How can I call you?</p>
               <input id="ответ" class="assisInp dcontent" placeholder='Name Surname'/>
                <button id="bTxt" class="dcontent" onclick='letsGo()'>Answer</button>
     </div></div></div>
    </div>
    `)
}
const rb = document.querySelector('.red-back'),
    речь = document.querySelector('#речь'),
    кнопка = document.querySelector('#bTxt'),
    картинка = document.querySelector('#ai'),
    ответ = document.querySelector('#ответ');
    
function letsGo() {
    count += 1;
    switch (count) {
        case 2:
            картинка.src = "./images/assistant2.png";
            localStorage.setItem("Name", ответ.value)
            break;
        case 3:
            картинка.src = "./images/assistant3.png";
            break;
    }
    // if()
    // document.write('<div class="slide">')
}