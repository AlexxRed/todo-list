// ================== take refs  ==================

const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
    bodyStyle: document.querySelector('body'),
    allButtons: document.querySelectorAll("button")
};

// ================== basic style  ==================
refs.stopButton.disabled = true;
let timerId = null;

refs.bodyStyle.style.display = 'flex';
refs.bodyStyle.style.justifyContent = 'center';
refs.bodyStyle.style.marginTop = '400px';
refs.bodyStyle.style.cursor = 'pointer'

refs.allButtons.forEach(btn => {
    btn.style.cursor = 'pointer'
    btn.style.display = 'inline block';
    btn.style.justifyContent = 'center';
    btn.style.alignItems = 'center';
    btn.style.padding = '15px 30px';
    btn.style.borderRadius = '10px';
    btn.style.marginLeft = '30px';
})
// ================== get color  ==================

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// ================== add listeners  ==================
refs.startButton.addEventListener('click', onStartButton);
refs.stopButton.addEventListener('click', onStopButton);

// ================= start change color  =================

function onStartButton() {
    refs.stopButton.disabled = false;
    refs.startButton.disabled = 'disabled';
    refs.startButton.removeEventListener('click', onStartButton);

    timerId = setInterval(() => {    
        refs.bodyStyle.style.backgroundColor = getRandomHexColor();
        console.log(timerId);
        ; 
    }, 1000);
};

// ================== stop change color   ==================

function onStopButton() {
    refs.startButton.disabled = false;
    refs.stopButton.disabled = true;
    refs.startButton.addEventListener('click', onStartButton);

    clearInterval(timerId);
};