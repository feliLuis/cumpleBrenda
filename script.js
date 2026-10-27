const screens=[...document.querySelectorAll('.screen')];
const music=document.getElementById('music');
const musicToggle=document.getElementById('musicToggle');
function showScreen(id){screens.forEach(s=>{s.classList.toggle('active',s.id===id);s.setAttribute('aria-hidden',String(s.id!==id));});window.scrollTo({top:0,behavior:'smooth'});}
async function playMusic(){try{await music.play();musicToggle.textContent='Ⅱ Pausar';}catch(e){musicToggle.textContent='♫ Música';alert('Agrega tu archivo de audio como audio/musica.mp3 para escuchar la música.');}}
document.getElementById('startButton').addEventListener('click',()=>{showScreen('recuerdos');playMusic();});
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.next)));
// Interacción de la galaxia romántica
const galaxyStars = document.querySelectorAll('.message-star');
const starCounter = document.getElementById('starCounter');
const galaxyMessage = document.getElementById('galaxyMessage');
const galaxyHeart = document.getElementById('galaxyHeart');
const galaxyReveal = document.getElementById('galaxyReveal');
const galaxyHint = document.getElementById('galaxyHint');

const discoveredStars = new Set();

galaxyStars.forEach((star, index) => {
  star.addEventListener('click', () => {
    // Evitar contar dos veces la misma estrella.
    discoveredStars.add(index);

    star.classList.add('discovered');
    star.setAttribute('aria-pressed', 'true');

    // Mostrar el mensaje guardado en el atributo data-message.
    const message = star.dataset.message;

    galaxyMessage.innerHTML = `
      <span class="message-sparkle">✧</span>
      <p>${message}</p>
    `;

    starCounter.textContent =
      `${discoveredStars.size} de 3 estrellas descubiertas ✨`;

    if (discoveredStars.size === 3) {
      galaxyHint.textContent =
        'Descubriste todas las estrellas. Ahora toca el corazón 💗';
      galaxyHeart.classList.add('heart-ready');
    }
  });
});

galaxyHeart.addEventListener('click', () => {
  if (discoveredStars.size < 3) {
    const faltan = 3 - discoveredStars.size;

    galaxyHint.textContent =
      `Todavía hay ${faltan} ${faltan === 1 ? 'estrella por descubrir' : 'estrellas por descubrir'}. Tócalas primero ♡`;

    galaxyHeart.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)' },
        { transform: 'translate(-50%, -50%) scale(1.12)' },
        { transform: 'translate(-50%, -50%) scale(1)' }
      ],
      { duration: 400 }
    );

    return;
  }

  // Revelar la sorpresa romántica.
  galaxyReveal.hidden = false;
  galaxyHint.textContent = 'Una pequeña sorpresa, hecha especialmente para ti ♡';
  galaxyHeart.setAttribute('aria-label', 'Sorpresa descubierta');

  galaxyReveal.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
});

musicToggle.addEventListener('click',async()=>{if(music.paused)await playMusic();else{music.pause();musicToggle.textContent='♫ Música';}});
document.getElementById('restartButton').addEventListener('click',()=>showScreen('inicio'));
showScreen('inicio');