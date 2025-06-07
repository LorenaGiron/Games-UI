
const options = {


	method: 'GET',
	headers: {
		'x-rapidapi-key': 'fa076bb285msh7695b9780cdfbd3p1efd96jsn61537f61b091',
		'x-rapidapi-host': 'games-details.p.rapidapi.com'
	}

};

const letrasDisponibles = 'abcdefghijklmnopqrstuvwxyz'.split('');

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
  console.log('Letras usadas para búsqueda:', letrasBusqueda);

  const juegosMap = new Map();

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

function mostrarSpinner(container) {
  container.innerHTML = `
    <div class="spinner-container text-center my-5">
      <i class="fas fa-spinner fa-spin fa-3x text-light"></i>
     <p class="mt-3 text-light">Rolling dice for awesome games... (ಠ‿↼)</p>
    </div>
  `;
}

async function cargarJuegos() {
  const container = document.getElementById("populares-container");
  mostrarSpinner(container);

  const juegos = await fetchMultipleSearches();
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

async function cargarMasJuegos() {
  const container = document.getElementById("recomendados-container");
  mostrarSpinner(container);

  const juegos = await fetchMultipleSearches();
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
  const scrollAmount = 400;

  left.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  right.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

async function cargarCollage() {
  const container = document.getElementById("collage-container");

  const juegos = await fetchMultipleSearches();
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

// Efecto partículas
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('particleContainer');
  const particleCount = 150;
  const colors = [
    'rgba(255, 255, 255, 0.7)',
    'rgba(100, 200, 255, 0.7)',
    'rgba(255, 100, 200, 0.7)',
    'rgba(100, 255, 200, 0.7)'
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.opacity = Math.random() * 0.6 + 0.1;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
    container.appendChild(particle);
  }

  function randomGlow() {
    const particles = document.querySelectorAll('.particle');
    const visibleParticles = Array.from(particles).filter(p => {
      const rect = p.getBoundingClientRect();
      return rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;
    });

    if (visibleParticles.length > 0) {
      const particle = visibleParticles[Math.floor(Math.random() * visibleParticles.length)];
      particle.classList.add('glow');
      setTimeout(() => particle.classList.remove('glow'), Math.random() * 1000 + 500);
    }
  }

  setInterval(randomGlow, Math.random() * 300 + 200);

  container.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(p => {
      const rect = p.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
      if (distance < 100) {
        p.classList.add('glow');
        setTimeout(() => p.classList.remove('glow'), 500);
      }
    });
  });
});

const API_URL = 'https://games-details.p.rapidapi.com/search?sugg=';
const options2 = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'fa076bb285msh7695b9780cdfbd3p1efd96jsn61537f61b091',
        'x-rapidapi-host': 'games-details.p.rapidapi.com'
    }
};

let contenidoOriginal = null; // Guardamos la vista inicial

document.addEventListener('DOMContentLoaded', () => {
    // Guardamos el contenido original una vez cargado
    const particleContainer = document.getElementById('particleContainer');
    if (particleContainer) {
        contenidoOriginal = particleContainer.cloneNode(true);
    }

    const searchForms = document.querySelectorAll('form[role="search"]');
    searchForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="search"]');
            const query = input.value.trim();
            if (query) {
                await buscarJuegos(query);
            }
        });
    });
});

async function buscarJuegos(query) {
    try {
        const response = await fetch(API_URL + encodeURIComponent(query), options2);
        const data = await response.json();

        if (!data || !Array.isArray(data) || data.length === 0) {
            mostrarMensaje("No games found for your search.");
            return;
        }

        mostrarResultados(data);
    } catch (error) {
        console.error("Error fetching games:", error);
        mostrarMensaje("There was an error fetching the game data.");
    }
}

function mostrarResultados(juegos) {
    // Eliminar sección principal
    const particleContainer = document.getElementById('particleContainer');
    if (particleContainer) {
        particleContainer.remove();
    }

    const oldResults = document.getElementById('resultados-busqueda');
    if (oldResults) oldResults.remove();

    const section = document.createElement('section');
    section.id = 'resultados-busqueda';
    section.classList.add('container', 'my-5');

    const heading = document.createElement('h2');
    heading.textContent = "Search Results";
    heading.classList.add('mb-4');
    section.appendChild(heading);

    const grid = document.createElement('div');
    grid.classList.add('row', 'g-4');

    juegos.forEach(juego => {
        const col = document.createElement('div');
        col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');

        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'shadow');

        const img = document.createElement('img');
        img.src = juego.image;
        img.classList.add('card-img-top');
        img.alt = juego.name;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = juego.name;

        const price = document.createElement('p');
        price.classList.add('card-text', 'text-muted');
        price.textContent = juego.price || "Price not available";

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        grid.appendChild(col);
    });

    section.appendChild(grid);

    // Botón para volver al inicio
    const volverBtn = document.createElement('button');
    volverBtn.textContent = "← Back to home";
    volverBtn.classList.add('btn', 'btn-outline-primary', 'mt-4');
    volverBtn.addEventListener('click', restaurarVistaOriginal);
    section.appendChild(volverBtn);

    document.body.insertBefore(section, document.querySelector('footer'));
}

function mostrarMensaje(mensaje) {
    const oldResults = document.getElementById('resultados-busqueda');
    if (oldResults) oldResults.remove();

    const section = document.createElement('section');
    section.id = 'resultados-busqueda';
    section.classList.add('container', 'my-5', 'text-center');

    const msg = document.createElement('p');
    msg.textContent = mensaje;
    msg.classList.add('lead');

    const volverBtn = document.createElement('button');
    volverBtn.textContent = "← Back to home";
    volverBtn.classList.add('btn', 'btn-outline-secondary', 'mt-4');
    volverBtn.addEventListener('click', restaurarVistaOriginal);

    section.appendChild(msg);
    section.appendChild(volverBtn);

    document.body.insertBefore(section, document.querySelector('footer'));
}

function restaurarVistaOriginal() {
    const resultados = document.getElementById('resultados-busqueda');
    if (resultados) resultados.remove();

    if (contenidoOriginal) {
        document.body.insertBefore(contenidoOriginal.cloneNode(true), document.querySelector('footer'));
    }

    // Opcional: limpiar campos de búsqueda
    const searchInputs = document.querySelectorAll('input[type="search"]');
    searchInputs.forEach(input => input.value = "");
}

