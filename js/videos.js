const videoUrls = [
  "https://www.youtube.com/watch?v=AsOPFHicUz8",
  "https://www.youtube.com/watch?v=IxmGYFaEEfg",
  "https://www.youtube.com/watch?v=LIu8vzPlE5g",
  "https://www.youtube.com/watch?v=G8x3Dd9CXfA",
  "https://www.youtube.com/watch?v=AsOPFHicUz8",
  "https://www.youtube.com/watch?v=gwyfaH6tFSc",
  "https://www.youtube.com/watch?v=MlW79fk1SkE",
  "https://www.youtube.com/watch?v=cN2Trm1-iR8",
  "https://www.youtube.com/watch?v=p3VuNdfVM5w",
  "https://www.youtube.com/watch?v=Q16OHRZK0ek",
  "https://www.youtube.com/watch?v=lyYOpOqGNfQ",
  "https://www.youtube.com/watch?v=Cbyv_ZCg1Ok",
  "https://www.youtube.com/watch?v=GwT_aoEtsyk",
  "https://www.youtube.com/watch?v=x7XwxIhzN10",
  "https://www.youtube.com/watch?v=L5ns_WerNDg",
  "https://www.youtube.com/watch?v=-rKagy175VA",
  "https://www.youtube.com/watch?v=ffeGuJu8Y2I",
  "https://www.youtube.com/watch?v=UYtdXopk0_A",
  "https://www.youtube.com/watch?v=aCb23KAfn5E",
  "https://www.youtube.com/watch?v=E7KQmkVT8rg",
  "https://www.youtube.com/watch?v=J_VZFNnRe48",
  "https://www.youtube.com/watch?v=6PYBjEw4Cd8",
  "https://www.youtube.com/watch?v=rsJA_5rxNa0",
  "https://www.youtube.com/watch?v=sJFLkfL9wrI",
  "https://www.youtube.com/watch?v=krJvSi683zQ",
  "https://www.youtube.com/watch?v=sUXa3jcVWyQ",
  "https://www.youtube.com/watch?v=KBg9wXSlB7c",
  "https://www.youtube.com/watch?v=PjoXLq7fqXY",
  "https://www.youtube.com/watch?v=yr9TmG2-oUU",
  "https://www.youtube.com/watch?v=9TG-Ya469Vk",
  "https://www.youtube.com/watch?v=gee90tbqdhg",
];

let currentIndex = 0;
let videoCards = [];

function loadYouTubeVideos() {
  const container = document.getElementById('videos');
  if (!container) {
    console.error('No se encontró el contenedor con id="videos".');
    return;
  }

  videoUrls.forEach((url) => {
    const videoId = new URL(url).searchParams.get('v');
    if (!videoId) return;

    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.dataset.videoId = videoId;
    container.appendChild(videoCard);
  });

  videoCards = Array.from(container.children);
  showVideo(currentIndex);
  createScrollButtons();
}

function createIframe(videoId) {
  const iframe = document.createElement('iframe');
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&enablejsapi=1`;
  iframe.frameBorder = "0";
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen");
  iframe.setAttribute("allowfullscreen", "true");
  return iframe;
}

function showVideo(index) {
  const videoCard = videoCards[index];
  if (!videoCard) return;

  const videoId = videoCard.dataset.videoId;

  videoCard.innerHTML = '';
  const iframe = createIframe(videoId);
  videoCard.appendChild(iframe);

 
}

function createScrollButtons() {
  // Botón Izquierda abajo - VIDEO ANTERIOR
  const leftButton = document.createElement('button');
  leftButton.innerHTML = '↓';
  leftButton.id = 'scroll-left-btn';
  Object.assign(leftButton.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '30px',
    cursor: 'pointer',
    zIndex: '9999',
    transform: 'rotate(180deg)',  // gira la flecha para que apunte hacia arriba
  });
  document.body.appendChild(leftButton);

  // Botón Derecha abajo - VIDEO SIGUIENTE
  const rightButton = document.createElement('button');
  rightButton.innerHTML = '↓';
  rightButton.id = 'scroll-right-btn';
  Object.assign(rightButton.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '30px',
    cursor: 'pointer',
    zIndex: '9999',
  });
  document.body.appendChild(rightButton);

  leftButton.addEventListener('click', () => {
    const previousCard = videoCards[currentIndex];
    previousCard.innerHTML = '';

    currentIndex = (currentIndex - 1 + videoCards.length) % videoCards.length;
    showVideo(currentIndex);
  });

  rightButton.addEventListener('click', () => {
    const previousCard = videoCards[currentIndex];
    previousCard.innerHTML = '';

    currentIndex = (currentIndex + 1) % videoCards.length;
    showVideo(currentIndex);
  });
}

document.addEventListener('DOMContentLoaded', loadYouTubeVideos);
