const MOBILE = 'mobile';
const DESKTOP = 'desktop';
const LOADED_CLASS = '--loaded';
const FIRST_IMG = []

function defineHeight(){
  document.documentElement.style.setProperty('--vh', window.innerHeight / 100 + 'px');
}

function defineDevice(callback = () => {}){
  defineHeight();
  window._device = 
    window.matchMedia('(max-width: 900px)').matches 
      ? MOBILE 
      : DESKTOP;
  callback()
}

function uploadFirstImages(filesArr, callback){
  return new Promise(async (resolve, reject) => {
    await Promise.allSettled(
      filesArr.map(_ => {
        return new Promise((resolve, reject) => {
          const i = document.createElement('img');
          i.src = _;
          i.onload = resolve;
          i.onerror = resolve;
        })
      })
    )
    if(callback) callback();
    resolve()
  })
}

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
