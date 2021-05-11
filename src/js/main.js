class Page {
  pages = {
    '0': {
      images: [
        '/img/prize.png',
        '/img/sprite_buttons.png'
      ]
    },
    '1': {
      images: [
        '/img/ball.png',
        '/img/sprite_questions.png'
      ]
    },
    '2': {
      images: [
        '/img/gates.png',
        '/img/ball_clear.png',
        '/img/sprite_goalkeeper_stands.png',
        '/img/sprite_goalkeeper_flys.png',
        '/img/sprite_goalkeeper_felt.png',
        '/img/sprite_quiz.png',
        '/img/emoji.png',
        '/img/metafan.png'
      ]
    },
    '3': {
      images: [
        '/img/gates.png',
        '/img/ball_clear.png',
        '/img/sprite_goalkeeper_stands.png',
        '/img/sprite_goalkeeper_flys.png',
        '/img/sprite_goalkeeper_felt.png',
        '/img/sprite_quiz.png',
        '/img/emoji.png',
        '/img/metafan.png',
        '/img/phones.png'
      ]
    }
  }
  constructor(step, callback){
    this.init(step, callback)
  }
  init(step, callback){
    this.page = {
      clicked: false,
      loaded: false,
      callback : callback || (() => {})
    };
    const i = this.pages[++step]
    this.page.images = i ? i.images : []; 
    this.preload();
  }
  preload(){
    const im = this.page.images;
    if(im.length > 0){
      const buf = document.querySelector('.buffer');
      for(const i of im){
        const img = document.createElement('img');
        img.src = i;
        img.onload = () => {
          const _i = im.findIndex(z => z === i);
          im.splice(_i, 1);
          if(im.length === 0){
            this.page.loaded = true;
            if(this.page.clicked){
              this.next();
            }
          }
          img.remove()
        };
        buf.appendChild(img)
      }
    }else{
      this.page.loaded = true;
      if (this.page.clicked) {
        this.next();
      }
    }  
  }
  next(){
    if(this.page.loaded){
      this.page.callback();
    }else{
      this.page.clicked = true;
    }
  }

};

class Quiz {
  goals = 0
  task = 0
  letters = ['A', 'B', 'C', 'D']
  animation = ['--up-left', '--up-right', '--down-left', '--down-right']
  sec = 30
  obj = [
    {
      q: 'Скільки секторів включає в себе європейська рулетка?',
      a: [35, 37, 50, 100],
      c: 50
    },
    {
      q: 'Скільки секторів включає в себе європейська рулетка?',
      a: [35, 37, 50, 100],
      c: 35
    }
  ]
  actClasses = ['--quiz-time', '--paused', '--correct' , '--incorrect', '--again', ...this.animation];
  messages = ['Правильно, ГооооЛ!', 'Нажаль невірно  <img src="/img/emoji.png">']
  constructor(){
    this.step()
  }
  randomAnimation(){
    return this.animation[Math.floor(Math.random() * this.animation.length)]
  }
  step(task=0){
    if(task === 0){
      let a = document.querySelector('.qz .banner .timer .questions #total');
      a.innerHTML = this.obj.length;
      this.goals = 0;
      this.qzs = [...document.querySelector('.qz .game-zone .quiz').querySelectorAll('.quiz-item')];
      this.metafan = document.querySelector('.qz .banner .metafan');
      this.qz = document.querySelector('.qz');
      this.timer = this.qz.querySelector('.banner .loader .sec #sec');
      this.message = this.qz.querySelector('.game-zone .quiz .quiz-result');
    }
    this.reset();       
    let t = document.querySelector('.qz .banner .task');
    let q = document.querySelector('.qz .game-zone .quiz');
    let o = this.obj[task];
    let n = document.querySelector('.qz .banner .timer .questions #current');
    this.qzs = [...q.querySelectorAll('.quiz-item')];     
    n.innerHTML = task + 1;
    t.innerHTML = o.q;
    this.correctIndex = o.a.findIndex(i => i == o.c);
    this.correctAnswer = o.c;
    this.qzs.forEach((q, i) => {
      q.removeEventListener('click', this.result);
      const s = q.children[0];
      s.innerHTML = `${this.letters[i]} ${o.a[i]}`;
      s.setAttribute('data-item', o.a[i]);      
      q.addEventListener('click', this.result, false);
    });
    setTimeout(() => {
      this.startCountdown();
    }, 100)
  }
  reset(again=false){
    this.message.innerHTML = '';
    this.stopCountdown();
    this.actClasses.forEach(c => this.qz.classList.remove(c));
    this.qzs.forEach(c => (c.classList.remove('--correct'), c.classList.remove('--incorrect'), c));
    this.qz.classList.remove('--correct');
    this.timer.textContent = this.sec;
    if(again){
      this.qz.classList.add('--again');
    }
  }
  startCountdown(){
    this.qz.classList.add(this.actClasses[0]);
    this.interval = setInterval(() => {
      let t = this.timer.textContent;
      if(t > 0){
        --t;
        this.timer.textContent = t;
    
      }else{
        this.stopCountdown();
        this.result(null, true);
      }
    }, 1000)
  }
  stopCountdown(paused=false){
    clearInterval(this.interval);
    if(paused){
      this.qz.classList.add(this.actClasses[1]);
    }
  }
  animate(correct=true){
    let result = correct ? 'correct' : 'incorrect';   
    this.qz.classList.add('--' + result);
    this.qz.classList.add(this.currentAnimation);
    setTimeout(() => {      
      switch(correct){
        case true:
          this.message.innerHTML = this.messages[0];
          this.goals++;
          break;
        case false:
          this.message.innerHTML = this.messages[1];
          break;
      }
      const i = this.qzs[this.correctIndex];
      i.removeEventListener('click', this.result);    
      const timeout = () => {
        i.classList.add('--' + result);
        setTimeout(()=> i.classList.remove('--' + result), 500)
      }
      timeout();
      const interval = setInterval(() => {
        timeout();
      }, 1000)
      setTimeout(()=>{
        clearInterval(interval);
        setTimeout(()=>{
          i.classList.add('--' + result);
          setTimeout(()=>{
            this.nextStep();
          }, 500)
        },500)
      },2000)
    }, 2000)
  }

  nextStep(){
    if(this.goals === 3){
      this.reset();
      this.qz.classList.add('--done');
    }
    else{
      if((this.task + 1) === this.obj.length){
        this.reset(true);
      }else{
        ++this.task;
        this.step(this.task);
      }
    }
  }

  result(e, correct=true){
    let correctAnswer = false;
    if(e !== null){
      const s = e.target.closest('.quiz-item').children[0];
      const a = s.dataset.item;
      correctAnswer = quiz.correctAnswer == a;
    }
    quiz.stopCountdown(true);
    quiz.currentAnimation = quiz.randomAnimation();
    if(!correct || !correctAnswer){
      quiz.animate(false);
    }
    else if(correctAnswer){
      quiz.animate();
    }
  }
}

let page, quiz;

const wrapper = () => document.querySelector('.wrapper');
const steps = {
  '0': '--splash',
  '1': '--faq',
  '2': '--quiz'
}

function resetStep(){
  const w = wrapper();
  [...w.classList].forEach(c => c.startsWith('--') && w.classList.remove(c));
}

function nextStep(step){
  resetStep();
  wrapper().classList.add(steps[step]);
  if(step == 2){
    quiz = new Quiz();
  }
}

function setListeners(){
  [...document.querySelectorAll('[id*="btn-"]')].forEach(b => {
    b.addEventListener('click', (e) => {
      const step = e.target.closest('.btn').getAttribute('id').split('-')[1];

      page.init(step, () => nextStep(step));
      page.next();
    }, false);
  })
  document.querySelector('#next-btn').addEventListener('click', e => {
    const t = e.target.closest('.qz');
    t.classList.remove('--again');
    t.classList.add('--done');
  })
}

document.addEventListener('DOMContentLoaded', (e) => {
  page = new Page(-1, () => nextStep(0));
})

window.onload = (e) => {
  page.next();
  page.init(0, () => nextStep(1));
  setListeners();
}