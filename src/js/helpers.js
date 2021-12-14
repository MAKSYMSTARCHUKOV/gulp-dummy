function defineDevice(){
  document.documentElement.style.setProperty('--vh', window.innerHeight / 100 + 'px');
  _device = 
    window.matchMedia('(max-width: 900px)').matches 
      ? 'mobile' 
      : 'desktop';
}

function uploadFirst(filesArr, callback){
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
