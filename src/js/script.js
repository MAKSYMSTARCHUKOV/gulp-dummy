//= helpers.js

function setLoaded(){
  const main = document.querySelector('main');
  main.classList.add(LOADED_CLASS)  
}

function initApplication(){
  // const imageList = getFirstImgListOnDevice();
  // return uploadFirstImages(imageList, setLoaded);
}

document.addEventListener('DOMContentLoaded', async () => {
  defineDevice()
  await initApplication()
})

window.addEventListener('resize', () => {
  defineHeight()
})
