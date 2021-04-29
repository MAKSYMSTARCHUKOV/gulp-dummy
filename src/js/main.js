const wrapper = () => document.querySelector('.wrapper');
const steps = {
  '1': (e) => {
    wrapper().classList.add('--faq');
  },
  '2': (e) => {
    wrapper().classList.add('--quiz');
  }
}

function resetStep(){
  const w = wrapper();
  [...w.classList].forEach(c => c.startsWith('--') && w.classList.remove(c));
}

function nextStep(e){
  const step = e.target.closest('.btn').getAttribute('id').split('-')[1];
  resetStep();
  steps[step](e);
}

function setListeners(){
  [...document.querySelectorAll('[id*="btn-"]')].forEach(b => {
    b.addEventListener('click', nextStep, false);
  })
}

window.onload = (e) => {
  setListeners();
}