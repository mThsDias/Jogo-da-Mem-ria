const input = document.querySelector('.login_input'); 
const button = document.querySelector('.login_button'); 
const form = document.querySelector('.login-form'); 
const buttonAudio = document.querySelector('.button-audio')
const buttonImage = document.querySelector('.img-btn')
const midia = document.querySelector('.midia')


const ativarButton = () => {
  buttonImage.addEventListener('click', function(){
    buttonAudio.removeAttribute('disabled');
    
  })
}


function tocarOuParar() {

  if (midia.paused) {
    midia.play();
    buttonImage.src = '../image/audio.png';
    buttonAudio.style.boxShadow = '0px 0px 10px #00ff00';
  } else {
    midia.pause();
    buttonImage.src = '../image/audiomuted.png';
    buttonAudio.style.boxShadow = '0px 0px 10px #ff0000';
  }
}
buttonAudio.addEventListener('click', tocarOuParar);


const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '')
}


const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = '../pages/game.html';
}


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);


ativarButton();