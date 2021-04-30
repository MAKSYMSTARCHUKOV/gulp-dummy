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
        '/img/sprite_goalkeeper_stands.png',
        '/img/sprite_goalkeeper_flys.png',
        '/img/sprite_goalkeeper_felt.png',
        '/img/sprite_quiz.png',
        '/img/emoji.png',
        '/img/metafan.png'
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
        console.log(i);
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

let page;

const wrapper = () => document.querySelector('.wrapper');
const steps = {
  '0': '--splash',
  '1': '--faq',
  '2':'--quiz'
}

function resetStep(){
  const w = wrapper();
  [...w.classList].forEach(c => c.startsWith('--') && w.classList.remove(c));
}

function nextStep(step){
  resetStep();
  wrapper().classList.add(steps[step]);
}

function setListeners(){
  [...document.querySelectorAll('[id*="btn-"]')].forEach(b => {
    b.addEventListener('click', (e) => {
      const step = e.target.closest('.btn').getAttribute('id').split('-')[1];
      page.init(step, () => nextStep(step));
      page.next();
    }, false);
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