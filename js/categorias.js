(() => {
  const url = 'https://games-details.p.rapidapi.com/gameinfo/single_game/730';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '5100d04d82msh3a97c573a4ae1bbp12f6e4jsnebc0739e0e2e',
      'x-rapidapi-host': 'games-details.p.rapidapi.com'
    }
  };

  async function fetchGameDetailsAndDisplayGenres() {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log('Detalles del juego:', data);

      const gameDetails = data.data;

      if (!gameDetails.tags || !Array.isArray(gameDetails.tags)) {
        console.error("No se encontraron los géneros en la respuesta");
        return;
      }

      const genresContainer = document.getElementById('genres-list');
      if (!genresContainer) {
        console.error("No se encontró el contenedor con id 'genres-list'");
        return;
      }

      genresContainer.innerHTML = '<h3>Géneros del juego</h3>';

      const ulList = document.createElement('ul');

      gameDetails.tags.forEach(genre => {
        const li = document.createElement('li');
        li.textContent = genre;
        ulList.appendChild(li);
      });

      genresContainer.appendChild(ulList);
    } catch (error) {
      console.error('Error al obtener los detalles del juego:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', fetchGameDetailsAndDisplayGenres);
})();
