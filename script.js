const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const success = document.getElementById('success');

let noCount = 0;
let baseWidth = 120;
let baseHeight = 48;

function flashQuestion(){
  question.classList.add('flash');
  setTimeout(()=>question.classList.remove('flash'),420);
}

function moveAndShrink(button){
  noCount++;
  const factor = Math.pow(0.6, noCount);
  const newW = Math.max(1, Math.round(baseWidth * factor));
  const newH = Math.max(1, Math.round(baseHeight * factor));

  // adjust size, padding and font so label stays centered
  button.style.width = newW + 'px';
  button.style.height = newH + 'px';
  if(factor < 1){
    button.style.padding = '0 6px';
    const fontSize = Math.max(8, Math.floor(newH * 0.45));
    button.style.fontSize = fontSize + 'px';
    button.style.lineHeight = newH + 'px';
  } else {
    button.style.padding = '';
    button.style.fontSize = '';
    button.style.lineHeight = '';
  }
  button.style.whiteSpace = 'nowrap';
  button.style.display = 'inline-flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';

  // position randomly within viewport while keeping button visible
  const pad = 12;
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const areaW = Math.max(0, vw - newW - pad*2);
  const areaH = Math.max(0, vh - newH - pad*2);
  const x = Math.floor(Math.random() * areaW) + pad;
  const y = Math.floor(Math.random() * areaH) + pad;
  // use fixed position so we can move freely
  button.style.position = 'fixed';
  button.style.left = x + 'px';
  button.style.top = y + 'px';

  if(newW <= 4 || newH <= 4){
    button.addEventListener('mouseenter', evasive);
  }
}

function evasive(e){
  const b = e.currentTarget;
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const x = Math.floor(Math.random() * (vw-20));
  const y = Math.floor(Math.random() * (vh-20));
  b.style.left = x + 'px';
  b.style.top = y + 'px';
}

noBtn.addEventListener('click', (e)=>{
  flashQuestion();
  moveAndShrink(noBtn);
});

yesBtn.addEventListener('click', ()=>{
  success.classList.remove('hidden');
  // simple confetti hearts
  for(let i=0;i<20;i++){
    const el = document.createElement('div');
    el.textContent = '💖';
    el.style.position = 'fixed';
    el.style.left = (Math.random()*80+10)+'%';
    el.style.top = '0%';
    el.style.fontSize = (12+Math.random()*28)+'px';
    el.style.opacity = String(0.7+Math.random()*0.3);
    el.style.pointerEvents = 'none';
    el.style.transform = `translateY(0)`;
    el.style.transition = `transform ${1.6+Math.random()*1.2}s linear, opacity 2s`;
    document.body.appendChild(el);
    requestAnimationFrame(()=>{
      el.style.transform = `translateY(${90+Math.random()*60}vh)`;
      el.style.opacity = '0';
    });
    setTimeout(()=>el.remove(), 4200);
  }
});
