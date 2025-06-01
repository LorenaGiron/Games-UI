const fetchSteam = async () => 
{
	const url = 'https://games-details.p.rapidapi.com/gameinfo/single_game/730';
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '0125ddbecfmsh76a100fd69cb6f8p176878jsn171261301bb3',
			'x-rapidapi-host': 'games-details.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log('Resultados:' ,result);
	} catch (error) {
		console.error(error);
	}	
}

fetchSteam();

document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll animation
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("mainNavbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Simulación de carga de juegos populares (reemplazar con fetch a la API real)
  const juegosPopulares = [
    { titulo: "Cyberpunk 2077", imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", genero: "RPG" },
    { titulo: "Elden Ring", imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", genero: "Aventura" },
    { titulo: "Hogwarts Legacy", imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg", genero: "Acción" }
  ];

  const container = document.getElementById("populares-container");
  juegosPopulares.forEach(juego => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card bg-dark text-white card-game">
        <img src="${juego.imagen}" class="card-img-top" alt="${juego.titulo}">
        <div class="card-body">
          <h5 class="card-title">${juego.titulo}</h5>
          <p class="card-text">Género: ${juego.genero}</p>
          <a href="#" class="btn btn-outline-light btn-sm">Ver detalles</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
});
