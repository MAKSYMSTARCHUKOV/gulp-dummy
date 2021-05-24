class Page {
  pages = {
    '0': {
      images: [
        '/img/prize.png',
        '/img/sprite_buttons.png',
        '/img/sprite_buttons_min.png'
      ]
    },
    '1': {
      images: [
        '/img/ball.png',
        '/img/sprite_questions.png',
        '/img/back_stadium_faq.png'
      ]
    },
    '2': {
      images: [
        '/img/gates.png',
        '/img/ball_clear.png',
        '/img/sprite_goalkeeper_stands.png',
        '/img/sprite_goalkeeper_flys.png',
        '/img/sprite_goalkeeper_felt.png',
        '/img/sprite_questions.png',
        '/img/sprite_questions_min.png',
        '/img/sprite_quiz.png',
        '/img/sprite_quiz_min.png',
        '/img/sprite_quiz_tiny.png',
        '/img/emoji.png',
        '/img/metafan.png',
        '/img/phones.png',
        '/img/name.svg',
        '/img/message.svg',
        '/img/back_stadium.png'

      ]
    },
    '3': {
      images: [
        '/img/bubble.png',
        '/img/telegram.svg',
        '/img/instagram.svg',
        '/img/facebook.svg',
        '/img/back_lights.png'
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
      q: 'Автор першого голу «Руху» на професійному рівні?',
      a: ['Олексій Омельченко', 'Олег Шептицький', 'Володимир Макар', 'Роман Манорик']
    }, {
      q: 'Автор першого хет - трику за« Рух» на професійному рівні?',
      a: ['Євген Бохашвілі', 'Микола Буй', 'Володимир Бідловський', 'Олег Панасюк']
    }, {
      q: 'Хто провів рекордну кількість поєдинків за «Рух» на професійному рівні?',
      a: ['Юрій Копина', 'Володимир Заставний', 'Ігор Дуць', 'Юрій Климчук']
    }, {
      q: 'Який тренер вивів «Рух» в Українську Прем’єр-лігу?',
      a: ['Іван Федик', 'Леонід Кучук', 'Володимир Мазяр', 'Юрій Вірт']
    }, {
      q: 'Хто був автором першого голу «Руху» в Українській Прем’єр-лізі?',
      a: ['Валерій Федорчук', 'Данііл Кондраков', 'Микола Кухаревич', 'Богдан Бойчук']
    }, {
      q: 'Хто провів найбільшу кількість матчів за «Рух» в ролі капітана на професійному рівні?',
      a: ['Ігор Дуць', 'Володимир Заставний', 'Юрій Копина', 'Олександр Ільющенков']
    }, {
      q: 'На якому стадіоні «Рух» проводить свої домашні матчі в Українській Прем’єр-лізі?',
      a: ['«Арена Львів»', 'СКІФ', '«Україна»', 'стадіон ім. Б. Маркевича']
    }, {
      q: 'Як звучить гасло «Руху»?',
      a: ['«Буде бій»', '«Вперед до перемог»', '«Рух» – вгору»', '«Рух – це сила»']
    }, {
      q: 'Хто був першим тренером «Руху» на професійному рівні?',
      a: ['Роман Гданський', 'Руслан Мостовий', 'Володимир Мазяр', 'Юрій Вірт']
    }, {
      q: 'Скільки разів «Рух» ставав чемпіоном Львівської області?',
      a: ['4 рази', '3 рази', '2 рази', '5 разів']
    }, {
      q: 'Проти якого суперника «Рух» здобув першу історичну перемогу в Українській Прем’єр-лізі?',
      a: ['«Дніпро-1»', '«Інгулець»', '«Шахтар»', 'ПФК «Львів»']
    }, {
      q: 'З яким рахунком завершився матч, у якому «Рух» здобув першу перемогу в Українській Прем’єр-лізі?',
      a: ['4:1', '3:0', '4:0', '2:1']
    }, {
      q: 'Яка дата заснування «Руху»?',
      a: ['2003 рік', '2000 рік', '2010 рік', '2007 рік']
    }, {
      q: 'У якому році «Рух» вийшов у Першу лігу України?',
      a: ['2017 рік', '2016 рік', '2018 рік', '2015 рік']
    }, {
      q: 'Хто є найкращим бомбардиром «Руху» на професійному рівні?',
      a: ['Юрій Климчук', 'Данііл Кондраков', 'Микола Кухаревич', 'Богдан Бойчук']
    }, {
      q: 'Хто з гравців «Руху» захищає кольори молодіжної збірної України?',
      a: ['Микола Кухаревич', 'Василь Руніч', 'Віктор Бабічин', 'Іван Варфоломєєв']
    }, {
      q: 'У якому році розпочалось будівництво Академії футболу ФК «Рух»?',
      a: ['2018 рік', '2016 рік', '2019 рік', '2020 рік']
    }, {
      q: 'У якому році «Рух» переїхав до Львова та змінив логотип?',
      a: ['2019 рік', '2020 рік', '2017 рік', '2018 рік']
    }, {
      q: 'З якого міста на Львівщині родом головний тренер «Руху» Іван Федик?',
      a: ['Дрогобич', 'Сколе', 'Самбір', 'Муроване']
    }, {
      q: 'Хто з цих тренерів, які зараз входять у тренерський штаб «Руху» раніше захищав кольори клубу?',
      a: ['Віталій Романюк', 'Тарас Гребенюк', 'Олександр Грицай', 'Іван Федик']
    }, {
      q: 'Як завершилося перше дербі між «Рухом» та «Львовом» в Українській Прем’єр-лізі?',
      a: ['0:0', '1:0', '3:2', '2:2']
    }, {
      q: 'Оберіть гравця «Руху», який захищає кольори своєї національної збірної?',
      a: ['Бобір Абдіхоліков', 'Валерій Федорчук', 'Ерік Ґліха', 'Максим Білий']
    }, {
      q: 'Проти якого суперника «Рух» здобув перший заліковий пункт в Українській Прем’єр-лізі?',
      a: ['«Шахтар»', '«Маріуполь»', '«Минай»', '«Олександрія»']
    }, {
      q: 'Яка історична особа є символом Львова?',
      a: ['Король Данило Галицький', 'Нестор Літописець', 'Євген Петрушевич', 'Михайло Грушевський']
    }, {
      q: 'YouTube-канал якого футбольного клубу є третім в Україні за кількістю підписників?',
      a: ['«Рух»', '«Зоря»', '«Динамо»', '«Дніпро-1»']
    }, {
      q: 'Хто із тренерського штабу «Руху» захищав кольори збірної України?',
      a: ['Олександр Грицай', 'Віталій Романюк', 'Юрій Шевчук', 'Іван Федик']
    }, {
      q: 'Назвіть титульного партнера «Руху».',
      a: ['First Club', 'ONUR', 'NOVO', 'Трускавеська']
    }, {
      q: 'Хто є капітаном «Руху»?',
      a: ['Ярослав Мартинюк', 'Валерій Федорчук', 'Юрій Копина', 'Максим Білий']
    }, {
      q: 'Хто став автором першого голу у складі «Руху» в львівському дербі проти ПФК «Львів»',
      a: ['Данііл Кондраков', 'Юрій Климчук', 'Остап Притула', 'Мар’ян Мисик']
    }, {
      q: 'Скільки тренерів було у «Руху» на професійному рівні?',
      a: ['7', '5', '9', '6']
    }, {
      q: 'На якому стадіоні «Рух» провів свій дебютний сезон на професійному рівні?',
      a: ['Стадіон імені Богдана Маркевича', 'СКІФ', '«Арена Львів»', '«Україна»']
    }, {
      q: 'Як називається особистий блог Президента клубу Григорія Козловського, який виходить на YouTube-каналі Ruh TV?',
      a: ['«Оба-На!!!»', '«Отакої»', '«Йофа-На»', '«Овва»']
    }, {
      q: 'У матчі з яким суперником «Рух» здобув найбільшу перемогу на професійному рівні з рахунком 10:1?',
      a: ['«Суми»', '«Агробізнес»', '«Зірка»', '«Балкани»']
    }, {
      q: 'Назвіть футболіста «Руху», який виступав за усі три професійні львівські клуби?',
      a: ['Валерій Федорчук', 'Остап Притула', 'Ярослав Мартинюк', 'Роман Мисак']
    }, {
      q: 'Раніше він був асистентом арбітра FIFA, а зараз очолює ФК «Рух» U-19. Хто це?',
      a: ['Віталій Пономарьов', 'Григорій Баранець', 'Юрій Шевчук', 'Роман Іванов']
    }, {
      q: 'Хто у віці 16 років першим дебютував за основну команду «Руху» в Українській Прем’єр-лізі?',
      a: ['Юрій-Володимир Герета', 'Богдан Слюбик', 'Іван Варфоломєєв', 'Назарій Русяк']
    }, {
      q: 'Якого футболіста «Рух» продав у французький клуб «Труа»',
      a: ['Микола Кухаревич', 'Микола Буй', 'Богдан Бойчук', 'Володимир Федорів']
    }, {
      q: 'Яка кількість футбольних полів передбачена на Академії футболу ФК «Рух»?',
      a: ['8', '5', '10', '14']
    }, {
      q: 'В матчі проти якого суперника «Рух» здобув першу виїзну перемогу в УПЛ?',
      a: ['«Колос»', '«Десна»', '«Динамо»', '«Олександрія»']
    }, {
      q: 'Оберіть футболіста, який грав у фіналі Ліги Європи, а зараз виступає за «Рух»?',
      a: ['Валерій Федорчук', 'Максим Білий', 'Ярослав Мартинюк', 'Мар’ян Мисик']
    }, {
      q: 'Скільки секторів включає в себе європейська рулетка?',
      a: ['36', '37', '50,100']
    }, {
      q: 'Яка комбінація в покері є найсильнішою?',
      a: ['Фулл хаус', 'Стрит Флеш', 'Флеш Рояль', 'Каре']
    }, {
      q: 'Скільки всього комбінацій у покері?',
      a: ['5', '8', '10', '11']
    }, {
      q: 'У 1913 році в казино у місті Монте-Карло одному гравцю вдалося, граючи у рулетку, ставити постійно на чорне і вигравати. Скільки разів підряд випадав чорний',
      a: ['5 разів', '10 разів', '17 разів', '26 разів']
    }, {
      q: 'У 2003 році Містер X у віці 25-ти років виграв найбільший джекпот на гральних автоматах за всю историю, витративши менше ніж 100$. Скільки він виграв?',
      a: ['40 мільйонів $', '35 мільйонів $', '23 мільйони $', '17 мільйонів $']
    }, {
      q: 'Яка максимальна кількість людей може сидіти за покерним столом?',
      a: ['8', '10', '12', '15']
    }, {
      q: 'У якій країні знаходиться найбільше казино світу?',
      a: ['Лас-Вегас', 'Китай', 'Атлантик Сіті', 'Лісабон']
    }, {
      q: 'Який має номінал найдорожча фішка в казино?',
      a: ['50$', '100$', '500$', '1000$ ']
    }, {
      q: 'Скільки існує видів покера?',
      a: ['8', '7', '5', '2']
    }, {
      q: 'Скільки карт включає в себе французька колода?',
      a: ['36', '50', '52', '54']
    }, {
      q: 'Що включає в себе комбінація Стріт?',
      a: ['5 карт однієї масті', 'одна пара', '5 послідовно розташованих карт', '3 карти одного рангу ']
    }, {
      q: 'Що включає в себе комбінація Фулл хаус?',
      a: ['3 карти одного рангу та 2 іншого', '5 послідовно розташованих карт ', '5 карт однієї масті', '4 карти одного рангу']
    }, {
      q: 'Перша слот-машина світу отримала назву покер-машина ________. Так яку назму мала покер-машина',
      a: ['Чип та Дейл', 'Білка та Стрілка', 'Ситмана та Пітта', 'Рокфорд та сир']
    }, {
      q: 'Слот-машина, яку створив Чарльз Фей мала назву “Дзвін свободи” або як її назвали пізніше - однорукий бандит. На  яку тематику був слот у цій слот-машині?',
      a: ['фруктова тематика', 'тематика гральних карт', 'книжкова тематика', 'тематика Єгипту']
    }, {
      q: 'Де зародився покер ?',
      a: ['Африка', 'Америка', 'Азія', 'Європа']
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
  shuffle(questions){
    [...this.currentQuestions] = questions;
    for (let i = this.currentQuestions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.currentQuestions[i], this.currentQuestions[j]] = [this.currentQuestions[j], this.currentQuestions[i]];
    }
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
    this.shuffle(o.a);
    this.correctIndex = this.currentQuestions.findIndex(i => i == o.a[0]);
    this.correctAnswer = o.a[0];
    this.qzs.forEach((q, i) => {
      q.removeEventListener('click', this.result);
      const s = q.children[0];
      s.innerHTML = `${this.letters[i]} ${this.currentQuestions[i]}`;
      s.setAttribute('data-item', this.currentQuestions[i]);      
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
  '2': '--quiz',
  '3': '--lights'
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
  if(step == 3){
    const q = document.querySelector('.qz');
    [...q.classList].forEach(c => c.startsWith('--') && q.classList.remove(c))
  }
}

function validateForm(input, button){
  input.forEach(i => i.parentElement.classList.remove('error'));
  const isMature = input.find(i => i.getAttribute('name') === 'mature').checked;
  if(!isMature){
    button.setAttribute('data-disabled', true);
    return false;
  }
  else{
    const n = input.find(i => i.getAttribute('name') === 'name').value.trim();
    const e = input.find(i => i.getAttribute('name') === 'email').value.trim();
    (n !== '' && e !== '') ? button.removeAttribute('data-disabled') : button.setAttribute('data-disabled', true);
  }  
}

function submit(input){
  const n = input.find(i => i.getAttribute('name') === 'name');
  const e = input.find(i => i.getAttribute('name') === 'email');
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: n.value.trim(),
      email: e.value.trim()
    })
  }).then(function (t) {
    if (!t.ok) {
      throw t
    }
    return t.json();
  }).then(function (r) {
    nextStep(3);
  }).catch(function (e) {
    const status = e.status;
    let err = 'Невідома помилка';
    e.json().then(function (e) {
      if (status === 412) {
        if (e.errors.email) {
          const erm = e.errors.email;
          if (erm === 'required') {
            err = 'Потрібно ввести e-mail'
          } else if (erm === 'wrong_format') {
            err = 'Невірний e-mail'
          } else if (erm === 'exists') {
            err = 'E-mail вже існує'
          }
        }
        Object.keys(e.errors).forEach(i => {
          input.find(e => e.getAttribute('name') === i).parentElement.classList.add('error')
        });
      } else if (status === 500) {
        if (e.errors.body) {
          err = 'Невірний формат'
        } else if (e.errors.global) {
          if (e.errors.global === 'server_error') {
            err = 'Помилка серверу'
          }
        }
      }
      console.log(err);
    })
  })
}

function setListeners(){
  [...document.querySelectorAll('[id*="btn-"]')].forEach(b => {
    b.addEventListener('click', (e) => {
      const step = e.target.closest('.btn').getAttribute('id').split('-')[1];

      page.init(step, () => nextStep(step));
      page.next();
    }, true);
  })
  // document.querySelector('#next-btn').addEventListener('click', e => {
  //   const t = e.target.closest('.qz');
  //   t.classList.remove('--again');
  //   t.classList.add('--done');
  // });
  const f = document.forms.register;
  const t = f.querySelectorAll('[type="text"]');
  const c = f.querySelectorAll('[type="checkbox"]');
  const els = [...t, ...c];
  const s = f.nextElementSibling;
  [...t].forEach(i => i.addEventListener('input', () => validateForm(els, s)));
  c[0].addEventListener('change', () => validateForm(els, s));
  s.addEventListener('click', () => submit([...t]));
}

function insertContent(){
  const s = {
    telegram: TELEGRAM,
    instagram: INSTAGRAM,
    facebook: FACEBOOK
  };
  [...document.querySelectorAll('.lg .socials a')].forEach(a => {
    const id = a.getAttribute('id');
    a.setAttribute('href', s[id]);
  })
}

document.addEventListener('DOMContentLoaded', (e) => {
  page = new Page(-1, () => nextStep(0));
})

window.onload = (e) => {
  page.next();
  page.init(0, () => nextStep(1));
  setListeners();
  insertContent();
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px')
}