const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const btn = document.querySelector('.button');
const playerName = document.querySelector('.player-name');
const playerTime =  document.querySelector('.player-time');
const buttonAudio = document.querySelector('.button-audio');
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


const resetGame = () => {
btn.addEventListener("click", function() {
  location.reload();
 }) 
}


const switchModal = () => {
  const modal = document.querySelector('.modal');
  const actualStyle = modal.style.display

  if (actualStyle === 'block') {
    modal.style.display = 'none'

  } else {
    modal.style.display = 'flex'
  }
}


const characters = [
  'book',
  'eye',
  'hat',
  'pumpkin',
  'puppet',
  'strawman',
  'vampire',
  'zombie',
  'witch',
];


const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}


let firstCard = '';
let secondCard = '';


const checkEndGame = () => {

  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 18) {
    switchModal();
    clearInterval(this.loop);
  } 
}


const checkCards = () => {

  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {

    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500)


  }
}


const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {

    return;
  }
  
  if (firstCard === '') {
    
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}


const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../image/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}


const loadGame = () => {

  const duplicateCharacters = [ ...characters, ...characters ]

  const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5); 


  shuffledArray.forEach((character) => {

    const card = createCard(character);
    grid.appendChild(card);

  });

}


const startTimer = () => {

  this.loop = setInterval(() => {

    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
    playerTime.innerHTML = currentTime + 1;

  }, 1000);
}


window.onload = () => {

  spanPlayer.innerHTML = localStorage.getItem('player');
  playerName.innerHTML = localStorage.getItem('player');
  
  startTimer();
  resetGame();
  loadGame();
  //audioActived ();
  ativarButton();
  //tocarOuParar();
}