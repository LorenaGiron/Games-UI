const url = 'https://twitch-game-popularity.p.rapidapi.com/games';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '44df0cede8msh6c81accb6f72542p1e343djsn7ab6aa5cb868',
        'x-rapidapi-host': 'twitch-game-popularity.p.rapidapi.com'
    }
};

async function cargarJuegosPopulares() {
    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Cambiado a .json() si la API devuelve JSON

        const container = document.getElementById('games-container');
        container.innerHTML = '';

        data.forEach(juego => {
            const card = document.createElement('div');
            card.className = 'col';

            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${juego.box_art_url.replace('{width}', '300').replace('{height}', '400')}" class="card-img-top" alt="${juego.name}">
                    <div class="card-body">
                        <h5 class="card-title">${juego.name}</h5>
                        <p class="card-text">Viewers: ${juego.viewers}</p>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error al cargar los juegos:', error);
    }
}

// Llama a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarJuegosPopulares);
