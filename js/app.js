const url = 'https://games-details.p.rapidapi.com/media/screenshots/730?limit=20&offset=0';
const options = {

	method: 'GET',
	headers: {
		'x-rapidapi-key': '57430afaa8msh1aa614aaa240bb5p1bb6eejsnad26a81269a2',
		'x-rapidapi-host': 'games-details.p.rapidapi.com'
	}

};

const letrasDisponibles = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Función para obtener 3 letras únicas al azar
function obtenerLetrasAlAzar(cantidad = 3) {
  const letrasSeleccionadas = new Set();
  while (letrasSeleccionadas.size < cantidad) {
    const indice = Math.floor(Math.random() * letrasDisponibles.length);
    letrasSeleccionadas.add(letrasDisponibles[indice]);
  }
  return Array.from(letrasSeleccionadas);
}

async function fetchMultipleSearches() {
  const letrasBusqueda = obtenerLetrasAlAzar(3);
  console.log('Letras usadas para búsqueda:', letrasBusqueda); // Para depuración

  const juegosMap = new Map(); // Para evitar duplicados

  for (const letra of letrasBusqueda) {
    const url = `https://games-details.p.rapidapi.com/search?sugg=${letra}`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.status === 200 && result.message === "success") {
        const juegos = result.data.search;
        juegos.forEach(juego => {
          if (!juegosMap.has(juego.name)) {
            juegosMap.set(juego.name, juego);
          }
        });
      } else {
        console.error(`Error en la respuesta de la API para letra "${letra}":`, result);
      }
    } catch (error) {
      console.error(`Error al obtener juegos para letra "${letra}":`, error);
    }
  }

  return Array.from(juegosMap.values()).slice(0, 10);
}

function guardarID(id) {
  localStorage.setItem('juegoID', id);
}

/* Cargar juegos en tendencia */
async function cargarJuegos() {
  const juegos = await fetchMultipleSearches();
  const container = document.getElementById("populares-container");
  container.innerHTML = '';

  juegos.forEach(juego => {
    const card = document.createElement("div");
    card.className = "card bg-dark text-white card-game";
    card.innerHTML = `
      <img src="${juego.image}" class="card-img-top" alt="${juego.name}">
      <div class="card-body">
        <h5 class="card-title">${juego.name}</h5>
        <p class="card-text">Price: ${juego.price}</p>
        <a href="./detalles.html" class="btn btn-outline-light btn-sm" onclick="guardarID('${juego.id}')">Details</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Carrusel con flechas
function activarFlechasCarrusel() {
  const container = document.getElementById("populares-container");
  const left = document.querySelector(".arrow.left");
  const right = document.querySelector(".arrow.right");
  const scrollAmount = 380;

  left.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  right.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

/* Mas juegos para ti */
async function cargarMasJuegos() {
  const juegos = await fetchMultipleSearches();
  const container = document.getElementById("recomendados-container");
  container.innerHTML = '';

  juegos.forEach(juego => {
    const card = document.createElement("div");
    card.className = "card bg-dark text-white card-game";
    card.innerHTML = `
      <img src="${juego.image}" class="card-img-top" alt="${juego.name}">
      <div class="card-body">
        <h5 class="card-title">${juego.name}</h5>
        <p class="card-text">Price: ${juego.price}</p>
        <a href="./detalles.html" class="btn btn-outline-light btn-sm" onclick="guardarID('${juego.id}')">Details</a>
      </div>
    `;
    container.appendChild(card);
  });
}

function activarFlechasCarruselRecomendados() {
  const container = document.getElementById("recomendados-container");
  const left = document.getElementById("arrow-left-more");
  const right = document.getElementById("arrow-right-more");
  const scrollAmount = 380;

  left.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  right.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

/*Fondo Mr.Games*/
async function cargarCollage() {
  const juegos = await fetchMultipleSearches();
  const container = document.getElementById("collage-container");
  container.innerHTML = '';

  juegos.slice(0, 10).forEach(juego => {
    const img = document.createElement("img");
    img.src = juego.image;
    img.alt = juego.name;
    container.appendChild(img);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("mainNavbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  cargarJuegos().then(activarFlechasCarrusel);
  cargarMasJuegos().then(activarFlechasCarruselRecomendados);
  cargarCollage();
});


/* Partículas */
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('particleContainer');
  const particleCount = 150; // Ajusta la cantidad de partículas
  
  // Colores para las partículas (opcional)
  const colors = [
    'rgba(255, 255, 255, 0.7)',  // Blanco
    'rgba(100, 200, 255, 0.7)',  // Azul claro
    'rgba(255, 100, 200, 0.7)',  // Rosa
    'rgba(100, 255, 200, 0.7)'   // Verde agua
  ];

  // Crear partículas
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Tamaño aleatorio entre 1px y 4px
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posición aleatoria
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Opacidad aleatoria
    const opacity = Math.random() * 0.6 + 0.1;
    particle.style.opacity = opacity;
    
    // Color aleatorio (si quieres variedad)
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Animación flotante básica
    particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
    
    container.appendChild(particle);
  }
  
  // Función para hacer brillar partículas aleatorias
  function randomGlow() {
    const particles = document.querySelectorAll('.particle');
    const visibleParticles = Array.from(particles).filter(p => {
      const rect = p.getBoundingClientRect();
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
    });
    
    if (visibleParticles.length > 0) {
      const randomIndex = Math.floor(Math.random() * visibleParticles.length);
      const particle = visibleParticles[randomIndex];
      
      particle.classList.add('glow');
      
      // Tiempo de brillo aleatorio entre 0.5s y 1.5s
      const glowTime = Math.random() * 1000 + 500;
      
      setTimeout(() => {
        particle.classList.remove('glow');
      }, glowTime);
    }
  }
  
  // Activar brillo aleatorio cada 200-500ms
  setInterval(randomGlow, Math.random() * 300 + 200);
  
  // Efecto al pasar el mouse (opcional)
  container.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      const rect = particle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );
      
      if (distance < 100) {
        particle.classList.add('glow');
        setTimeout(() => {
          particle.classList.remove('glow');
        }, 500);
      }
    });
  });
});